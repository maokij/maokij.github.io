---
title: その他詳細
---

## 言語詳細

- [Ocala Syntax]({% link pages/ocala/syntax.md %})
- [arch z80]({% link pages/ocala/arch-z80.md %})
- [arch mos6502]({% link pages/ocala/arch-mos6502.md %})

## サポートされる CPU と命令セット

`arch` ディレクティブやコマンドラインの `-t` オプションでは下記を指定できます。

| arch                | -t                 |                      |
|---------------------|--------------------|----------------------|
| `z80`               | `z80`              | z80 (公式命令)       |
| `z80 +undocumented` | `z80+undocumented` | z80 (非公式命令対応) |
| `mos6502`           | `mos6502` / `6502` | 6502                 |

これらの値は `arch` ディレクティブでは複数引数として指定します。
そのため、空白文字で区切る必要があります。
コマンドラインでは 1 引数として扱うため空白文字を入れずに指定します。

```
arch z80
arch z80 +undocumented
arch mos6502
```

```
$ ocala -t 6502 main.oc
$ ocala -t z80+undocumented main.oc
```

