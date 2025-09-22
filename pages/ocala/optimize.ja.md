---
title: 最適化
---

ocala はアセンブラであり、基本は「書いたまま」のコードが生成されます。
対象文脈記法では一部命令の並びが前後しますが、生成コードが予測可能で
あることを重視しています。

一方で、制御構造マクロを組み合わせて利用した場合、
冗長なジャンプ命令が生成される場合があります。

```
if Z? {      //     JP NZ L1
    if C? {  //     JP NC L2
        NOP  //     NOP
             //     JP L3
    } else { // L2:
        NOP  //     NOP
    }        // L3: JP L4
} else {     // L1:
    NOP      //     NOP
}            // L4:
return       //     RET
```

そのため、一部の特別な命令に限り
最適化を適用することも可能になっています。

例えば、上記例に最適化を適用した場合、下記のようにコードサイズが削減されます(16 byte → 10 byte)。

```
if Z? {      //     JR NZ L1
    if C? {  //     JR NC L2
        NOP  //     NOP
             //     RET
    } else { // L2:
        NOP  //     NOP
    }        // L3: RET
} else {     // L1:
    NOP      //     NOP
}            // L4:
return       //     RET
```

## 最適化の対象命令

ocala では、最適化が可能な下記の特殊な命令(マクロ)が定義されています。

- `goto`
- `goto-if`
- `return`
- `return-if`

これらの命令(およびこれらを内部的に利用しているマクロ)では最適化が
有効な場合、下記が適用されます。

- アーキテクチャ固有の最適化(ショートジャンプの選択等)
- 到達不能コードの除去
- 冗長ジャンプの単純化
- 冗長命令の除去

これらは特殊な命令であり、下記の制限があります。

- 命令長が不定のため自己書き換え時の動作は不定

その他の通常の命令はすべて最適化の対象外です。

## アーキテクチャ固有の最適化

`goto` 系の特殊命令は、状況に応じてより短いジャンプ命令が選択されます。

### z80

| 対象                   | `goto` | `goto-if`                   |
|------------------------|--------|-----------------------------|
| -128 .. +127 の範囲内  | `JR`   | `JR <COND>`(Z/C フラグ関連) |
| それ以外もしくは無効時 | `JP`   | `JP <COND>`                 |

z80 では、デフォルトでは前方ジャンプのみが最適化の対象です。
下記のように明示的にオプションを指定することで
すべてのジャンプを最適化の対象にできます。

```
  optimize near-jump 2
```

また、下記の明示的な指定によって最適化を無効にできます。

```
  optimize near-jump 0
```

### mos6502

| 対象                   | `goto` | `goto-if`               |
|------------------------|--------|-------------------------|
| -128 .. +127 の範囲内  | `JMP`  | `BEQ` など              |
| それ以外もしくは無効時 | `JMP`  | `BNE L ; JMP ; L:` など |

6502 では、デフォルトですべての条件分岐が最適化の対象です。
なお、`goto-if` は任意のアドレスを対象とできます。
最適化できない条件分岐の場合は
ロングジャンプと組み合わせた条件分岐に展開されます。

下記の明示的な指定によって最適化を無効にできます。

```
  optimize near-jump 0
```

## 到達不能コードの除去

この最適化は、下記の明示的な指定によって有効化する必要があります。

```
  optimize flow
```

下記の条件を満たした場合、当該命令(`goto` もしくは `return`)から
その次のラベルまでのコードは到達不能コードとして除去されます。

- `return` である
- もしくは、 `goto` であり
  - 対象が計算ラベル以外のラベルであり
  - かつ、アドレス計算を行わない

条件付の命令(`goto-if`, `return-if`)は最適化の対象ではありません。

到達不能領域で削除されるものはコードのみです。
データを配置した場合は有効であり削除されません。

自己書き換え(`*patch*`)を行う際、
対象が到達不能コードの場合はエラーとなります。

```
  proc f() {
      data g = byte @ 0x0000
      NOP
      goto 0       // not a label
      goto g       // computed label
      goto (f + 1) // address calculation
      goto f       // OK

      // -- unreachable --
      NOP
      data byte [0 1 2 3] // valid
      return
  }

  proc g() {
      data a = byte @ <reserved>
      return

      // -- unreachable --
      A <- 0; *patch* a byte // ?? the patch address `a` is unreachable
      goto g
  }
```

## 冗長ジャンプの単純化

この最適化は、下記の明示的な指定によって有効化する必要があります。

```
  optimize flow
```

ジャンプの移動先が、別のジャンプであった場合、
冗長なジャンプとして終端のラベルに単純化されます。

下記の条件を満たす場合、冗長とみなされます。

- `goto`, `goto-if` の対象が
  - 計算ラベルでないラベルであり
  - アドレス計算を行っておらず
  - `goto` もしくは `return` がそのラベルのアドレスにある

終端がリターンの場合、元のジャンプ自体がリターンに置き換えられます。

冗長判定の際にジャンプがループする場合警告が表示されます。

```
  proc f() {
      L0: goto L1 // => RET
      N1: NOP
      L1: goto L2 // => RET
      N2: NOP
      L2: goto L3 // => RET
      N3: NOP
      L3: return  // => RET
  }

  proc g() {
      NOP
      L0: goto L1 // jump cycle detected: L0 -> L1
      L1: goto L2 // jump cycle detected: L1 -> L2
      L2: goto L0 // jump cycle detected: L2 -> L0
  }
```

## 冗長コードの除去

この最適化は、下記の明示的な指定によって有効化する必要があります。

```
  optimize flow
```

特殊命令が連続する際、下記の条件を満たした場合は
冗長コードとみなし前方のものが除去されます。この判定はラベルの有無と無関係に行われます。

- `return; return`
- `return-if <c>; return`
- `return-if <c>; return-if <c>`
- `goto <a>; goto <a>`
- `goto-if <c> <a>; goto <a>`
- `goto-if <c> <a>; goto-if <c> <a>`

除去は繰り返し行われます。ある除去の結果、上記の条件を満たした場合も再度除去が行われます。

また、直後の命令へのジャンプ(`goto`, `goto-if`) も冗長とみなされ除去されます。

```
  proc f() {
      N0: NOP
      L0: goto f       // redundant
      L1: goto f       //

      N2: NOP
      L2: goto-if Z? f // redundant
      L3: goto f       //

      N4: NOP
      L4: goto-if Z? f // redundant
      L5: goto-if Z? f //

      N6: NOP
      L6: goto-if Z? f // redundant
      L7: goto-if C? f // redundant
      L8: goto f       //
  }

  proc g() {
      N0: NOP
      L0: return       // redundant
      L1: return       //

      N2: NOP
      L2: return-if Z? // redundant
      L3: return       //

      N4: NOP
      L4: return-if Z? // redundant
      L5: return-if Z? //

      N6: NOP
      L6: return-if Z? // redundant
      L7: return-if C? // redundant
      L8: return       //
  }

  proc h() {
      L0: goto L1       // redundant
      L1: goto-if Z? L2 // redundant
      L2: return
  }
```
