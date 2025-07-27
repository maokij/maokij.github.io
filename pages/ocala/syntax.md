---
title: Ocala Syntax
---
```
program
  : stmt? ( ';' stmt? )*

stmt
  : MACRO identifierp '('
      ( identifier
      | label ':' dataexpr
      )* REST? ')'
          ( '[' ( identifier ( '=' symexpr )? )* ']'
          )? block
  | PROC identifierp '(' sig ')' ( block | '@' dataexpr )
  | CONST
      ( identifier
      | identifierp '(' ( identifier | label ':' dataexpr )* ')'
      ) '=' dataexpr
  | DATA datatype ( '=' datatype )? databody
  | MODULE identifier block
  | label ':'
  | struct
  | expr

struct
  : STRUCT identifier? '{' structfield? ( ';' structfield? )* '}'

structfield
  : identifier datatype

datatype
  : '[' ( constexpr )? ']' datatype
  | identifier
  | struct

databody
  : ( datalist
    | constval
    )? ( BOP dataval
       )? ( ':' identifier
          | '@' dataexpr
          )?

datalist
  : '[' ( dataexpr | datalist )* ']'
  | '{' ( dataexpr | datalist )* '}'

dataexpr
  : constexpr
  | explicitval

dataval
  : constval
  | explicitval

symexpr
  : '%{' symval ( symval )* '}'

symval
  : IDENTIFIER
  | STRING

sig
  : ( '-*' )? regs ( '=>' regs )? ( '!' regs )?

regs
  : ( REG )*

block
  : '{' program '}'
  | '={' program '}'

expr
  : identifier ( oper )*
  | callproc
  | contextexpr

callproc
  : CONDDOT? identifierp '(' sig ')'

contextexpr
  : ( regld
    | mem
    | explicitval
    | '@-' prim
    ) ( CONDDOT? ( UOP | BOP oper | DOP dotarg )
      )*

oper
  : prim ( ':' prim )?

prim
  : COND
  | regld
  | mem
  | dataval
  | block

regld
  : REG ( '-@' prim )?

mem
  : '[' ( contextexpr | constexpr )* ']'

dotarg
  : callproc
  | regld
  | block

explicitval
  : '$-' constval
  | '$$-' constval

constexpr
  : iexpr

constval
  : ival

iexpr
  : ival ( BOP ival )*

ival
  : INTEGER
  | STRING
  | RESERVED
  | IDENTIFIER ( '.-' IDENTIFIER ( '.-' IDENTIFIER )* )?
  | IDENTIFIERP '(' ( iexpr )* ')'
  | '(' iexpr ')'
  | AOP ival

identifier
  : IDENTIFIER

identifierp
  : IDENTIFIERP

label
  : LABEL

```
