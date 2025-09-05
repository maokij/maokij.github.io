---
title: "Supported instructions: z80 +r800"
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
  ADC   A [IX N]             DD 8E {@2 L}
  ADC   A [IY N]             FD 8E {@2 L}
  ADC   A IXH                DD 8C
  ADC   A IXL                DD 8D
  ADC   A IYH                FD 8C
  ADC   A IYL                FD 8D
  ADC   HL BC                ED 4A
  ADC   HL DE                ED 5A
  ADC   HL HL                ED 6A
  ADC   HL SP                ED 7A
  ADD   A A                  87
  ADD   A B                  80
  ADD   A C                  81
  ADD   A D                  82
  ADD   A E                  83
  ADD   A H                  84
  ADD   A L                  85
  ADD   A N                  C6 {@2 L}
  ADD   A [HL]               86
  ADD   A [IX N]             DD 86 {@2 L}
  ADD   A [IY N]             FD 86 {@2 L}
  ADD   A IXH                DD 84
  ADD   A IXL                DD 85
  ADD   A IYH                FD 84
  ADD   A IYL                FD 85
  ADD   HL BC                09
  ADD   HL DE                19
  ADD   HL HL                29
  ADD   HL SP                39
  ADD   IX BC                DD 09
  ADD   IX DE                DD 19
  ADD   IX IX                DD 29
  ADD   IX SP                DD 39
  ADD   IY BC                FD 09
  ADD   IY DE                FD 19
  ADD   IY IY                FD 29
  ADD   IY SP                FD 39
  AND   A                    A7
  AND   B                    A0
  AND   C                    A1
  AND   D                    A2
  AND   E                    A3
  AND   H                    A4
  AND   L                    A5
  AND   N                    E6 {@1 L}
  AND   [HL]                 A6
  AND   [IX N]               DD A6 {@1 L}
  AND   [IY N]               FD A6 {@1 L}
  AND   IXH                  DD A4
  AND   IXL                  DD A5
  AND   IYH                  FD A4
  AND   IYL                  FD A5
  BIT   N A                  CB {@1 01???111}
  BIT   N B                  CB {@1 01???000}
  BIT   N C                  CB {@1 01???001}
  BIT   N D                  CB {@1 01???010}
  BIT   N E                  CB {@1 01???011}
  BIT   N H                  CB {@1 01???100}
  BIT   N L                  CB {@1 01???101}
  BIT   N [HL]               CB {@1 01???110}
  BIT   N [IX N]             DD CB {@2 L} {@1 01???110}
  BIT   N [IY N]             FD CB {@2 L} {@1 01???110}
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
  CP    [IX N]               DD BE {@1 L}
  CP    [IY N]               FD BE {@1 L}
  CP    IXH                  DD BC
  CP    IXL                  DD BD
  CP    IYH                  FD BC
  CP    IYL                  FD BD
  CPD                        ED A9
  CPDR                       ED B9
  CPI                        ED A1
  CPIR                       ED B1
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
  DEC   [IX N]               DD 35 {@1 L}
  DEC   [IY N]               FD 35 {@1 L}
  DEC   BC                   0B
  DEC   DE                   1B
  DEC   HL                   2B
  DEC   SP                   3B
  DEC   IX                   DD 2B
  DEC   IY                   FD 2B
  DEC   IXH                  DD 25
  DEC   IXL                  DD 2D
  DEC   IYH                  FD 25
  DEC   IYL                  FD 2D
  DI                         F3
  DJNZ  NN                   10 {@1 REL}
  EI                         FB
  EX    DE HL                EB
  EX    AF AF-               08
  EX    [SP] HL              E3
  EX    [SP] IX              DD E3
  EX    [SP] IY              FD E3
  EXX                        D9
  HALT                       76
  IM    N                    ED {@1 0: 46, 1: 56, 2: 5E}
  IN    A [N]                DB {@2 L}
  IN    A [C]                ED 78
  IN    B [C]                ED 40
  IN    C [C]                ED 48
  IN    D [C]                ED 50
  IN    E [C]                ED 58
  IN    H [C]                ED 60
  IN    L [C]                ED 68
  IN    F [C]                ED 70
  INC   A                    3C
  INC   B                    04
  INC   C                    0C
  INC   D                    14
  INC   E                    1C
  INC   H                    24
  INC   L                    2C
  INC   [HL]                 34
  INC   [IX N]               DD 34 {@1 L}
  INC   [IY N]               FD 34 {@1 L}
  INC   BC                   03
  INC   DE                   13
  INC   HL                   23
  INC   SP                   33
  INC   IX                   DD 23
  INC   IY                   FD 23
  INC   IXH                  DD 24
  INC   IXL                  DD 2C
  INC   IYH                  FD 24
  INC   IYL                  FD 2C
  IND                        ED AA
  INDR                       ED BA
  INI                        ED A2
  INIR                       ED B2
  JP    NN                   C3 {@1 L} {@1 H}
  JP    [HL]                 E9
  JP    [IX N]               DD E9(@1=0)
  JP    [IY N]               FD E9(@1=0)
  JP    NZ? NN               C2 {@2 L} {@2 H}
  JP    Z? NN                CA {@2 L} {@2 H}
  JP    NC? NN               D2 {@2 L} {@2 H}
  JP    C? NN                DA {@2 L} {@2 H}
  JP    PO? NN               E2 {@2 L} {@2 H}
  JP    PE? NN               EA {@2 L} {@2 H}
  JP    P? NN                F2 {@2 L} {@2 H}
  JP    M? NN                FA {@2 L} {@2 H}
  JR    NN                   18 {@1 REL}
  JR    C? NN                38 {@2 REL}
  JR    NC? NN               30 {@2 REL}
  JR    Z? NN                28 {@2 REL}
  JR    NZ? NN               20 {@2 REL}
  LD    A A                  7F
  LD    A B                  78
  LD    A C                  79
  LD    A D                  7A
  LD    A E                  7B
  LD    A H                  7C
  LD    A L                  7D
  LD    A N                  3E {@2 L}
  LD    A [HL]               7E
  LD    A [IX N]             DD 7E {@2 L}
  LD    A [IY N]             FD 7E {@2 L}
  LD    A [BC]               0A
  LD    A [DE]               1A
  LD    A [NN]               3A {@2 L} {@2 H}
  LD    A I                  ED 57
  LD    A R                  ED 5F
  LD    A IXH                DD 7C
  LD    A IXL                DD 7D
  LD    A IYH                FD 7C
  LD    A IYL                FD 7D
  LD    B A                  47
  LD    B B                  40
  LD    B C                  41
  LD    B D                  42
  LD    B E                  43
  LD    B H                  44
  LD    B L                  45
  LD    B N                  06 {@2 L}
  LD    B [HL]               46
  LD    B [IX N]             DD 46 {@2 L}
  LD    B [IY N]             FD 46 {@2 L}
  LD    B IXH                DD 44
  LD    B IXL                DD 45
  LD    B IYH                FD 44
  LD    B IYL                FD 45
  LD    C A                  4F
  LD    C B                  48
  LD    C C                  49
  LD    C D                  4A
  LD    C E                  4B
  LD    C H                  4C
  LD    C L                  4D
  LD    C N                  0E {@2 L}
  LD    C [HL]               4E
  LD    C [IX N]             DD 4E {@2 L}
  LD    C [IY N]             FD 4E {@2 L}
  LD    C IXH                DD 4C
  LD    C IXL                DD 4D
  LD    C IYH                FD 4C
  LD    C IYL                FD 4D
  LD    D A                  57
  LD    D B                  50
  LD    D C                  51
  LD    D D                  52
  LD    D E                  53
  LD    D H                  54
  LD    D L                  55
  LD    D N                  16 {@2 L}
  LD    D [HL]               56
  LD    D [IX N]             DD 56 {@2 L}
  LD    D [IY N]             FD 56 {@2 L}
  LD    D IXH                DD 54
  LD    D IXL                DD 55
  LD    D IYH                FD 54
  LD    D IYL                FD 55
  LD    E A                  5F
  LD    E B                  58
  LD    E C                  59
  LD    E D                  5A
  LD    E E                  5B
  LD    E H                  5C
  LD    E L                  5D
  LD    E N                  1E {@2 L}
  LD    E [HL]               5E
  LD    E [IX N]             DD 5E {@2 L}
  LD    E [IY N]             FD 5E {@2 L}
  LD    E IXH                DD 5C
  LD    E IXL                DD 5D
  LD    E IYH                FD 5C
  LD    E IYL                FD 5D
  LD    H A                  67
  LD    H B                  60
  LD    H C                  61
  LD    H D                  62
  LD    H E                  63
  LD    H H                  64
  LD    H L                  65
  LD    H N                  26 {@2 L}
  LD    H [HL]               66
  LD    H [IX N]             DD 66 {@2 L}
  LD    H [IY N]             FD 66 {@2 L}
  LD    L A                  6F
  LD    L B                  68
  LD    L C                  69
  LD    L D                  6A
  LD    L E                  6B
  LD    L H                  6C
  LD    L L                  6D
  LD    L N                  2E {@2 L}
  LD    L [HL]               6E
  LD    L [IX N]             DD 6E {@2 L}
  LD    L [IY N]             FD 6E {@2 L}
  LD    [HL] A               77
  LD    [HL] B               70
  LD    [HL] C               71
  LD    [HL] D               72
  LD    [HL] E               73
  LD    [HL] H               74
  LD    [HL] L               75
  LD    [HL] N               36 {@2 L}
  LD    [IX N] A             DD 77 {@1 L}
  LD    [IX N] B             DD 70 {@1 L}
  LD    [IX N] C             DD 71 {@1 L}
  LD    [IX N] D             DD 72 {@1 L}
  LD    [IX N] E             DD 73 {@1 L}
  LD    [IX N] H             DD 74 {@1 L}
  LD    [IX N] L             DD 75 {@1 L}
  LD    [IX N] N             DD 36 {@1 L} {@2 L}
  LD    [IY N] A             FD 77 {@1 L}
  LD    [IY N] B             FD 70 {@1 L}
  LD    [IY N] C             FD 71 {@1 L}
  LD    [IY N] D             FD 72 {@1 L}
  LD    [IY N] E             FD 73 {@1 L}
  LD    [IY N] H             FD 74 {@1 L}
  LD    [IY N] L             FD 75 {@1 L}
  LD    [IY N] N             FD 36 {@1 L} {@2 L}
  LD    [BC] A               02
  LD    [DE] A               12
  LD    [NN] A               32 {@1 L} {@1 H}
  LD    [NN] HL              22 {@1 L} {@1 H}
  LD    [NN] BC              ED 43 {@1 L} {@1 H}
  LD    [NN] DE              ED 53 {@1 L} {@1 H}
  LD    [NN] SP              ED 73 {@1 L} {@1 H}
  LD    [NN] IX              DD 22 {@1 L} {@1 H}
  LD    [NN] IY              FD 22 {@1 L} {@1 H}
  LD    I A                  ED 47
  LD    R A                  ED 4F
  LD    BC NN                01 {@2 L} {@2 H}
  LD    BC [NN]              ED 4B {@2 L} {@2 H}
  LD    DE NN                11 {@2 L} {@2 H}
  LD    DE [NN]              ED 5B {@2 L} {@2 H}
  LD    HL NN                21 {@2 L} {@2 H}
  LD    HL [NN]              2A {@2 L} {@2 H}
  LD    SP NN                31 {@2 L} {@2 H}
  LD    SP [NN]              ED 7B {@2 L} {@2 H}
  LD    SP HL                F9
  LD    SP IX                DD F9
  LD    SP IY                FD F9
  LD    IX NN                DD 21 {@2 L} {@2 H}
  LD    IX [NN]              DD 2A {@2 L} {@2 H}
  LD    IY NN                FD 21 {@2 L} {@2 H}
  LD    IY [NN]              FD 2A {@2 L} {@2 H}
  LD    IXH IXH              DD 64
  LD    IXH A                DD 67
  LD    IXH B                DD 60
  LD    IXH C                DD 61
  LD    IXH D                DD 62
  LD    IXH E                DD 63
  LD    IXH IXL              DD 65
  LD    IXH N                DD 26 {@2 L}
  LD    IXL IXH              DD 6C
  LD    IXL IXL              DD 6D
  LD    IXL A                DD 6F
  LD    IXL B                DD 68
  LD    IXL C                DD 69
  LD    IXL D                DD 6A
  LD    IXL E                DD 6B
  LD    IXL N                DD 2E {@2 L}
  LD    IYH IYH              FD 64
  LD    IYH A                FD 67
  LD    IYH B                FD 60
  LD    IYH C                FD 61
  LD    IYH D                FD 62
  LD    IYH E                FD 63
  LD    IYH IYL              FD 65
  LD    IYH N                FD 26 {@2 L}
  LD    IYL IYH              FD 6C
  LD    IYL IYL              FD 6D
  LD    IYL A                FD 6F
  LD    IYL B                FD 68
  LD    IYL C                FD 69
  LD    IYL D                FD 6A
  LD    IYL E                FD 6B
  LD    IYL N                FD 2E {@2 L}
  LDD                        ED A8
  LDDR                       ED B8
  LDI                        ED A0
  LDIR                       ED B0
  MULUB A B                  ED C1
  MULUB A C                  ED C9
  MULUB A D                  ED D1
  MULUB A E                  ED D9
  MULUW HL BC                ED C3
  MULUW HL SP                ED F3
  NEG                        ED 44
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
  OR    [IX N]               DD B6 {@1 L}
  OR    [IY N]               FD B6 {@1 L}
  OR    IXH                  DD B4
  OR    IXL                  DD B5
  OR    IYH                  FD B4
  OR    IYL                  FD B5
  OTDR                       ED BB
  OTIR                       ED B3
  OUT   [N] A                D3 {@1 L}
  OUT   [C] A                ED 79
  OUT   [C] B                ED 41
  OUT   [C] C                ED 49
  OUT   [C] D                ED 51
  OUT   [C] E                ED 59
  OUT   [C] H                ED 61
  OUT   [C] L                ED 69
  OUTD                       ED AB
  OUTI                       ED A3
  POP   BC                   C1
  POP   DE                   D1
  POP   HL                   E1
  POP   AF                   F1
  POP   IX                   DD E1
  POP   IY                   FD E1
  PUSH  BC                   C5
  PUSH  DE                   D5
  PUSH  HL                   E5
  PUSH  AF                   F5
  PUSH  IX                   DD E5
  PUSH  IY                   FD E5
  RES   N A                  CB {@1 10???111}
  RES   N B                  CB {@1 10???000}
  RES   N C                  CB {@1 10???001}
  RES   N D                  CB {@1 10???010}
  RES   N E                  CB {@1 10???011}
  RES   N H                  CB {@1 10???100}
  RES   N L                  CB {@1 10???101}
  RES   N [HL]               CB {@1 10???110}
  RES   N [IX N]             DD CB {@2 L} {@1 10???110}
  RES   N [IY N]             FD CB {@2 L} {@1 10???110}
  RET                        C9
  RET   NZ?                  C0
  RET   Z?                   C8
  RET   NC?                  D0
  RET   C?                   D8
  RET   PO?                  E0
  RET   PE?                  E8
  RET   P?                   F0
  RET   M?                   F8
  RETI                       ED 4D
  RETN                       ED 45
  RL    A                    CB 17
  RL    B                    CB 10
  RL    C                    CB 11
  RL    D                    CB 12
  RL    E                    CB 13
  RL    H                    CB 14
  RL    L                    CB 15
  RL    [HL]                 CB 16
  RL    [IX N]               DD CB {@1 L} 16
  RL    [IY N]               FD CB {@1 L} 16
  RLA                        17
  RLC   A                    CB 07
  RLC   B                    CB 00
  RLC   C                    CB 01
  RLC   D                    CB 02
  RLC   E                    CB 03
  RLC   H                    CB 04
  RLC   L                    CB 05
  RLC   [HL]                 CB 06
  RLC   [IX N]               DD CB {@1 L} 06
  RLC   [IY N]               FD CB {@1 L} 06
  RLCA                       07
  RLD                        ED 6F
  RR    A                    CB 1F
  RR    B                    CB 18
  RR    C                    CB 19
  RR    D                    CB 1A
  RR    E                    CB 1B
  RR    H                    CB 1C
  RR    L                    CB 1D
  RR    [HL]                 CB 1E
  RR    [IX N]               DD CB {@1 L} 1E
  RR    [IY N]               FD CB {@1 L} 1E
  RRA                        1F
  RRC   A                    CB 0F
  RRC   B                    CB 08
  RRC   C                    CB 09
  RRC   D                    CB 0A
  RRC   E                    CB 0B
  RRC   H                    CB 0C
  RRC   L                    CB 0D
  RRC   [HL]                 CB 0E
  RRC   [IX N]               DD CB {@1 L} 0E
  RRC   [IY N]               FD CB {@1 L} 0E
  RRCA                       0F
  RRD                        ED 67
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
  SBC   A [IX N]             DD 9E {@2 L}
  SBC   A [IY N]             FD 9E {@2 L}
  SBC   A IXH                DD 9C
  SBC   A IXL                DD 9D
  SBC   A IYH                FD 9C
  SBC   A IYL                FD 9D
  SBC   HL BC                ED 42
  SBC   HL DE                ED 52
  SBC   HL HL                ED 62
  SBC   HL SP                ED 72
  SCF                        37
  SET   N A                  CB {@1 11???111}
  SET   N B                  CB {@1 11???000}
  SET   N C                  CB {@1 11???001}
  SET   N D                  CB {@1 11???010}
  SET   N E                  CB {@1 11???011}
  SET   N H                  CB {@1 11???100}
  SET   N L                  CB {@1 11???101}
  SET   N [HL]               CB {@1 11???110}
  SET   N [IX N]             DD CB {@2 L} {@1 11???110}
  SET   N [IY N]             FD CB {@2 L} {@1 11???110}
  SLA   A                    CB 27
  SLA   B                    CB 20
  SLA   C                    CB 21
  SLA   D                    CB 22
  SLA   E                    CB 23
  SLA   H                    CB 24
  SLA   L                    CB 25
  SLA   [HL]                 CB 26
  SLA   [IX N]               DD CB {@1 L} 26
  SLA   [IY N]               FD CB {@1 L} 26
  SRA   A                    CB 2F
  SRA   B                    CB 28
  SRA   C                    CB 29
  SRA   D                    CB 2A
  SRA   E                    CB 2B
  SRA   H                    CB 2C
  SRA   L                    CB 2D
  SRA   [HL]                 CB 2E
  SRA   [IX N]               DD CB {@1 L} 2E
  SRA   [IY N]               FD CB {@1 L} 2E
  SRL   A                    CB 3F
  SRL   B                    CB 38
  SRL   C                    CB 39
  SRL   D                    CB 3A
  SRL   E                    CB 3B
  SRL   H                    CB 3C
  SRL   L                    CB 3D
  SRL   [HL]                 CB 3E
  SRL   [IX N]               DD CB {@1 L} 3E
  SRL   [IY N]               FD CB {@1 L} 3E
  SUB   A                    97
  SUB   B                    90
  SUB   C                    91
  SUB   D                    92
  SUB   E                    93
  SUB   H                    94
  SUB   L                    95
  SUB   N                    D6 {@1 L}
  SUB   [HL]                 96
  SUB   [IX N]               DD 96 {@1 L}
  SUB   [IY N]               FD 96 {@1 L}
  SUB   IXH                  DD 94
  SUB   IXL                  DD 95
  SUB   IYH                  FD 94
  SUB   IYL                  FD 95
  XOR   A                    AF
  XOR   B                    A8
  XOR   C                    A9
  XOR   D                    AA
  XOR   E                    AB
  XOR   H                    AC
  XOR   L                    AD
  XOR   N                    EE {@1 L}
  XOR   [HL]                 AE
  XOR   [IX N]               DD AE {@1 L}
  XOR   [IY N]               FD AE {@1 L}
  XOR   IXH                  DD AC
  XOR   IXL                  DD AD
  XOR   IYH                  FD AC
  XOR   IYL                  FD AD
```
