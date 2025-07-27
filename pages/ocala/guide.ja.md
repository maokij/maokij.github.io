---
title: Ocala 概説
---

Ocala は 8 bit CPU/MPU をターゲットとしたアセンブラです。
各種の構造化機構と対象文脈式を特徴とします。
現在 Z80 および 6502 のバイナリ出力に対応しています。

## 手続きとコード

Ocala ではコードは手続きの中に記述します。

```
  proc <proc-name>(<signature>) { ... }
```

コードは以下の 2 種類の記法で記述できます。

- 機械語命令記法(直接記法)
- 対象文脈記法(中置記法)

機械語命令記法では、CPU 依存の機械語命令を直接記述します。
ただし、`(...)` は定数の記述となるため、メモリ参照には `[...]` を利用します。
また、オペランドの区切りの`,`は省略できます。

```
  LD A 10
  LD A [HL]
  INC A
```

対象文脈記法では、対象となるオペランドを指定し、その文脈での操作を列記します。

```
  A             // Specify the target operand.
    <- 10       // LD  A 10
    +  20       // ADD A 20
    -> [0x1234] // LD [0x1234] A

  A <- 10 + 20 -> [0x1234]  // Same as above.
```

## 手続きのシグネチャ

手続きにはシグネチャを指定できます。
シグネチャは手続き内でのレジスタの用法に関する注記です。
手続きの呼び出し時はこのシグネチャも記述する必要があります。
意図を示す注記であり、実際の用法を検査するものではありません。

```
  proc f(A B HL => A ! BC E) { // In:     A, B and HL
      ...                      // Out:    A
  }                            // Modify: BC and E.

  proc g(=> A L !) {           // In:     none
      ...                      // Out:    A and L
  }                            // Modify: all others

  proc main() {
      f(A B HL => A ! BC E)    // OK
      f()                      // ?? proc signature mismatch: f.
      g(=> A L !)              // OK
      ...
  }
```

## 手続きの末尾

手続きの末尾は `return` / `goto` もしくはその派生である必要があります。

```
  // Valid
  proc valid-a() {
    return          // OK
  }
  proc valid-b() {
    goto valid-c    // OK
  }
  proc valid-c() {
    fallthrough     // OK: same as `goto valid-d`
  }
  proc valid-d() {
    recur           // OK: same as `goto valid-d`
  }
  proc valid-e() {
    never-return loop { NOP } // OK: never return
  }

  // Invalid
  proc invalid-a() {
    NOP              // ?? the last instruction must be a return/fallthrough within the proc
  }
  proc invalid-b() {
    fallthrough      // ?? it is the last proc
  }
```

## 名前の構成

手続き名など、プログラム上で扱う名前(識別子)には、
英数字(`a-zA-Z0-9`)と一部の記号(`-^!$%&*+/<=>?|~_`)を使用できます。

`+` や `-` などの演算子も名前(識別子)として扱われるので、空白などを用いずに詰めて
記述すると別の識別子として扱われます。
例えば、単項マイナス演算子(`-`)は括弧を用いる必要があります。

```
proc f-g() { return } // the procedure named `f-g'
const f+g = 1 // OK: the constant named `f+g'

A + 1 // register `A', operator `+', number `1'
A+1 // ?? unknown form name A+1

L001:
HL <- -(L001) // OK
HL <- -L001 // ?? undefined name -L001
```

## 区切り文字

プログラム中では、`,` 記号は通常空白文字と同様に扱われます。
ただし、2 個以上連続して記述することはできません。
また、行末に記述すると行の継続を示すことができます。

```
LD A 1  // OK
LD A, 1 // OK
LD A,, 1 // ??
LD A,
   1 // OK: LD A 1
```

## インライン手続き

手続きのシグネチャの先頭に `-*` を指定すると、インライン手続き定義となります。
インライン手続きは呼び出し側に直接展開されます。

```
  proc i(-* A => !) { // Inline
    ...
  }

  proc main() {
      i(-* A => !)    // OK
      i(A => !)       // ?? signature mismatch
  }
```

## メモリ参照

メモリの参照は `[...]` を使用します。
6502 であってもメモリ参照には括弧を使用する必要があります。

```
  LD A 12
  LD HL [0xfffe]
  C <- [HL@1024] // LD HL, 1024; LD C, (HL)

  LDA 1          // LDA #1
  LDA [8]        // LDA 8
  LDA [[8] Y]    // LDA (8), Y
```

## 対象文脈式演算子

対象文脈では以下の操作を記述できます(_ は文脈、% は引数)。

| 操作        | Z80                           | 6502                            |
|-------------|-------------------------------|---------------------------------|
| `<- %`      | `LD _ %`                      | `T%_ / LD_ %`                   |
| `-> %`      | `LD % _`                      | `T_% / ST_ %`                   |
| `<-> %`     | `EX _ %`                      | -                               |
| `+ %`       | `ADD _ %`                     | `CLC; ADC %`                    |
| `+$ %`      | `ADC _ %`                     | `ADC %`                         |
| `- %`       | `SUB %` /<br> `OR A; SBC _ %` | `SEC; SBC %`                    |
| `-$ %`      | `SBC _ %`                     | `SBC %`                         |
| `-? %`      | `CP _ %`                      | `CM_ %`                         |
| `& %`       | `AND %`                       | `AND %`                         |
| `\| %`      | `OR %`                        | `ORA %`                         |
| `^ %`       | `XOR %`                       | `EOR %`                         |
| `<* %`      | (`RLCA` / `RLC _`) * %        | (`CMP 0x80; ROL A`) * %         |
| `<*$ %`     | (`RLA` / `RL _`) * %          | (`ROL _`) * %                   |
| `>* %`      | (`RRCA` / `RRC _`) * %        | (`LSR A; BCC +2; ORA 0x80`) * % |
| `>*$ %`     | (`RRA` / `RR _`) * %          | (`ROR _`) * %                   |
| `<< %`      | (`SLA _`) * %                 | (`ASL _`) * %                   |
| `>> %`      | (`SRA _`) * %                 | (`CMP 0x80; ROR A`) * %         |
| `>>> %`     | (`SRL _`) * %                 | (`LSR _`) * %                   |
| `-set %`    | `SET % _`                     | -                               |
| `-reset %`  | `RES % _`                     | -                               |
| `-bit? %`   | `BIT % _`                     | `BIT`                           |
| `-in %`     | `IN _ %`                      | -                               |
| `-out %`    | `OUT % _`                     | -                               |
| `++`        | `INC _`                       | `CLC; ADC 1` / `IN_` / `INC _`  |
| `--`        | `DEC _`                       | `SEC; SBC 1` / `DE_` / `DEC _`  |
| `-push`     | `PUSH _`                      | `PH_`                           |
| `-pop`      | `POP _`                       | `PL_`                           |
| `-not`      | `CPL`                         | `EOR 0xff`                      |
| `-neg`      | `NEG`                         | `EOR 0xff; CLC; ADC 1`          |
| `-zero?`    | `AND A` /<br>`INC _; DEC _`   | -                               |
|             |                               |                                 |
| `@%`        | alias of `<-`                 |                                 |
| `. { ... }` | inline sub context            |                                 |

## 制御構造

手続き内では、以下の制御構造を使用できます。

| 制御構造                         | 処理内容                     |
|----------------------------------|------------------------------|
| **基本ブロック**                 |                              |
| `do { ... }`                     | ブロック評価                 |
| `<label>:`                       | ラベル定義                   |
| **分岐**                         |                              |
| `if <cond> { ... } else { ... }` | 条件分岐                     |
| `goto <label>`                   | ジャンプ                     |
| `goto-if <cond> <label>`         | 条件ジャンプ                 |
| `goto-rel <label>`               | (Z80) 相対ジャンプ           |
| `goto-rel-if <cond> <label>`     | (Z80) 相対条件ジャンプ       |
| **ループ制御**                   |                              |
| `loop { ... }`                   | 無限ループ                   |
| `loop { ... } while <cond>`      | 条件ループ                   |
| `once { ... }`                   | 1度のみのループ              |
| `redo`                           | ループ先頭へジャンプ         |
| `redo-if <cond>`                 | ループ先頭へ条件ジャンプ     |
| `continue`                       | ループ条件部へジャンプ       |
| `continue-if <cond>`             | ループ条件部へ条件ジャンプ   |
| `break`                          | ループ中断                   |
| `break-if <cond>`                | 条件付ループ中断             |
| **手続き制御**                   |                              |
| `return`                         | リターン                     |
| `return-if <cond>`               | (Z80) 条件リターン           |
| `recur`                          | 手続き先頭へジャンプ         |
| `fallthrough`                    | リターンせず次の手続きを評価 |
| `never-return loop { ... }`      | 手続き末で無限ループ         |

条件 `<cond>` として、以下を使用できます。

| Z80   | Z80 別名           | 6502  | 6502 別名                    |
|-------|--------------------|-------|------------------------------|
| `NZ?` | `!=?` `not-zero?`  | `NE?` | `!=?` `not-zero?`            |
| `Z?`  | `==?` `zero?`      | `EQ?` | `==?` `zero?`                |
| `NC?` | `>=?` `not-carry?` | `CC?` | `<?` `not-carry?` `borrow?`  |
| `C?`  | `<?` `carry?`      | `CS?` | `>=?` `carry?` `not-borrow?` |
| `PO?` | `odd?` `not-over?` | `VC?` | `not-over?`                  |
| `PE?` | `even?` `over?`    | `VS?` | `over?`                      |
| `P?`  | `plus?`            | `PL?` | `plus?`                      |
| `M?`  | `minus?`           | `MI?` | `minus?`                     |

## 定数

Ocala では、定数を定義することができます。

```
  const <const-name> = <constexpr>
```

定数式では他の定数やラベルを参照できます。また、各種の演算子や括弧も利用可能です。

```
  data ROM_ADDR = 0x4000
  data RAM_ADDR = ROM_ADDR + 0x8000
```

## 定数式演算子

定数式では、以下の演算子を利用可能です。

| operator          |
|-------------------|
| `*` `/` `%`       |
| `+` `-`           |
| `<<` `>>` `>>>`   |
| `<` `<=` `>` `>=` |
| `==` `!=`         |
| `&`               |
| `\|`              |
| `^`               |
| `&&`              |
| `\|\|`            |

## 構造体

Ocala では、構造体を定義することができます。

```
  struct { <field> ... }
  struct <struct-name> { <field> ... }

  <field>:
    <field-name> <type>
```

構造体は入れ子にできますが、内側の構造体は名前を持てません。

```
  struct point {
    x byte
    y byte
  }

  struct point { x byte; y byte } // OK: same as above

  struct outer {   // named struct
    inner struct { // unnamed struct
      x byte
    }
  }
```

構造体型のデータは `.` を利用してフィールドのアドレスを参照できます。
`.` の後には空白を入れずにフィールド名を記述します。

```
  struct point {
    x byte
    y byte
  }

  data pt = point { 0 0 }
  data byte pt.x pt.z // OK
  data byte pt. x     // ?? scan error
```

## データ

Ocala では、データを定義することができます。

```
  data <type> <data-body> <repeat> <allocation>
  data <data-name> = <type> <data-body> <repeat> <allocation>

  <data-body>:
    [ ... ]
    { ... }
  <repeat>:
    * <integer>
  <allocation>:
    : <section-name>
    @ <address>
```

データの定義では、データ本体を含めた定義とデータ本体を持たない領域のみの定義が可能です。

データの名前を指定した場合、ラベルとして参照できます。
また名前のあるデータは、定数式内で `sizeof` 式でサイズを取得できます。

データには型が必要です。byte(1 バイト単位定義) または word(2 バイト単位定義) を指定できます。
構造体名や `struct { ... }` そのものを指定することもできます。

`data` ディレクティブはデータの配列を定義します。
配列のサイズは型の前に `[<size>]` で指定します。
データ本体がある場合、要素数は省略可能です。

データの型として単独の型を指定した場合、実際にはその型の配列を指定したことと同義です。
この場合、サイズは省略されたものとして、データ本体の要素数から自動で設定されます。
データ本体がない場合は 1 要素の配列として扱われます。

```
data byte          // OK: same as `data [1]byte`
data byte [123]    // OK: same as `data [1]byte`
data []byte [123]  // OK: same as `data [1]byte`
data [1]byte [123] // OK
```

データの本体は型の直後に記述します。空の場合は省略できます。
通常は `[...]` を指定してデータの配列を記述します。
構造体の場合は `{...}` を記述します。
これらを組み合わせて「構造体の配列」なども記述できます。

データの型が `byte` の場合、 要素として `"..."` の形式で文字列を指定できます。
実態はバイト型データの配列です。 C 言語などとは異なりゼロ終端はされません。

データは繰り返し回数を指定できます。省略時のデフォルトは 1 です。

データは配置セクションまたは配置アドレスを指定できます。
省略時のデフォルトは現在のセクションへの配置です。
配置アドレスとして特別なアドレス `<reserved>` を指定すると、データの配置アドレスを予約できます。
予約されたデータ配置アドレスは主に自己書き換えに利用します。
`*patch*` ディレクティブで後から配置アドレスを設定できます。

```
  data byte [0 1 2 3]
  data []byte [0 1 2 3] @ 0x1000
  data struct { x byte; y byte } { 4 5 }
  data str = byte [ "hello!" ]
  data tab = byte [ 0 1 2 4 8 ] : rodata
  data dat = word * 10 : bss
  data smc = byte @ <reserved>
  A <- 0; *patch* smc byte
```

## モジュール

Ocala ではプログラムは複数の「モジュール」から構成されます。

```
  module <module-name> { ... }
```

モジュールは以下の 2 つの側面を持ちます。

- 名前空間
- セクション(バイナリの配置区画)の集合

モジュールは名前空間です。
Ocala では定数や手続きなどの名前は字句的に解決されます。ただし、名前空間を指定することで
他のモジュールに属する名前を参照することもできます。

```
  module mod-a {
    const c = 1
    const d = c + 1
  }

  module mod-b {
    const c = mod-a:d // Use the constant 'd' in the module 'mod-a'
  }
```

セクションはコードやデータの集まりです。
出力バイナリ上ではセクション単位でコードとデータが配置されます。
モジュール定義直下では任意の位置でセクションの開始を宣言できます。

```
  section <section-name>
```

標準で各モジュールごとに以下のセクションを持ちます。

- text(コード領域)
- rodata(読込専用データ領域)
- bss(未初期化データ領域)

モジュールや手続きは以下の要素から構成されます。

- データ定義文
- 機械語命令文
- 対象文脈式文
- その他の特殊形式文(疑似命令)

## リンク

各モジュールの各セクションはコード生成前に内部中間表現レベルで
「リンク」処理され結合されます。

リンク処理の内容は link 特殊形式を利用して指定します。

```
  link { <link-directive>... }

  <link-directive>:
    org <address> <size> <mode>
    merge <section-name> <module-name>...
```

例えば、以下の様に text セクションと bss セクションをリンクします。

```
  link {
     org 0x4000 0x8000 2  // Set the current address to 0x4000.
                          // Set the region size to 0x8000 bytes.
                          // Output zero-padded binary(mode 2).
     merge text main _    // Merge all text sections.
                          // Start with the main module.
     merge rodata main _  // Merge all rodata sections.

     org 0xc000 0x4000 0  // Set the current address to 0xc000.
                          // Set the region size to 0x4000 bytes.
                          // Do not output this region(mode 0).
     merge bss main _     // Merge all bss sections.
  }
```

一般にリンク処理の内容は対象機種毎にほぼ定型であるため、
ライブラリ側でリンク方法をマクロ定義できます。
そのため、実際にはプログラム側では link 特殊形式を直接記述せずに
ライブラリに定義されたマクロを利用します。

```
include "msx.oc"
msx:link-as-rom main _
```

## マクロ

マクロを定義することで、複数の処理をまとめることができます。

```
  macro <macro-name> ( <param>... ) [ <var>... ] { ... }
```

マクロではマクロ引数を使用できます。
`<name>: <default>` の形式で省略可能な引数を指定できます。
最後の引数に `...` を指定すると可変長引数となります。

また、ラベル等に利用できるマクロ変数を使用できます。
マクロ変数はマクロ外と重複しない名前に展開されます。

```
  macro myloop(body) [beg] {
    %=beg: do %=body
    goto %=beg
  }

  myloop { NOP }
```

引数、変数は以下のプレースホルダーを利用して展開できます。

| プレースホルダー | 展開内容                     |
|------------------|------------------------------|
| %=               | そのままの値                 |
| %*               | 可変長引数の埋め込み         |
| %#               | 可変長引数の個数             |
| %&               | 定数式内へ非定数式を埋め込み |

## ブロックとスコープ

Ocala ではコードをブロックでまとめることができます。

```
  { ... }
  ={ ... }
```

ブロック単体では妥当な文とはならないため、他の構文と組み合わせる必要があります。
単純な文の並びとして扱うだけであれば `do { ... }` 構文が使用できます。
その他、条件文などにも使用できます。

ブロックには `{ ... }` と `={ ... }` の 2 種類があります。
違いはブロック内の可視範囲の扱いです。
`{ ... }` の場合、ブロック内は新たな可視範囲となり、ブロック外から
ネストされたものとなります。
ネストされた可視範囲では名前のシャドウイングが可能であり、
ブロックの外のものと同じ名前の定数などを定義できます。
`={ ... }` はブロック外と可視範囲を共有し、
新たな可視範囲を構成しません。

```
  proc f() {
    const a = 0
    do {
      const a = 1 // OK
    }
    do ={
      const a = 2 // ?? a is already defined
    }
    ...
  }

```

ブロックの違いはマクロ定義にも適用されます。
`={ ... }` で定義されたマクロは展開箇所の可視範囲を共有します。

```
macro m()  { const a = 1 }
macro n() ={ const a = 2 }

proc f() {
  const a = 0
  m // OK
  n // ?? a is already defined
}
```

## ディレクティブ

ソースコード中、以下のディレクティブを利用できます。

| ディレクティブ                        | 機能                       |
|---------------------------------------|----------------------------|
| `include "<path>"`                    | 他ソースファイルの読込     |
| `incbin "<path>"`                     | 他ファイルの埋め込み       |
| `section <section-name>`              | セクション変更             |
| `section <section-nmame> { ... }`     | ブロック内のセクション指定 |
| `if <constexpr> { ... } else { ... }` | 条件コンパイル             |
| `expand-loop <n> { ... }`             | n 回のループ展開           |
| `alias <to> <from>`                   | 別名定義                   |
| `assert <constexpr>`                  | リンク時アサーション       |
| `import <namespace>`                  | 名前空間のインポート       |
| `debug-inspect <constexpr>`           | 式の値の表示(デバッグ用)   |

## その他の補助機能

その他以下の補助機能を使用可能です。

| 制御構造                    | 処理内容                             |
|-----------------------------|--------------------------------------|
| **スタック**                |                                      |
| `push* <reg>...`            | 一括プッシュ                         |
| `pop* <reg>...`             | 一括ポップ                           |
| `push/pop <reg>... { ... }` | レジスタを一時退避してブロックを評価 |
| **割り込み**                |                                      |
| `di/ei { ... }`             | (Z80) DI、ブロック評価、EI           |
| **フラグ**                  |                                      |
| `set-carry`                 | キャリーフラグセット                 |
| `clear-carry`               | キャリーフラグクリア                 |
| `clear-over`                | (6502) オーバーフローフラグクリア    |
