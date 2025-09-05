---
title: "Supported instructions:  mos6502"
---
```
  ADC   N                    69 {@1 L}
  ADC   [N]                  65 {@1 L}
  ADC   [N X]                75 {@1 L}
  ADC   [NN]                 6D {@1 L} {@1 H}
  ADC   [NN X]               7D {@1 L} {@1 H}
  ADC   [NN Y]               79 {@1 L} {@1 H}
  ADC   [[N X]]              61 {@1 L}
  ADC   [[N] Y]              71 {@1 L}
  AND   N                    29 {@1 L}
  AND   [N]                  25 {@1 L}
  AND   [N X]                35 {@1 L}
  AND   [NN]                 2D {@1 L} {@1 H}
  AND   [NN X]               3D {@1 L} {@1 H}
  AND   [NN Y]               39 {@1 L} {@1 H}
  AND   [[N X]]              21 {@1 L}
  AND   [[N] Y]              31 {@1 L}
  ASL   A                    0A
  ASL   [N]                  06 {@1 L}
  ASL   [N X]                16 {@1 L}
  ASL   [NN]                 0E {@1 L} {@1 H}
  ASL   [NN X]               1E {@1 L} {@1 H}
  BCC   NN                   90 {@1 REL}
  BCS   NN                   B0 {@1 REL}
  BEQ   NN                   F0 {@1 REL}
  BIT   [N]                  24 {@1 L}
  BIT   [NN]                 2C {@1 L} {@1 H}
  BMI   NN                   30 {@1 REL}
  BNE   NN                   D0 {@1 REL}
  BPL   NN                   10 {@1 REL}
  BRK                        00
  BVC   NN                   50 {@1 REL}
  BVS   NN                   70 {@1 REL}
  CLC                        18
  CLD                        D8
  CLI                        58
  CLV                        B8
  CMP   N                    C9 {@1 L}
  CMP   [N]                  C5 {@1 L}
  CMP   [N X]                D5 {@1 L}
  CMP   [NN]                 CD {@1 L} {@1 H}
  CMP   [NN X]               DD {@1 L} {@1 H}
  CMP   [NN Y]               D9 {@1 L} {@1 H}
  CMP   [[N X]]              C1 {@1 L}
  CMP   [[N] Y]              D1 {@1 L}
  CPX   N                    E0 {@1 L}
  CPX   [N]                  E4 {@1 L}
  CPX   [NN]                 EC {@1 L} {@1 H}
  CPY   N                    C0 {@1 L}
  CPY   [N]                  C4 {@1 L}
  CPY   [NN]                 CC {@1 L} {@1 H}
  DEC   [N]                  C6 {@1 L}
  DEC   [N X]                D6 {@1 L}
  DEC   [NN]                 CE {@1 L} {@1 H}
  DEC   [NN X]               DE {@1 L} {@1 H}
  DEX                        CA
  DEY                        88
  EOR   N                    49 {@1 L}
  EOR   [N]                  45 {@1 L}
  EOR   [N X]                55 {@1 L}
  EOR   [NN]                 4D {@1 L} {@1 H}
  EOR   [NN X]               5D {@1 L} {@1 H}
  EOR   [NN Y]               59 {@1 L} {@1 H}
  EOR   [[N X]]              41 {@1 L}
  EOR   [[N] Y]              51 {@1 L}
  INC   [N]                  E6 {@1 L}
  INC   [N X]                F6 {@1 L}
  INC   [NN]                 EE {@1 L} {@1 H}
  INC   [NN X]               FE {@1 L} {@1 H}
  INX                        E8
  INY                        C8
  JMP   [NN]                 4C {@1 L} {@1 H}
  JMP   [[NN]]               6C {@1 L} {@1 H}
  JSR   [NN]                 20 {@1 L} {@1 H}
  LDA   N                    A9 {@1 L}
  LDA   [N]                  A5 {@1 L}
  LDA   [N X]                B5 {@1 L}
  LDA   [NN]                 AD {@1 L} {@1 H}
  LDA   [NN X]               BD {@1 L} {@1 H}
  LDA   [NN Y]               B9 {@1 L} {@1 H}
  LDA   [[N X]]              A1 {@1 L}
  LDA   [[N] Y]              B1 {@1 L}
  LDX   N                    A2 {@1 L}
  LDX   [N]                  A6 {@1 L}
  LDX   [N Y]                B6 {@1 L}
  LDX   [NN]                 AE {@1 L} {@1 H}
  LDX   [NN Y]               BE {@1 L} {@1 H}
  LDY   N                    A0 {@1 L}
  LDY   [N]                  A4 {@1 L}
  LDY   [N X]                B4 {@1 L}
  LDY   [NN]                 AC {@1 L} {@1 H}
  LDY   [NN X]               BC {@1 L} {@1 H}
  LSR   A                    4A
  LSR   [N]                  46 {@1 L}
  LSR   [N X]                56 {@1 L}
  LSR   [NN]                 4E {@1 L} {@1 H}
  LSR   [NN X]               5E {@1 L} {@1 H}
  NOP                        EA
  ORA   N                    09 {@1 L}
  ORA   [N]                  05 {@1 L}
  ORA   [N X]                15 {@1 L}
  ORA   [NN]                 0D {@1 L} {@1 H}
  ORA   [NN X]               1D {@1 L} {@1 H}
  ORA   [NN Y]               19 {@1 L} {@1 H}
  ORA   [[N X]]              01 {@1 L}
  ORA   [[N] Y]              11 {@1 L}
  PHA                        48
  PHP                        08
  PLA                        68
  PLP                        28
  ROL   A                    2A
  ROL   [N]                  26 {@1 L}
  ROL   [N X]                36 {@1 L}
  ROL   [NN]                 2E {@1 L} {@1 H}
  ROL   [NN X]               3E {@1 L} {@1 H}
  ROR   A                    6A
  ROR   [N]                  66 {@1 L}
  ROR   [N X]                76 {@1 L}
  ROR   [NN]                 6E {@1 L} {@1 H}
  ROR   [NN X]               7E {@1 L} {@1 H}
  RTI                        40
  RTS                        60
  SBC   N                    E9 {@1 L}
  SBC   [N]                  E5 {@1 L}
  SBC   [N X]                F5 {@1 L}
  SBC   [NN]                 ED {@1 L} {@1 H}
  SBC   [NN X]               FD {@1 L} {@1 H}
  SBC   [NN Y]               F9 {@1 L} {@1 H}
  SBC   [[N X]]              E1 {@1 L}
  SBC   [[N] Y]              F1 {@1 L}
  SEC                        38
  SED                        F8
  SEI                        78
  STA   [N]                  85 {@1 L}
  STA   [N X]                95 {@1 L}
  STA   [NN]                 8D {@1 L} {@1 H}
  STA   [NN X]               9D {@1 L} {@1 H}
  STA   [NN Y]               99 {@1 L} {@1 H}
  STA   [[N X]]              81 {@1 L}
  STA   [[N] Y]              91 {@1 L}
  STX   [N]                  86 {@1 L}
  STX   [N Y]                96 {@1 L}
  STX   [NN]                 8E {@1 L} {@1 H}
  STY   [N]                  84 {@1 L}
  STY   [N X]                94 {@1 L}
  STY   [NN]                 8C {@1 L} {@1 H}
  TAX                        AA
  TAY                        A8
  TSX                        BA
  TXA                        8A
  TXS                        9A
  TYA                        98
```
