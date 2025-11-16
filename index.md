---
layout: page
title: Ocala
---

This site is written in Japanese. Please use your browser's translation function.

Ocala は Z80 / R800 / 6502 に対応したアセンブラです。

## 特徴

- モジュールと名前空間
- 柔軟なリンク機能
- マクロとインライン手続き
- 豊富な制御構造(`if`、 `loop`など)
- 機械語命令の中置記法にも対応
- MSX BIOS ライブラリ添付

## コード例(MSX 用 Hello world)

```
  // Specify the target CPU.
  arch z80
  // Include another file.
  include "msx.oc"
  // Specify the link method.
  msx:link-as-rom main _

  // Define the module.
  module main {
      // Define the procedure.
      proc main() {
          // Define message string data. This will be placed in the rodata section.
          data message = byte [ "Hello, world!" ] : rodata

          // Initialize the SP register. Same as "LD SP, F380h."
          SP <- msx:STACK_ADDR
          // Initialize the screen as 32x24 mode using BIOS.
          msx:init32(!)
          // Transfer data to the screen using BIOS.
          BC@sizeof(message) . DE@msx:t32nam(10 12) . HL@message . msx:ldirvm(BC DE HL => !)

          // The main loop. Do nothing.
          never-return loop { msx:wait }
      }
  }
```

出力リストファイル:

```
       - 4000                                 .org 16384
  000000 4000[8] 41 42 10 40 00 00 00 00      .byte 65, 66, 16, 64, 0, 0, 0, 0
  000008 4008[8] 00 00 00 00 00 00 00 00      .byte 0, 0, 0, 0, 0, 0, 0, 0

       - 4010                             main:main:
  000010 4010[3] 31 80 f3                     LD     SP, msx:STACK_ADDR
  000013 4013[3] cd 6f 00                     CALL   msx:init32
  000016 4016[3] 01 0d 00                     LD     BC, sizeof(.message.#984)
  000019 4019[3] 11 8a 19                     LD     DE, msx:t32nam(10 12)
  00001c 401c[3] 21 26 40                     LD     HL, .message.#984
  00001f 401f[3] cd 5c 00                     CALL   msx:ldirvm
       - 4022                             .beg.G1.#988:
  000022 4022[1] 76                           HALT
  000023 4023[3] c3 22 40                     JP     .beg.G1.#988

       - 4026                                 .align 2 ; (.defb 0)
       - 4026                             .message.#984:
  000026 4026[8] 48 65 6c 6c 6f 2c 20 77      .byte "Hello, world!"
            :[5] 6f 72 6c 64 21

       - c000                                 .org 49152
```
