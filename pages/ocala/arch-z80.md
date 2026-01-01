---
title: "arch: z80"
---
```
(arch z80
  (operand A   RegA   "A"    "A")
  (operand B   RegB   "B"    "B")
  (operand C   RegC   "C"    "C")
  (operand D   RegD   "D"    "D")
  (operand E   RegE   "E"    "E")
  (operand H   RegH   "H"    "H")
  (operand L   RegL   "L"    "L")

  (operand HL  RegHL  "HL"   "HL")
  (operand HL$ MemHL  "[HL]" "(HL)")
  (operand BC  RegBC  "BC"   "BC")
  (operand BC$ MemBC  "[BC]" "(BC)")
  (operand DE  RegDE  "DE"   "DE")
  (operand DE$ MemDE  "[DE]" "(DE)")
  (operand AF  RegAF  "AF"   "AF")
  (operand AF- AltAF  "AF-"  "AF'")
  (operand SP  RegSP  "SP"   "SP")
  (operand SP$ MemSP  "[SP]" "(SP)")
  (operand PC  RegPC  "PC"   "PC")
  (operand PQ  RegPQ  "PQ"   "PQ")

  (operand IX  RegIX  "IX"      "IX")
  (operand IX$ MemIX  "[IX %B]" "(IX+%B)" WX$ temp)
  (operand WX$ MemWX  "[IX %W]" "(IX+%W)")
  (operand IY  RegIY  "IY"      "IY")
  (operand IY$ MemIY  "[IY %B]" "(IY+%B)" WY$ temp)
  (operand WY$ MemWY  "[IY %W]" "(IY+%W)")

  (operand N   ImmN   "%B"   "0+ %B" NN temp)
  (operand N$  MemN   "[%B]" "(%B)"  NN$ temp)
  (operand NN  ImmNN  "%W"   "0+ %W" N)
  (operand NN$ MemNN  "[%W]" "(%W)"  N$)
  (operand C$  MemC   "[C]"  "(C)")
  (operand I   RegI   "I"    "I")
  (operand R   RegR   "R"    "R")
  (operand F   RegF   "F"    "F")

  (operand NZ? CondNZ "NZ?"  "NZ")
  (operand Z?  CondZ  "Z?"   "Z")
  (operand NC? CondNC "NC?"  "NC")
  (operand C?  CondC  "C?"   "C")
  (operand PO? CondPO "PO?"  "PO")
  (operand PE? CondPE "PE?"  "PE")
  (operand P?  CondP  "P?"   "P")
  (operand M?  CondM  "M?"   "M")

  (registers A B C D E H L I R F AF AF- BC DE HL IX IY SP PC)
  (conditions
    (NZ? !=? not-zero?)
    (Z?  ==? zero?)
    (NC? >=? not-carry?)
    (C?  <? carry?)
    (PO? odd? not-over?)
    (PE? even? over?)
    (P?  plus?)
    (M?  minus?))

  (map R8 A 7 B 0 C 1 D 2 E 3 H 4 L 5)
  (map QQ BC 0 DE 1 HL 2 AF 3)
  (map DD BC 0 DE 1 HL 2 SP 3)
  (map PP BC 0 DE 1 IX 2 SP 3)
  (map RR BC 0 DE 1 IY 2 SP 3)
  (map CC NZ? 0 Z? 1 NC? 2 C? 3 PO? 4 PE? 5 P? 6 M? 7)

  (opcode  LD (a b)
    (R8 R8)  [(+ 0b0100_0000 (R8 a 3) (R8 b))]
    (R8 N)   [(+ 0b0000_0110 (R8 a 3)) (=l b)]

    (R8 HL$) [(+ 0b0100_0110 (R8 a 3))]
    (R8 IX$) [0xDD (+ 0b0100_0110 (R8 a 3)) (=l b)]
    (R8 IY$) [0xFD (+ 0b0100_0110 (R8 a 3)) (=l b)]

    (HL$ R8) [(+ 0b0111_0000 (R8 b))]
    (IX$ R8) [0xDD (+ 0b0111_0000 (R8 b)) (=l a)]
    (IY$ R8) [0xFD (+ 0b0111_0000 (R8 b)) (=l a)]

    (HL$ N)  [0x36 (=l b)]
    (IX$ N)  [0xDD 0x36 (=l a) (=l b)]
    (IY$ N)  [0xFD 0x36 (=l a) (=l b)]

    (A BC$)  [0x0A]
    (A DE$)  [0x1A]
    (A NN$)  [0x3A (=l b) (=h b)]
    (BC$ A)  [0x02]
    (DE$ A)  [0x12]
    (NN$ A)  [0x32 (=l a) (=h a)]

    (A I)    [0xED 0x57]
    (A R)    [0xED 0x5F]
    (I A)    [0xED 0x47]
    (R A)    [0xED 0x4F]

    (DD NN)  [(+ 0b0000_0001 (DD a 4)) (=l b) (=h b)]
    (IX NN)  [0xDD 0x21 (=l b) (=h b)]
    (IY NN)  [0xFD 0x21 (=l b) (=h b)]

    (HL NN$) [0x2A (=l b) (=h b)]
    (DD NN$) [0xED (+ 0b0100_1011 (DD a 4)) (=l b) (=h b)]
    (IX NN$) [0xDD 0x2A (=l b) (=h b)]
    (IY NN$) [0xFD 0x2A (=l b) (=h b)]

    (NN$ HL) [0x22 (=l a) (=h a)]
    (NN$ DD) [0xED (+ 0b0100_0011 (DD b 4)) (=l a) (=h a)]

    (NN$ IX) [0xDD 0x22 (=l a) (=h a)]
    (NN$ IY) [0xFD 0x22 (=l a) (=h a)]

    (SP HL)  [0xF9]
    (SP IX)  [0xDD 0xF9]
    (SP IY)  [0xFD 0xF9])

  (opcode  PUSH (a)
    (QQ) [(+ 0b1100_0101 (QQ a 4))]
    (IX) [0xDD 0xE5]
    (IY) [0xFD 0xE5])

  (opcode  POP (a)
    (QQ) [(+ 0b1100_0001 (QQ a 4))]
    (IX) [0xDD 0xE1]
    (IY) [0xFD 0xE1])

  (opcode  EX (a b)
    (DE  HL)  [0xEB]
    (AF  AF-) [0x08]
    (SP$ HL)  [0xE3]
    (SP$ IX)  [0xDD 0xE3]
    (SP$ IY)  [0xFD 0xE3])
  (opcode  EXX  () () [0xD9])

  (opcode  LDI  () () [0xED 0xA0])
  (opcode  LDIR () () [0xED 0xB0])
  (opcode  LDD  () () [0xED 0xA8])
  (opcode  LDDR () () [0xED 0xB8])

  (opcode  CPI  () () [0xED 0xA1])
  (opcode  CPIR () () [0xED 0xB1])
  (opcode  CPD  () () [0xED 0xA9])
  (opcode  CPDR () () [0xED 0xB9])

  (opcode  ADD (a b)
    (A R8)  [(+ 0b1000_0000 (R8 b))]
    (A N)   [0xC6 (=l b)]
    (A HL$) [0x86]
    (A IX$) [0xDD 0x86 (=l b)]
    (A IY$) [0xFD 0x86 (=l b)]

    (HL DD) [(+ 0b0000_1001 (DD b 4))]
    (IX PP) [0xDD (+ 0b0000_1001 (PP b 4))]
    (IY RR) [0xFD (+ 0b0000_1001 (RR b 4))])

  (opcode  ADC (a b)
    (A R8)  [(+ 0b1000_1000 (R8 b))]
    (A N)   [0xCE (=l b)]
    (A HL$) [0x8E]
    (A IX$) [0xDD 0x8E (=l b)]
    (A IY$) [0xFD 0x8E (=l b)]

    (HL DD) [0xED (+ 0b0100_1010 (DD b 4))])

  (opcode  SUB (a)
    (R8)  [(+ 0b1001_0000 (R8 a))]
    (N)   [0xD6 (=l a)]
    (HL$) [0x96]
    (IX$) [0xDD 0x96 (=l a)]
    (IY$) [0xFD 0x96 (=l a)])

  (opcode  SBC (a b)
    (A R8)  [(+ 0b1001_1000 (R8 b))]
    (A N)   [0xDE (=l b)]
    (A HL$) [0x9E]
    (A IX$) [0xDD 0x9E (=l b)]
    (A IY$) [0xFD 0x9E (=l b)]

    (HL DD) [0xED (+ 0b0100_0010 (DD b 4))])

  (opcode  AND (a)
    (R8)  [(+ 0b1010_0000 (R8 a))]
    (N)   [0xE6 (=l a)]
    (HL$) [0xA6]
    (IX$) [0xDD 0xA6 (=l a)]
    (IY$) [0xFD 0xA6 (=l a)])

  (opcode  OR (a)
    (R8)  [(+ 0b1011_0000 (R8 a))]
    (N)   [0xF6 (=l a)]
    (HL$) [0xB6]
    (IX$) [0xDD 0xB6 (=l a)]
    (IY$) [0xFD 0xB6 (=l a)])

  (opcode  XOR (a)
    (R8)  [(+ 0b1010_1000 (R8 a))]
    (N)   [0xEE (=l a)]
    (HL$) [0xAE]
    (IX$) [0xDD 0xAE (=l a)]
    (IY$) [0xFD 0xAE (=l a)])

  (opcode  CP (a)
    (R8)  [(+ 0b1011_1000 (R8 a))]
    (N)   [0xFE (=l a)]
    (HL$) [0xBE]
    (IX$) [0xDD 0xBE (=l a)]
    (IY$) [0xFD 0xBE (=l a)])

  (opcode  INC (a)
    (R8)  [(+ 0b0000_0100 (R8 a 3))]
    (HL$) [0x34]
    (IX$) [0xDD 0x34 (=l a)]
    (IY$) [0xFD 0x34 (=l a)]

    (DD)  [(+ 0b0000_0011 (DD a 4))]
    (IX) [0xDD 0x23]
    (IY) [0xFD 0x23])

  (opcode  DEC (a)
    (R8)  [(+ 0b0000_0101 (R8 a 3))]
    (HL$) [0x35]
    (IX$) [0xDD 0x35 (=l a)]
    (IY$) [0xFD 0x35 (=l a)]

    (DD)  [(+ 0b0000_1011 (DD a 4))]
    (IX)  [0xDD 0x2B]
    (IY)  [0xFD 0x2B])

  (opcode  RLCA () () [0x07])
  (opcode  RLA  () () [0x17])
  (opcode  RRCA () () [0x0F])
  (opcode  RRA  () () [0x1F])

  (opcode  RLC (a)
    (R8)  [0xCB (+ 0b0000_0000 (R8 a))]
    (HL$) [0xCB 0x06]
    (IX$) [0xDD 0xCB (=l a) 0x06]
    (IY$) [0xFD 0xCB (=l a) 0x06])

  (opcode  RL (a)
    (R8)  [0xCB (+ 0b0001_0000 (R8 a))]
    (HL$) [0xCB 0x16]
    (IX$) [0xDD 0xCB (=l a) 0x16]
    (IY$) [0xFD 0xCB (=l a) 0x16])

  (opcode  RRC (a)
    (R8)  [0xCB (+ 0b0000_1000 (R8 a))]
    (HL$) [0xCB 0x0E]
    (IX$) [0xDD 0xCB (=l a) 0x0E]
    (IY$) [0xFD 0xCB (=l a) 0x0E])

  (opcode  RR (a)
    (R8)  [0xCB (+ 0b0001_1000 (R8 a))]
    (HL$) [0xCB 0x1E]
    (IX$) [0xDD 0xCB (=l a) 0x1E]
    (IY$) [0xFD 0xCB (=l a) 0x1E])

  (opcode  SLA (a)
    (R8)  [0xCB (+ 0b0010_0000 (R8 a))]
    (HL$) [0xCB 0x26]
    (IX$) [0xDD 0xCB (=l a) 0x26]
    (IY$) [0xFD 0xCB (=l a) 0x26])

  (opcode  SRA (a)
    (R8)  [0xCB (+ 0b0010_1000 (R8 a))]
    (HL$) [0xCB 0x2E]
    (IX$) [0xDD 0xCB (=l a) 0x2E]
    (IY$) [0xFD 0xCB (=l a) 0x2E])

  (opcode  SRL (a)
    (R8)  [0xCB (+ 0b0011_1000 (R8 a))]
    (HL$) [0xCB 0x3E]
    (IX$) [0xDD 0xCB (=l a) 0x3E]
    (IY$) [0xFD 0xCB (=l a) 0x3E])

  (opcode  RLD  () () [0xED 0x6F])
  (opcode  RRD  () () [0xED 0x67])

  (opcode  BIT (a b)
    (N R8)  [0xCB (=i a (+ 0b0100_0000 (R8 b)) 0x07 3)]
    (N HL$) [0xCB (=i a 0b0100_0110 0x07 3)]
    (N IX$) [0xDD 0xCB (=l b) (=i a 0b0100_0110 0x07 3)]
    (N IY$) [0xFD 0xCB (=l b) (=i a 0b0100_0110 0x07 3)])

  (opcode  SET (a b)
    (N R8)  [0xCB (=i a (+ 0b1100_0000 (R8 b)) 0x07 3)]
    (N HL$) [0xCB (=i a 0b1100_0110 0x07 3)]
    (N IX$) [0xDD 0xCB (=l b) (=i a 0b1100_0110 0x07 3)]
    (N IY$) [0xFD 0xCB (=l b) (=i a 0b1100_0110 0x07 3)])

  (opcode  RES (a b)
    (N R8)  [0xCB (=i a (+ 0b1000_0000 (R8 b)) 0x07 3)]
    (N HL$) [0xCB (=i a 0b1000_0110 0x07 3)]
    (N IX$) [0xDD 0xCB (=l b) (=i a 0b1000_0110 0x07 3)]
    (N IY$) [0xFD 0xCB (=l b) (=i a 0b1000_0110 0x07 3)])

  (opcode  JP (a)
    (NN)  [0xC3 (=l a) (=h a)]
    (HL$) [0xE9]
    (IX$) [0xDD (=i a 0xE9 0 0)]
    (IY$) [0xFD (=i a 0xE9 0 0)])
  (opcode  JP (a b) (CC NN) [(+ 0b1100_0010 (CC a 3)) (=l b) (=h b)])

  (opcode  JR (a) (NN) [0x18 (=rl a -2)])
  (opcode  JR (a b)
    (C?  NN) [0x38 (=rl b -2)]
    (NC? NN) [0x30 (=rl b -2)]
    (Z?  NN) [0x28 (=rl b -2)]
    (NZ? NN) [0x20 (=rl b -2)])

  (opcode  DJNZ (a) (NN) [0x10 (=rl a -2)])

  (opcode  CALL (a)   (NN)  [0xCD (=l a) (=h a)])
  (opcode  CALL (a b) (CC NN) [(+ 0b1100_0100 (CC a 3)) (=l b) (=h b)])

  (opcode  RET  ()  ()   [0xC9])
  (opcode  RET  (a) (CC) [(+ 0b1100_0000 (CC a 3))])
  (opcode  RETI ()  ()   [0xED 0x4D])
  (opcode  RETN ()  ()   [0xED 0x45])

  (opcode  RST  (a) (N)  [(=i a 0b1100_0111 0b0011_1000 0)])

  (opcode  #.jump (a)   (NN)    [0xC3 (=l a) (=h a)])
  (opcode  #.jump (a b) (NN CC) [(+ 0b1100_0010 (CC b 3)) (=l a) (=h a)])

  (opcode  #.call (a)   (NN)    [0xCD (=l a) (=h a)])
  (opcode  #.call (a b) (NN CC) [(+ 0b1100_0100 (CC b 3)) (=l a) (=h a)])

  (opcode  #.return ()  ()   [0xC9])
  (opcode  #.return (a) (CC) [(+ 0b1100_0000 (CC a 3))])

  (opcode  IN (a b)
    (A N$)   [0xDB (=l b)]
    (R8 C$)  [0xED (+ 0b0100_0000 (R8 a 3))])
  (opcode  INI  () () [0xED 0xA2])
  (opcode  INIR () () [0xED 0xB2])
  (opcode  IND  () () [0xED 0xAA])
  (opcode  INDR () () [0xED 0xBA])

  (opcode  OUT (a b)
    (N$ A)   [0xD3 (=l a)]
    (C$ R8)  [0xED (+ 0b0100_0001 (R8 b 3))])
  (opcode  OUTI () () [0xED 0xA3])
  (opcode  OTIR () () [0xED 0xB3])
  (opcode  OUTD () () [0xED 0xAB])
  (opcode  OTDR () () [0xED 0xBB])

  (opcode  DAA  () () [0x27])
  (opcode  CPL  () () [0x2F])
  (opcode  NEG  () () [0xED 0x44])
  (opcode  CCF  () () [0x3F])
  (opcode  SCF  () () [0x37])
  (opcode  NOP  () () [0x00])
  (opcode  HALT () () [0x76])
  (opcode  DI   () () [0xF3])
  (opcode  EI   () () [0xFB])

  (bytemap IM 0b0011 0 2 0x46 0x56 0x5E 0)
  (opcode  IM (a) (N) [0xED (=m a IM)])

  (operator <- (a b)
    (R8 _)  [(LD (= a) (= b))]
    (I _)   [(LD (= a) (= b))]
    (R _)   [(LD (= a) (= b))]
    (DD _)  [(LD (= a) (= b))]
    (IX _)  [(LD (= a) (= b))]
    (IY _)  [(LD (= a) (= b))]
    (BC BC) [(LD B B) (LD C C)]
    (BC DE) [(LD B D) (LD C E)]
    (BC HL) [(LD B H) (LD C L)]
    (DE BC) [(LD D B) (LD E C)]
    (DE DE) [(LD D D) (LD E E)]
    (DE HL) [(LD D H) (LD E L)]
    (HL BC) [(LD H B) (LD L C)]
    (HL DE) [(LD H D) (LD L E)]
    (HL HL) [(LD H H) (LD L L)]
    (DD PQ) [(#.LDP (= a) (= b))])
  (operator -> (a b)
    (R8 _)  [(LD (= b) (= a))]
    (I _)   [(LD (= b) (= a))]
    (R _)   [(LD (= b) (= a))]
    (DD _)  [(LD (= b) (= a))]
    (IX _)  [(LD (= b) (= a))]
    (IY _)  [(LD (= b) (= a))]
    (NN _)  [(LD (= b) (= a))]
    (BC BC) [(LD B B) (LD C C)]
    (BC DE) [(LD D B) (LD E C)]
    (BC HL) [(LD H B) (LD L C)]
    (DE BC) [(LD B D) (LD C E)]
    (DE DE) [(LD D D) (LD E E)]
    (DE HL) [(LD H D) (LD L E)]
    (HL BC) [(LD B H) (LD C L)]
    (HL DE) [(LD D H) (LD E L)]
    (HL HL) [(LD H H) (LD L L)]
    (DD PQ) [(#.LDP (= b) (= a))])
  (operator <-> (a b)
    (AF AF-) [(EX AF AF-)]
    (DE HL)  [(EX DE HL)]
    (HL DE)  [(EX DE HL)]
    (HL SP$) [(EX SP$ HL)]
    (SP$ HL) [(EX SP$ HL)])

  (operator -push (a) (_) [(PUSH (= a))])
  (operator -pop  (a) (_) [(POP (= a))])

  (operator ++ (a) (_) [(INC (= a))])
  (operator -- (a) (_) [(DEC (= a))])
  (operator -not (a) (A) [(CPL)])
  (operator -neg (a) (A) [(NEG)])

  (operator +  (a b) (_ _) [(ADD (= a) (= b))])
  (operator +$ (a b) (_ _) [(ADC (= a) (= b))])

  (operator - (a b)
    (HL _) [(OR A) (SBC HL (= b))]
    (A _)  [(SUB (= b))])
  (operator -$ (a b) (_ _) [(SBC (= a) (= b))])
  (operator -? (a b) (A _) [(CP (= b))])

  (operator &   (a b) (A _) [(AND (= b))])
  (operator "|" (a b) (A _) [(OR (= b))])
  (operator ^   (a b) (A _) [(XOR (= b))])

  (operator <* (a b)
    (A NN) [(#.REP (= b) `[(RLCA)])]
    (_ NN) [(#.REP (= b) `[(RLC (= a))])])
  (operator <*$ (a b)
    (A NN) [(#.REP (= b) `[(RLA)])]
    (_ NN) [(#.REP (= b) `[(RL (= a))])])
  (operator >* (a b)
    (A NN) [(#.REP (= b) `[(RRCA)])]
    (_ NN) [(#.REP (= b) `[(RRC (= a))])])
  (operator >*$ (a b)
    (A NN) [(#.REP (= b) `[(RRA)])]
    (_ NN) [(#.REP (= b) `[(RR (= a))])])

  (operator <<  (a b)
    (R8 NN) [(#.REP (= b) `[(SLA (= a))])]
    (BC NN) [(#.REP (= b) `[(SLA C) (RL B)])]
    (DE NN) [(#.REP (= b) `[(SLA E) (RL D)])]
    (HL NN) [(#.REP (= b) `[(ADD HL HL)])])
  (operator >>  (a b)
    (R8 NN) [(#.REP (= b) `[(SRA (= a))])]
    (BC NN) [(#.REP (= b) `[(SRA B) (RR C)])]
    (DE NN) [(#.REP (= b) `[(SRA D) (RR E)])]
    (HL NN) [(#.REP (= b) `[(SRA H) (RR L)])])
  (operator >>> (a b)
    (R8 NN) [(#.REP (= b) `[(SRL (= a))])]
    (BC NN) [(#.REP (= b) `[(SRL B) (RR C)])]
    (DE NN) [(#.REP (= b) `[(SRL D) (RR E)])]
    (HL NN) [(#.REP (= b) `[(SRL H) (RR L)])])

  (operator -set   (a b) (_ _) [(SET (= b) (= a))])
  (operator -reset (a b) (_ _) [(RES (= b) (= a))])
  (operator -bit?  (a b) (_ _) [(BIT (= b) (= a))])

  (operator -in (a b)
    (A C)  [(IN A C$)]
    (_ C)  [(IN (= a) C$)]
    (A NN) [(IN A (= b NN$))])
  (operator -out (a b)
    (A C)  [(OUT C$ A)]
    (_ C)  [(OUT C$ (= a))]
    (A NN) [(OUT (= b NN$) A)])

  (operator -zero? (a)
    (A)  [(AND (= a))]
    (DD) [(#.INVALID (= a))]
    (IX) [(#.INVALID (= a))]
    (IY) [(#.INVALID (= a))]
    (_)  [(INC (= a)) (DEC (= a))])

  (operator -jump (a) (NN) [(#.jump (= a))])

  (operator -jump-if (a b) (NN CC) [(#.jump (= a) (= b))])

  (operator -jump-unless (a b)
    (NN NZ?) [(#.jump (= a) Z? )]
    (NN Z?)  [(#.jump (= a) NZ?)]
    (NN NC?) [(#.jump (= a) C? )]
    (NN C?)  [(#.jump (= a) NC?)]
    (NN PO?) [(#.jump (= a) PE?)]
    (NN PE?) [(#.jump (= a) PO?)]
    (NN M?)  [(#.jump (= a) P? )]
    (NN P?)  [(#.jump (= a) M? )])

  (operator -return (a) (PC) [(#.return)])

  (operator -return-if (a b) (PC CC) [(#.return (= b))])

  (operator -return-unless (a b)
    (PC NZ?) [(#.return Z? )]
    (PC Z?)  [(#.return NZ?)]
    (PC NC?) [(#.return C? )]
    (PC C?)  [(#.return NC?)]
    (PC PO?) [(#.return PE?)]
    (PC PE?) [(#.return PO?)]
    (PC M?)  [(#.return P? )]
    (PC P?)  [(#.return M? )]))

(arch (z80 +undocumented)
  (operand IXH RegIXH "IXH" "IXH")
  (operand IXL RegIXL "IXL" "IXL")
  (operand IYH RegIYH "IYH" "IYH")
  (operand IYL RegIYL "IYL" "IYL")

  (registers IXH IXL IYH IYL)

  (map X8 A 7 B 0 C 1 D 2 E 3 IXH 4 IXL 5)
  (map Y8 A 7 B 0 C 1 D 2 E 3 IYH 4 IYL 5)
  (map A-E A 7 B 0 C 1 D 2 E 3)

  (opcode  LD (a b)
    (X8  IXH) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (IXH A-E) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (X8  IXL) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (IXL A-E) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (Y8  IYH) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (IYH A-E) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (Y8  IYL) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (IYL A-E) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]

    (IXH N)   [0xDD (+ 0b0000_0110 (X8 a 3)) (=l b)]
    (IXL N)   [0xDD (+ 0b0000_0110 (X8 a 3)) (=l b)]
    (IYH N)   [0xFD (+ 0b0000_0110 (Y8 a 3)) (=l b)]
    (IYL N)   [0xFD (+ 0b0000_0110 (Y8 a 3)) (=l b)])

  (opcode  ADD (a b)
    (A IXH)  [0xDD (+ 0b1000_0000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1000_0000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1000_0000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1000_0000 (Y8 b))])

  (opcode  ADC (a b)
    (A IXH)  [0xDD (+ 0b1000_1000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1000_1000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1000_1000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1000_1000 (Y8 b))])

  (opcode  SUB (a)
    (IXH)  [0xDD (+ 0b1001_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1001_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1001_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1001_0000 (Y8 a))])

  (opcode  SBC (a b)
    (A IXH)  [0xDD (+ 0b1001_1000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1001_1000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1001_1000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1001_1000 (Y8 b))])

  (opcode  AND (a)
    (IXH)  [0xDD (+ 0b1010_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1010_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1010_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1010_0000 (Y8 a))])

  (opcode  OR (a)
    (IXH)  [0xDD (+ 0b1011_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1011_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1011_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1011_0000 (Y8 a))])

  (opcode  XOR (a)
    (IXH)  [0xDD (+ 0b1010_1000 (X8 a))]
    (IXL)  [0xDD (+ 0b1010_1000 (X8 a))]
    (IYH)  [0xFD (+ 0b1010_1000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1010_1000 (Y8 a))])

  (opcode  CP (a)
    (IXH)  [0xDD (+ 0b1011_1000 (X8 a))]
    (IXL)  [0xDD (+ 0b1011_1000 (X8 a))]
    (IYH)  [0xFD (+ 0b1011_1000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1011_1000 (Y8 a))])

  (opcode  INC (a)
    (IXH)  [0xDD (+ 0b0000_0100 (X8 a 3))]
    (IXL)  [0xDD (+ 0b0000_0100 (X8 a 3))]
    (IYH)  [0xFD (+ 0b0000_0100 (Y8 a 3))]
    (IYL)  [0xFD (+ 0b0000_0100 (Y8 a 3))])

  (opcode  DEC (a)
    (IXH)  [0xDD (+ 0b0000_0101 (X8 a 3))]
    (IXL)  [0xDD (+ 0b0000_0101 (X8 a 3))]
    (IYH)  [0xFD (+ 0b0000_0101 (Y8 a 3))]
    (IYL)  [0xFD (+ 0b0000_0101 (Y8 a 3))])

  (opcode  RLC (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0000_0000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0000_0000 (R8 a))])

  (opcode  RL (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0001_0000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0001_0000 (R8 a))])

  (opcode  RRC (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0000_1000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0000_1000 (R8 a))])

  (opcode  RR (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0001_1000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0001_1000 (R8 a))])

  (opcode  SLA (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0010_0000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0010_0000 (R8 a))])

  (opcode SLL (a)
    (R8)  [0xCB (+ 0b0011_0000 (R8 a))]
    (HL$) [0xCB 0x36]
    (IX$) [0xDD 0xCB (=l a) 0x36]
    (IY$) [0xFD 0xCB (=l a) 0x36])

  (opcode SLL (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0011_0000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0011_0000 (R8 a))])

  (opcode  SRA (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0010_1000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0010_1000 (R8 a))])

  (opcode  SRL (a b)
    (R8 IX$) [0xDD 0xCB (=l b) (+ 0b0011_1000 (R8 a))]
    (R8 IY$) [0xFD 0xCB (=l b) (+ 0b0011_1000 (R8 a))])

  (opcode  BIT (a b c)
    (R8 N IX$) [0xDD 0xCB (=l c) (=i b (+ 0b0100_0000 (R8 a)) 0x07 3)]
    (R8 N IY$) [0xFD 0xCB (=l c) (=i b (+ 0b0100_0000 (R8 a)) 0x07 3)]
    (N IX$ R8) [0xDD 0xCB (=l b) (=i a (+ 0b0100_0000 (R8 c)) 0x07 3)]
    (N IY$ R8) [0xFD 0xCB (=l b) (=i a (+ 0b0100_0000 (R8 c)) 0x07 3)])

  (opcode  SET (a b c)
    (R8 N IX$) [0xDD 0xCB (=l c) (=i b (+ 0b1100_0000 (R8 a)) 0x07 3)]
    (R8 N IY$) [0xFD 0xCB (=l c) (=i b (+ 0b1100_0000 (R8 a)) 0x07 3)]
    (N IX$ R8) [0xDD 0xCB (=l b) (=i a (+ 0b1100_0000 (R8 c)) 0x07 3)]
    (N IY$ R8) [0xFD 0xCB (=l b) (=i a (+ 0b1100_0000 (R8 c)) 0x07 3)])

  (opcode  RES (a b c)
    (R8 N IX$) [0xDD 0xCB (=l c) (=i b (+ 0b1000_0000 (R8 a)) 0x07 3)]
    (R8 N IY$) [0xFD 0xCB (=l c) (=i b (+ 0b1000_0000 (R8 a)) 0x07 3)]
    (N IX$ R8) [0xDD 0xCB (=l b) (=i a (+ 0b1000_0000 (R8 c)) 0x07 3)]
    (N IY$ R8) [0xFD 0xCB (=l b) (=i a (+ 0b1000_0000 (R8 c)) 0x07 3)])

  (opcode  IN (a)   (C$)    [0xED 0x70])

  (opcode  IN (a b) (F  C$) [0xED 0x70])

  (opcode  OUT (a b) (C$ N)  [0xED (=i b 0x71 0 0)])

  (operator <- (a b)
    (IXH _)  [(LD (= a) (= b))]
    (IXL _)  [(LD (= a) (= b))]
    (IYH _)  [(LD (= a) (= b))]
    (IYL _)  [(LD (= a) (= b))])
  (operator -> (a b)
    (IXH _)  [(LD (= b) (= a))]
    (IXL _)  [(LD (= b) (= a))]
    (IYH _)  [(LD (= b) (= a))]
    (IYL _)  [(LD (= b) (= a))])

  (operator <<< (a b) (_ NN) [(#.REP (= b) `[(SLL (= a))])]))

(arch (z80 +compat8080)

  (opcode  LD (a b)
    (R8 IX$) [(=U)]
    (R8 IY$) [(=U)]
    (IX$ R8) [(=U)]
    (IY$ R8) [(=U)]
    (IX$ N)  [(=U)]
    (IY$ N)  [(=U)]
    (A I)    [(=U)]
    (A R)    [(=U)]
    (I A)    [(=U)]
    (R A)    [(=U)]
    (IX NN)  [(=U)]
    (IY NN)  [(=U)]
    (DD NN$) [(=U)]
    (IX NN$) [(=U)]
    (IY NN$) [(=U)]
    (NN$ DD) [(=U)]
    (NN$ IX) [(=U)]
    (NN$ IY) [(=U)]
    (SP IX)  [(=U)]
    (SP IY)  [(=U)])

  (opcode  PUSH (a)
    (IX) [(=U)]
    (IY) [(=U)])

  (opcode  POP (a)
    (IX) [(=U)]
    (IY) [(=U)])

  (opcode  EX (a b)
    (AF  AF-) [(=U)]
    (SP$ IX)  [(=U)]
    (SP$ IY)  [(=U)])
  (opcode  EXX  () () [(=U)])

  (opcode  LDI  () () [(=U)])
  (opcode  LDIR () () [(=U)])
  (opcode  LDD  () () [(=U)])
  (opcode  LDDR () () [(=U)])

  (opcode  CPI  () () [(=U)])
  (opcode  CPIR () () [(=U)])
  (opcode  CPD  () () [(=U)])
  (opcode  CPDR () () [(=U)])

  (opcode  ADD (a b)
    (A IX$) [(=U)]
    (A IY$) [(=U)]
    (IX PP) [(=U)]
    (IY RR) [(=U)])

  (opcode  ADC (a b)
    (A IX$) [(=U)]
    (A IY$) [(=U)]
    (HL DD) [(=U)])

  (opcode  SUB (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  SBC (a b)
    (A IX$) [(=U)]
    (A IY$) [(=U)]
    (HL DD) [(=U)])

  (opcode  AND (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  OR (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  XOR (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  CP (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  INC (a)
    (IX$) [(=U)]
    (IY$) [(=U)]
    (IX)  [(=U)]
    (IY)  [(=U)])

  (opcode  DEC (a)
    (IX$) [(=U)]
    (IY$) [(=U)]
    (IX)  [(=U)]
    (IY)  [(=U)])

  (opcode  RLC (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  RL (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  RRC (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  RR (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  SLA (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  SRA (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  SRL (a)
    (R8)  [(=U)]
    (HL$) [(=U)]
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  RLD  () () [(=U)])
  (opcode  RRD  () () [(=U)])

  (opcode  BIT (a b)
    (N R8)  [(=U)]
    (N HL$) [(=U)]
    (N IX$) [(=U)]
    (N IY$) [(=U)])

  (opcode  SET (a b)
    (N R8)  [(=U)]
    (N HL$) [(=U)]
    (N IX$) [(=U)]
    (N IY$) [(=U)])

  (opcode  RES (a b)
    (N R8)  [(=U)]
    (N HL$) [(=U)]
    (N IX$) [(=U)]
    (N IY$) [(=U)])

  (opcode  JP (a)
    (IX$) [(=U)]
    (IY$) [(=U)])

  (opcode  JR (a) (NN) [(=U)])
  (opcode  JR (a b)
    (C?  NN) [(=U)]
    (NC? NN) [(=U)]
    (Z?  NN) [(=U)]
    (NZ? NN) [(=U)])

  (opcode  DJNZ (a) (NN) [(=U)])

  (opcode  RETI ()  ()   [(=U)])
  (opcode  RETN ()  ()   [(=U)])

  (opcode  IN (a b) (R8 C$)  [(=U)])
  (opcode  INI  () () [(=U)])
  (opcode  INIR () () [(=U)])
  (opcode  IND  () () [(=U)])
  (opcode  INDR () () [(=U)])

  (opcode  OUT (a b) (C$ R8)  [(=U)])
  (opcode  OUTI () () [(=U)])
  (opcode  OTIR () () [(=U)])
  (opcode  OUTD () () [(=U)])
  (opcode  OTDR () () [(=U)])

  (opcode  NEG  () () [(=U)])

  (opcode  IM (a) (N) [(=U)]))

(arch (z80 +r800)
  (operand IXH RegIXH "IXH" "IXH")
  (operand IXL RegIXL "IXL" "IXL")
  (operand IYH RegIYH "IYH" "IYH")
  (operand IYL RegIYL "IYL" "IYL")

  (registers IXH IXL IYH IYL)

  (map X8 A 7 B 0 C 1 D 2 E 3 IXH 4 IXL 5)
  (map Y8 A 7 B 0 C 1 D 2 E 3 IYH 4 IYL 5)
  (map A-E A 7 B 0 C 1 D 2 E 3)

  (opcode  LD (a b)
    (X8  IXH) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (IXH A-E) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (X8  IXL) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (IXL A-E) [0xDD (+ 0b0100_0000 (X8 a 3) (X8 b))]
    (Y8  IYH) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (IYH A-E) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (Y8  IYL) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]
    (IYL A-E) [0xFD (+ 0b0100_0000 (Y8 a 3) (Y8 b))]

    (IXH N)   [0xDD (+ 0b0000_0110 (X8 a 3)) (=l b)]
    (IXL N)   [0xDD (+ 0b0000_0110 (X8 a 3)) (=l b)]
    (IYH N)   [0xFD (+ 0b0000_0110 (Y8 a 3)) (=l b)]
    (IYL N)   [0xFD (+ 0b0000_0110 (Y8 a 3)) (=l b)])

  (opcode  ADD (a b)
    (A IXH)  [0xDD (+ 0b1000_0000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1000_0000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1000_0000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1000_0000 (Y8 b))])

  (opcode  ADC (a b)
    (A IXH)  [0xDD (+ 0b1000_1000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1000_1000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1000_1000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1000_1000 (Y8 b))])

  (opcode  SUB (a)
    (IXH)  [0xDD (+ 0b1001_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1001_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1001_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1001_0000 (Y8 a))])

  (opcode  SBC (a b)
    (A IXH)  [0xDD (+ 0b1001_1000 (X8 b))]
    (A IXL)  [0xDD (+ 0b1001_1000 (X8 b))]
    (A IYH)  [0xFD (+ 0b1001_1000 (Y8 b))]
    (A IYL)  [0xFD (+ 0b1001_1000 (Y8 b))])

  (opcode  AND (a)
    (IXH)  [0xDD (+ 0b1010_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1010_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1010_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1010_0000 (Y8 a))])

  (opcode  OR (a)
    (IXH)  [0xDD (+ 0b1011_0000 (X8 a))]
    (IXL)  [0xDD (+ 0b1011_0000 (X8 a))]
    (IYH)  [0xFD (+ 0b1011_0000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1011_0000 (Y8 a))])

  (opcode  XOR (a)
    (IXH)  [0xDD (+ 0b1010_1000 (X8 a))]
    (IXL)  [0xDD (+ 0b1010_1000 (X8 a))]
    (IYH)  [0xFD (+ 0b1010_1000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1010_1000 (Y8 a))])

  (opcode  CP (a)
    (IXH)  [0xDD (+ 0b1011_1000 (X8 a))]
    (IXL)  [0xDD (+ 0b1011_1000 (X8 a))]
    (IYH)  [0xFD (+ 0b1011_1000 (Y8 a))]
    (IYL)  [0xFD (+ 0b1011_1000 (Y8 a))])

  (opcode  INC (a)
    (IXH)  [0xDD (+ 0b0000_0100 (X8 a 3))]
    (IXL)  [0xDD (+ 0b0000_0100 (X8 a 3))]
    (IYH)  [0xFD (+ 0b0000_0100 (Y8 a 3))]
    (IYL)  [0xFD (+ 0b0000_0100 (Y8 a 3))])

  (opcode  DEC (a)
    (IXH)  [0xDD (+ 0b0000_0101 (X8 a 3))]
    (IXL)  [0xDD (+ 0b0000_0101 (X8 a 3))]
    (IYH)  [0xFD (+ 0b0000_0101 (Y8 a 3))]
    (IYL)  [0xFD (+ 0b0000_0101 (Y8 a 3))])

  (opcode  IN (a b) (F  C$) [0xED 0x70])

  (opcode  MULUB (a b)
    (A B) [0xED 0xC1]
    (A C) [0xED 0xC9]
    (A D) [0xED 0xD1]
    (A E) [0xED 0xD9])

  (opcode  MULUW (a b)
    (HL BC) [0xED 0xC3]
    (HL SP) [0xED 0xF3])

  (operator <- (a b)
    (IXH _)  [(LD (= a) (= b))]
    (IXL _)  [(LD (= a) (= b))]
    (IYH _)  [(LD (= a) (= b))]
    (IYL _)  [(LD (= a) (= b))])
  (operator -> (a b)
    (IXH _)  [(LD (= b) (= a))]
    (IXL _)  [(LD (= b) (= a))]
    (IYH _)  [(LD (= b) (= a))]
    (IYL _)  [(LD (= b) (= a))]))
```
