---
title: Ocala Syntax
---
```
program
  : statement? ( ';' statement? )*

statement
  : MACRO identifierp '('
      ( identifier
      | label_name data_expression
      )* REST? ')'
          ( '[' ( identifier ( '=' symbol_expression )? )* ']'
          )? block
  | PROC identifierp '(' signature ')' ( block | '@' data_expression )
  | CONST
      ( identifier
      | identifierp '(' ( identifier | label_name data_expression )* ')'
      ) '=' data_expression
  | DATA data_type ( '=' data_type )? data_body
  | MODULE identifier block
  | LABEL label_name
  | struct
  | identifier ( operand )*
  | proc_call
  | context_expression

struct
  : STRUCT identifier? '{' struct_field? ( ';' struct_field? )* '}'

struct_field
  : identifier data_type

data_type
  : '[' ( constexpr )? ']' data_type
  | identifier
  | struct

data_body
  : ( data_list
    | constval
    )? ( BINARY_OPERATOR data_value
       )? ( ':' identifier
          | '@' data_expression
          )?

data_list
  : '[' ( data_expression | data_list )* ']'
  | '{' ( data_expression | data_list )* '}'

data_expression
  : constexpr
  | explicit_value

data_value
  : constval
  | explicit_value

symbol_expression
  : '%{' symbol_expression_value ( symbol_expression_value )* '}'

symbol_expression_value
  : IDENTIFIER
  | STRING

signature
  : ( '-*' )? registers? ( '=>' registers? )? ( '!' registers? )?

registers
  : REGISTER ( REGISTER )*

block
  : ( '{' | '={' ) statement? ( ';' statement? )* '}'

proc_call
  : CONDDOT? identifierp '(' signature ')'

context_expression
  : ( decorated_register
    | memory_access
    | explicit_value
    | '@-' primitive
    ) ( POSTFIX_OPERATOR
      | BINARY_OPERATOR operand
      | DOT_OPERATOR dot_operand
      )*

operand
  : primitive ( ':' primitive )?

primitive
  : CONDITION
  | decorated_register
  | memory_access
  | data_value
  | block

decorated_register
  : REGISTER ( '-@' primitive )?

memory_access
  : '[' ( context_expression | constexpr )* ']'

dot_operand
  : proc_call
  | decorated_register
  | block

explicit_value
  : '$@' constval
  | '$$@' constval

constexpr
  : iexpr

constval
  : ival

iexpr
  : ival ( BINARY_OPERATOR ival )*

ival
  : INTEGER
  | STRING
  | RESERVED
  | IDENTIFIER ( '.-' IDENTIFIER ( '.-' IDENTIFIER )* )?
  | IDENTIFIERP '(' ( iexpr )* ')'
  | '(' iexpr ')'
  | PREFIX_OPERATOR ival

identifier
  : IDENTIFIER

identifierp
  : IDENTIFIERP

label_name
  : LABEL_NAME

```
