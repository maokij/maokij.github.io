---
title: "Supported instructions: z80 +compat8080"
---
```
  ADC   A A                  8F
  ADC   A B                  88
  ADC   A C                  89
  ADC   A D                  8A
  ADC   A E                  8B
  ADC   A H                  8C
  ADC   A L                  8D
  ADC   A N                  CE {@2 L}
  ADC   A [HL]               8E
  ADD   A A                  87
  ADD   A B                  80
  ADD   A C                  81
  ADD   A D                  82
  ADD   A E                  83
  ADD   A H                  84
  ADD   A L                  85
  ADD   A N                  C6 {@2 L}
  ADD   A [HL]               86
  ADD   HL BC                09
  ADD   HL DE                19
  ADD   HL HL                29
  ADD   HL SP                39
  AND   A                    A7
  AND   B                    A0
  AND   C                    A1
  AND   D                    A2
  AND   E                    A3
  AND   H                    A4
  AND   L                    A5
  AND   N                    E6 {@1 L}
  AND   [HL]                 A6
  CALL  NN                   CD {@1 L} {@1 H}
  CALL  NZ? NN               C4 {@2 L} {@2 H}
  CALL  Z? NN                CC {@2 L} {@2 H}
  CALL  NC? NN               D4 {@2 L} {@2 H}
  CALL  C? NN                DC {@2 L} {@2 H}
  CALL  PO? NN               E4 {@2 L} {@2 H}
  CALL  PE? NN               EC {@2 L} {@2 H}
  CALL  P? NN                F4 {@2 L} {@2 H}
  CALL  M? NN                FC {@2 L} {@2 H}
  CCF                        3F
  CP    A                    BF
  CP    B                    B8
  CP    C                    B9
  CP    D                    BA
  CP    E                    BB
  CP    H                    BC
  CP    L                    BD
  CP    N                    FE {@1 L}
  CP    [HL]                 BE
  CPL                        2F
  DAA                        27
  DEC   A                    3D
  DEC   B                    05
  DEC   C                    0D
  DEC   D                    15
  DEC   E                    1D
  DEC   H                    25
  DEC   L                    2D
  DEC   [HL]                 35
  DEC   BC                   0B
  DEC   DE                   1B
  DEC   HL                   2B
  DEC   SP                   3B
  DI                         F3
  EI                         FB
  EX    DE HL                EB
  EX    [SP] HL              E3
  HALT                       76
  IN    A [N]                DB {@2 L}
  INC   A                    3C
  INC   B                    04
  INC   C                    0C
  INC   D                    14
  INC   E                    1C
  INC   H                    24
  INC   L                    2C
  INC   [HL]                 34
  INC   BC                   03
  INC   DE                   13
  INC   HL                   23
  INC   SP                   33
  JP    NN                   C3 {@1 L} {@1 H}
  JP    [HL]                 E9
  JP    NZ? NN               C2 {@2 L} {@2 H}
  JP    Z? NN                CA {@2 L} {@2 H}
  JP    NC? NN               D2 {@2 L} {@2 H}
  JP    C? NN                DA {@2 L} {@2 H}
  JP    PO? NN               E2 {@2 L} {@2 H}
  JP    PE? NN               EA {@2 L} {@2 H}
  JP    P? NN                F2 {@2 L} {@2 H}
  JP    M? NN                FA {@2 L} {@2 H}
  LD    A A                  7F
  LD    A B                  78
  LD    A C                  79
  LD    A D                  7A
  LD    A E                  7B
  LD    A H                  7C
  LD    A L                  7D
  LD    A N                  3E {@2 L}
  LD    A [HL]               7E
  LD    A [BC]               0A
  LD    A [DE]               1A
  LD    A [NN]               3A {@2 L} {@2 H}
  LD    B A                  47
  LD    B B                  40
  LD    B C                  41
  LD    B D                  42
  LD    B E                  43
  LD    B H                  44
  LD    B L                  45
  LD    B N                  06 {@2 L}
  LD    B [HL]               46
  LD    C A                  4F
  LD    C B                  48
  LD    C C                  49
  LD    C D                  4A
  LD    C E                  4B
  LD    C H                  4C
  LD    C L                  4D
  LD    C N                  0E {@2 L}
  LD    C [HL]               4E
  LD    D A                  57
  LD    D B                  50
  LD    D C                  51
  LD    D D                  52
  LD    D E                  53
  LD    D H                  54
  LD    D L                  55
  LD    D N                  16 {@2 L}
  LD    D [HL]               56
  LD    E A                  5F
  LD    E B                  58
  LD    E C                  59
  LD    E D                  5A
  LD    E E                  5B
  LD    E H                  5C
  LD    E L                  5D
  LD    E N                  1E {@2 L}
  LD    E [HL]               5E
  LD    H A                  67
  LD    H B                  60
  LD    H C                  61
  LD    H D                  62
  LD    H E                  63
  LD    H H                  64
  LD    H L                  65
  LD    H N                  26 {@2 L}
  LD    H [HL]               66
  LD    L A                  6F
  LD    L B                  68
  LD    L C                  69
  LD    L D                  6A
  LD    L E                  6B
  LD    L H                  6C
  LD    L L                  6D
  LD    L N                  2E {@2 L}
  LD    L [HL]               6E
  LD    [HL] A               77
  LD    [HL] B               70
  LD    [HL] C               71
  LD    [HL] D               72
  LD    [HL] E               73
  LD    [HL] H               74
  LD    [HL] L               75
  LD    [HL] N               36 {@2 L}
  LD    [BC] A               02
  LD    [DE] A               12
  LD    [NN] A               32 {@1 L} {@1 H}
  LD    BC NN                01 {@2 L} {@2 H}
  LD    DE NN                11 {@2 L} {@2 H}
  LD    HL NN                21 {@2 L} {@2 H}
  LD    SP NN                31 {@2 L} {@2 H}
  LD    SP HL                F9
  NOP                        00
  OR    A                    B7
  OR    B                    B0
  OR    C                    B1
  OR    D                    B2
  OR    E                    B3
  OR    H                    B4
  OR    L                    B5
  OR    N                    F6 {@1 L}
  OR    [HL]                 B6
  OUT   [N] A                D3 {@1 L}
  POP   BC                   C1
  POP   DE                   D1
  POP   HL                   E1
  POP   AF                   F1
  PUSH  BC                   C5
  PUSH  DE                   D5
  PUSH  HL                   E5
  PUSH  AF                   F5
  RET                        C9
  RET   NZ?                  C0
  RET   Z?                   C8
  RET   NC?                  D0
  RET   C?                   D8
  RET   PO?                  E0
  RET   PE?                  E8
  RET   P?                   F0
  RET   M?                   F8
  RLA                        17
  RLCA                       07
  RRA                        1F
  RRCA                       0F
  RST   N                    {@1 11???111}
  SBC   A A                  9F
  SBC   A B                  98
  SBC   A C                  99
  SBC   A D                  9A
  SBC   A E                  9B
  SBC   A H                  9C
  SBC   A L                  9D
  SBC   A N                  DE {@2 L}
  SBC   A [HL]               9E
  SCF                        37
  SUB   A                    97
  SUB   B                    90
  SUB   C                    91
  SUB   D                    92
  SUB   E                    93
  SUB   H                    94
  SUB   L                    95
  SUB   N                    D6 {@1 L}
  SUB   [HL]                 96
  XOR   A                    AF
  XOR   B                    A8
  XOR   C                    A9
  XOR   D                    AA
  XOR   E                    AB
  XOR   H                    AC
  XOR   L                    AD
  XOR   N                    EE {@1 L}
  XOR   [HL]                 AE
```
