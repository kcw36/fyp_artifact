import {Order} from 'blockly/python';

// Export all the code generators for custom blocks
export const forBlock = Object.create(null);

/*
Strings
*/

forBlock['python_string'] = function (block) {
  const stringCode = block.getFieldValue('VALUE');
  return [`'${stringCode}'`, Order.COLLECTION];
}

forBlock['python_stringSpeech'] = function (block) {
  const stringCode = block.getFieldValue('VALUE');
  return [`"${stringCode}"`, Order.COLLECTION];
}

forBlock['python_stringMulti'] = function (block) {
  const stringCode = block.getFieldValue('VALUE');
  return [`${stringCode}`, Order.COLLECTION];
}

// string concatenation block
forBlock['py_concat'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // concatenate the code
  const code = `${value1} + ${value2}`;

  // return the code
  return [code, Order.COLLECTION];
}

// string multiplication block
forBlock['py_stringMultiply'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // concatenate the code
  const code = `${value1} * ${value2}`;

  // return the code
  return [code, Order.COLLECTION];
}

// string upper block
forBlock['pyUpper'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);

  // concatenate the code
  const code = `${value1}.upper()`;

  // return the code
  return [code, Order.COLLECTION];
}

// string lower block
forBlock['pyLower'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);

  // concatenate the code
  const code = `${value1}.lower()`;

  // return the code
  return [code, Order.COLLECTION];
}

// string title block
forBlock['pyTitle'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);

  // concatenate the code
  const code = `${value1}.title()`;

  // return the code
  return [code, Order.COLLECTION];
}

// string capitalize block
forBlock['pyCapitalize'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);

  // concatenate the code
  const code = `${value1}.capitalize()`;

  // return the code
  return [code, Order.COLLECTION];
}

// string capitalize block
forBlock['pyJoin'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // concatenate the code
  const code = `${value1}.join(${value2})`;

  // return the code
  return [code, Order.COLLECTION];
}

// string capitalize block
forBlock['pySplit'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.COLLECTION);
  var value2 = ''
  if (block.getField('field_sep')) {
    value2 = block.getFieldValue('field_sep');
  }

  // concatenate the code
  const code = `${value1}.split(${value2})`;

  // return the code
  return [code, Order.COLLECTION];
}

/*
Number
*/

// int block
forBlock['python_int'] = function (block) {
  const mathCode = block.getFieldValue('VALUE');
  return [mathCode, Order.ATOMIC]
}

// float regular
forBlock['python_float'] = function (block) {
  const mathCode = block.getFieldValue('VALUE');
  return [mathCode, Order.ATOMIC]
}

// float scientific
forBlock['python_scientific'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  const code = `${value1}e${value2}`
  return [code, Order.ATOMIC]
}

// complex plus
forBlock['python_complexPlus'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.ADDITIVE);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.ADDITIVE);
  
  const code = `${value1}+${value2}j`
  return [code, Order.ATOMIC]
}

// complex minus
forBlock['python_complexMinus'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);
  
  const code = `${value1}-${value2}j`
  return [code, Order.ATOMIC]
}

// basic operators block
forBlock['py_operator'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // get field value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // get operator type
  const operatorValue = block.getFieldValue("OPERATOR");

  // concatenate the code
  const code = `${value1} ${operatorValue} ${value2}`;

  // return the code
  return [code, Order.ADDITIVE];
}

// iterator statement
forBlock['python_increment'] = function (block, generator) {
  // get variable and increment
  const variable = generator.valueToCode(block, 'VARIABLE', Order.NONE);
  const increment = generator.valueToCode(block, 'INCREMENT', Order.NONE);

  // get operator value
  const operator = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${variable} ${operator} ${increment}\n`;

  // return the code
  return code;
}

forBlock['pow_func'] = function (block, generator) {

  // grab object value
  const xCode = generator.valueToCode(block, 'INPUT_X', Order.NONE);
  const yCode = generator.valueToCode(block, 'INPUT_Y', Order.NONE);
  // concatenate string
  var code = `pow(${xCode}, ${yCode})`;

  // grab the base param value if it is there
  if (block.getInput('MODULUS')) {
    const modCode = generator.valueToCode(block, 'MODULUS', Order.ADDITIVE);
    code = `pow(${xCode}, ${yCode}, ${modCode})`;
  };

  // return code
  return [code, Order.COLLECTION];
}

/*
Boolean
*/

// relational expressions
forBlock['python_relational'] = function (block, generator) {
  // get input values
  const value1 = generator.valueToCode(block, 'VALUE1', Order.ADDITIVE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.ADDITIVE);

  // get field value
  const field = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${value1} ${field} ${value2}`;

  // return the code
  return [code, Order.CONDITIONAL];
}

// logical expressions
forBlock['python_logical'] = function (block, generator) {
  // get input values
  const value1 = generator.valueToCode(block, 'VALUE1', Order.ADDITIVE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.ADDITIVE);

  // get field value
  const field = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${value1} ${field} ${value2}`;

  // return the code
  return [code, Order.CONDITIONAL];
}

// is expressions
forBlock['python_is'] = function (block, generator) {
  // get input value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.CONDITIONAL);

  // get input value 2
  const value2 = generator.valueToCode(block, 'VALUE2', Order.CONDITIONAL);

  // get field value
  const field = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${value1} ${field} ${value2}`;

  // return the code 
  return [code, Order.CONDITIONAL];
}

// not expressions
forBlock['python_not'] = function (block, generator) {
  // get input value
  const value = generator.valueToCode(block, 'VALUE1', Order.CONDITIONAL);

  // concatenate the string
  const code = `not ${value}`;

  // return the code 
  return [code, Order.CONDITIONAL];
}

// bitwise expressions
forBlock['python_bitwise'] = function (block, generator) {
  // get input values
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // get field value
  const field = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${value1} ${field} ${value2}`;

  // return the code
  return [code, Order.NONE];
}

// true or false expression
forBlock['python_boolean'] = function (block, generator) {
    // get boolean value
    const boolVal = block.getFieldValue('FIELD');
  
    // return code
    return [boolVal, Order.ATOMIC];
}

/*
Collections
*/

forBlock['python_all'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'input_set', Order.NONE);

  // concatenate string
  const code = `all(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['python_any'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'input_set', Order.NONE);

  // concatenate string
  const code = `any(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['enum_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `enumerate(${valueCode})`;

  // grab the base param value if it is there
  if (block.getInput('start_field')) {
    const baseCode = generator.valueToCode(block, 'start_field', Order.NONE);
    code = `enumerate(${valueCode}, start=${baseCode})`;
  };

  // return code
  return [code, Order.COLLECTION];
};

// frozenset func
forBlock['frozen_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `frozenset(${valueCode})`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['python_len'] = function (block, generator) {

  // grab object value
  const objectCode = generator.valueToCode(block, 'Object', Order.NONE);

  // concatenate string
  const code = `len(${objectCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['max_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);

  // concatenate string
  const code = `max(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['min_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);

  // concatenate string
  const code = `min(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['sorted_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `${valueCode}`;

  // grab the base param value if it is there
  if (block.getField('field_key')) {
    const keyCode = block.getFieldValue('field_key');
    code = `${code}, key=${keyCode}`;
  };

  // grab the base param value if it is there
  if (block.getField('field_reverse')) {
    const reverseCode = block.getFieldValue('field_reverse');
    code = `${code}, reverse=${reverseCode}`;
  };

  code = `sorted(${code})`;

  // return code
  return [code, Order.COLLECTION];
};

// list 
forBlock['python_list'] = function (block, generator) {
  let n = 0;
  let i ='0';
  let code = '';
  do {
      if (block.getInput(i)) {
        const conditionCode =
          generator.valueToCode(block, i, Order.NONE) || 'None';
      if (n > 0) {
        code = code + ', ' + conditionCode;
      } else {
        code = conditionCode;
      }
      n++;
      i = String(n);
    }
  } while (block.getInput(i));
  return [`[${code}]`, Order.COLLECTION];
}

// tuple
forBlock['python_tuple'] = function (block, generator) {
  let n = 0;
  let i ='0';
  let code = '';
  do {
    if (block.getInput(i)) {
      const conditionCode =
        generator.valueToCode(block, i, Order.NONE) || 'None';
      if (n > 1) {
        code = code + ', ' + conditionCode;
      } else if ( n == 1 ) {
        code = code + ' ' + conditionCode;
      } else {
        code = conditionCode + ',';
      }
      n++;
      i = String(n);
    }
  } while (block.getInput(i));
  return [`(${code})`, Order.COLLECTION];
};

// set
forBlock['python_set'] = function (block, generator) {
  let n = 0;
  let i ='0';
  let code = '';
  do {
    if (block.getInput(i)) {
      const conditionCode =
        generator.valueToCode(block, i, Order.NONE) || 'None';
      if (n >= 1) {
        code = code + ', ' + conditionCode;
      } else if ( n == 1 ) {
        code = code + ', ' + conditionCode;
      } else {
        code = conditionCode;
      }
      n++;
      i = String(n);
    }
  } while (block.getInput(i));
  return [`{${code}}`, Order.COLLECTION];
};

// dictionary
forBlock['python_dictionary'] = function (block, generator) {
  let n = 1;
  let i ='1';
  let code = '';
  let newline = '';
  do {
    if (block.getInput('value_' + i)) {
      const fieldCode =
        block.getFieldValue("field_" + i) || 'None'
      const conditionCode =
          generator.valueToCode(block, "value_" + i, Order.NONE) || 'None';
      if (n > 1) {
        code = code + ', ' + fieldCode + ': ' + conditionCode;
      } else if (n == 1) {
        code = fieldCode + ': ' + conditionCode;
      }
      n++;
      i = String(n);
    }
  } while (block.getInput('value_' + i));
  return [`{${code}${newline}}`, Order.COLLECTION]
};

forBlock['pyConcatLists'] = function (block, generator) {

  // grab object value
  const valueCode1 = generator.valueToCode(block, 'INPUT1', Order.NONE);
  const valueCode2 = generator.valueToCode(block, 'INPUT2', Order.NONE);

  // concatenate string
  var code = `${valueCode1} + ${valueCode2}`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['pyReplicationLists'] = function (block, generator) {

  // grab object value
  const valueCode1 = generator.valueToCode(block, 'INPUT', Order.NONE);
  const valueCode2 = generator.valueToCode(block, 'INT', Order.NONE);
  
  // concatenate string
  var code = `${valueCode1} * ${valueCode2}`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['pyMembershipLists'] = function (block, generator) {

  // grab object value
  const valueCode1 = generator.valueToCode(block, 'VALUE1', Order.NONE);
  const valueCode2 = generator.valueToCode(block, 'VALUE2', Order.NONE);
  const fieldCode = block.getFieldValue('OPERATOR')
  
  // concatenate string
  var code = `${valueCode1} ${fieldCode} ${valueCode2}`;

  // return code
  return [code, Order.COLLECTION];
};

// relational expressions for collections
forBlock['pyRelationalLists'] = function (block, generator) {
  // get input values
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // get field value
  const field = block.getFieldValue("OPERATOR");

  // concatenate the string
  const code = `${value1} ${field} ${value2}`;

  // return the code
  return [code, Order.CONDITIONAL];
}

// dictionary keys block
forBlock['pyKeys'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // concatenate the code
  const code = `${value1}.keys()`;

  // return the code
  return [code, Order.COLLECTION];
}

// dictionary values block
forBlock['pyValues'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // concatenate the code
  const code = `${value1}.values()`;

  // return the code
  return [code, Order.COLLECTION];
}

// dictionary items block
forBlock['pyItems'] = function (block, generator) {
  // get field value 1
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);

  // concatenate the code
  const code = `${value1}.items()`;

  // return the code
  return [code, Order.COLLECTION];
}

// dictionary append block
forBlock['pyAppend'] = function (block, generator) {
  // get input value 1 and 2
  const value1 = generator.valueToCode(block, 'VALUE1', Order.NONE);
  const value2 = generator.valueToCode(block, 'VALUE2', Order.NONE);

  // concatenate the code
  const code = `${value1}.append(${value2})\n`;

  // return the code
  return code;
}

/*
Input / Output
*/

forBlock['input_func'] = function () {

  return ['input()', Order.NONE]
}

forBlock['chr_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `chr(${valueCode})`;

  // return code
  return [code, Order.COLLECTION];
};

// sk has not yet implemented eval 
forBlock['eval_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `eval(${valueCode})`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['pyStrFunc'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `str(${valueCode})`;

  // return code
  return [code, Order.ADDITIVE];
};

forBlock['int_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `int(${valueCode})`;

  // grab the base param value if it is there
  if (block.getInput('base_field')) {
    const baseCode = generator.valueToCode(block, 'base_field', Order.NONE);
    code = `int(${valueCode}, ${baseCode})`;
  };

  // return code
  return [code, Order.ADDITIVE];
};

forBlock['float_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `float(${valueCode})`;

  // return code
  return [code, Order.ADDITIVE];
};

forBlock['complex_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'REAL', Order.NONE);
  // concatenate string
  var code = `complex(${valueCode})`;

  // grab the base param value if it is there
  if (block.getInput('IMAGINARY')) {
    const imCode = generator.valueToCode(block, 'IMAGINARY', Order.NONE);
    code = `complex(${valueCode}, ${imCode})`;
  };

  // return code
  return [code, Order.ADDITIVE];
};

// dictionary conversion block
forBlock['pyDictFunc'] = function (block, generator) {
  let n = 1;
  let i ='1';
  let code = '';
  let newline = '';
  do {
    if (block.getInput('value_' + i)) {
      const fieldCode =
        block.getFieldValue("field_" + i) || 'None'
      const conditionCode =
          generator.valueToCode(block, "value_" + i, Order.NONE) || 'None';
      if (n > 1) {
        code = code + ', ' + fieldCode + ' = ' + conditionCode;
      } else if (n == 1) {
        code = fieldCode + ': ' + conditionCode;
      }
      n++;
      i = String(n);
    }
  } while (block.getInput('value_' + i));
  return [`dict(${code}${newline})`, Order.COLLECTION]
};

forBlock['list_func'] = function (block, generator) {

  // grab object value
  var objectCode = "";
  // get assignment value
  if (block.getInput('0')) {
    objectCode = generator.valueToCode(block, '0', Order.NONE);
  };

  // concatenate string
  const code = `list(${objectCode})`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['set_func'] = function (block, generator) {

  // grab object value
  var objectCode = "";
  // get assignment value
  if (block.getInput('0')) {
    objectCode = generator.valueToCode(block, '0', Order.NONE);
  };

  // concatenate string
  const code = `set(${objectCode})`;

  // return code
  return [code, Order.COLLECTION];
};

// FULL PRINT STATEMENT
forBlock['python_print'] = function (block, generator) {

  // initiate couter variables
  let n = 0;
  let i ='0';
  let optionCode = 'test';

  // initiate the optional arg code holders
  let endCode = null;
  let sepCode = null;
  let flushCode = null;
  let fileCode = null;

  do {
    const objectValue = generator.valueToCode(block, "field_" + i, Order.NONE);
    if (n >= 1) {
      optionCode = optionCode + ", " + objectValue;
    } else if ( n == 0 ) {
      optionCode = objectValue;
    };
    n++;
    i = String(n);
  } while (block.getInput('field_' + i));
  
  // fill the optional arg codes if present in the block
  if (block.getFieldValue("field_sep")) {
    sepCode = "sep=" + block.getFieldValue("field_sep");
    optionCode = optionCode + ", " + sepCode;
  };

  if (block.getFieldValue("field_end")) {
    endCode = "end=" + block.getFieldValue("field_end");
    optionCode = optionCode + ", " + endCode;
  };
  
  if (block.getFieldValue("field_flush")) {
    flushCode = "flush=" + block.getFieldValue("field_flush");
    optionCode = optionCode + ", " + flushCode;
  };

  if (block.getFieldValue("field_file")) {
    fileCode = "file=" + block.getFieldValue("field_file");
    optionCode = optionCode + ", " + fileCode;
  };

  // concat string
  const code = `print(${optionCode})\n`;

  return code;
}

forBlock['type_func'] = function (block, generator) {
  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `type(${valueCode})`;

  // return code
  return [code, Order.NONE];
}

forBlock['sum_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);
  // concatenate string
  var code = `sum(${valueCode})`;

  // grab the base param value if it is there
  if (block.getInput('start_field')) {
    const baseCode = generator.valueToCode(block, 'start_field', Order.NONE);
    code = `sum(${valueCode}, start=${baseCode})`;
  };

  // return code
  return [code, Order.ADDITIVE];
};

/*
Variables
*/

// simple variable
forBlock['var_set'] = function (block, generator) {
  // get variable
  const variable = generator.getVariableName(block.getFieldValue('FIELDNAME'));

  // get assignment value
  const innerCode = generator.valueToCode(block, 'VALUE', Order.NONE);

  // concat the string
  const code = `${variable} = ${innerCode}\n`;

  return code;
};

// variable for inputs
forBlock['var_get'] = function (block, generator) {
  // get variable
  const variable = generator.getVariableName(block.getFieldValue('FIELDNAME'));

  // return code
  return [variable, Order.ATOMIC];
};

// variable for inputs
forBlock['var_get_param'] = function (block, generator) {
  // get variable
  const variable = generator.getVariableName(block.getFieldValue('FIELDNAME'));

  // return code
  return [variable, Order.ATOMIC];
};

/*
Logic
*/

forBlock['python_if'] = function (block, generator) {
  // get condition
  const condition = generator.valueToCode(block, 'CONDITION', Order.NONE);

  // get execution
  const execution = generator.statementToCode(block, 'EXECUTE');

  // concatenate string
  const code = `if ${condition}:\n${execution}`;

  // return code
  return code;
};

forBlock['python_else'] = function (block, generator) {
  // get execution
  const execution = generator.statementToCode(block, 'EXECUTE');

  // concatenate string
  const code = `else:\n${execution}`;

  // return code
  return code;
};

forBlock['python_elif'] = function (block, generator) {
  // get condition
  const condition = generator.valueToCode(block, 'CONDITION', Order.NONE);

  // get execution
  const execution = generator.statementToCode(block, 'EXECUTE');

  // concatenate string
  const code = `elif ${condition}:\n${execution}`;

  // return code
  return code;
};

forBlock['python_while'] = function (block, generator) {
  // get variable
  const variable = generator.valueToCode(block, 'VARIABLE', Order.NONE);

  // get execution
  const execution = generator.statementToCode(block, 'EXECUTE');

  // concatenate string
  const code = `while ${variable}:\n${execution}`;

  // return code
  return code;
};

forBlock['python_for'] = function (block, generator) {
  // get variable and array
  const variable = generator.valueToCode(block, 'VARIABLE', Order.NONE);
  const array = generator.valueToCode(block, 'ARRAY', Order.NONE);

  // get execution
  const execution = generator.statementToCode(block, 'EXECUTE');

  // concatenate string
  const code = `for ${variable} in ${array}:\n${execution}`;

  // return code
  return code;
};

forBlock['python_pass'] = function () {
  // concatenate string
  const code = `pass\n`;

  // return code
  return code;
};

forBlock['python_break'] = function () {
  // concatenate string
  const code = `break\n`;

  // return code
  return code;
};

forBlock['python_continue'] = function () {
  // concatenate string
  const code = `continue\n`;

  // return code
  return code;
};

// functions

forBlock['python_func_def'] = function (block, generator) {
  // get function name
  const funcName = block.getFieldValue('NAME');

  // get contents
  const contents = generator.statementToCode(block, 'CONTENTS');

  let n = 0;
  let i ='0';
  let optionCode = '';

  const argsCode = 
      block.getFieldValue('field_args') || null;
  const kwargsCode = 
      block.getFieldValue('field_kwargs') || null;

  do {
    var conditionCode =
      generator.getVariableName(block.getFieldValue('field ' + i) || '');
    var conditionCodeReg = conditionCode.replace(/[0-9]/g, '')
    if (conditionCodeReg == 'unnamed') {conditionCode = ''};
    const defaultCode = 
      block.getFieldValue('default' + i) || '';
    
    if (n >= 1) {
      if (block.getFieldValue('args' + i)) {
        optionCode = optionCode + ', ' + argsCode + conditionCode;
      } else if (block.getFieldValue('default' + i)) {
        optionCode = optionCode + ', ' + conditionCode + " = " + defaultCode;
      } else {
        optionCode = optionCode + ', ' + conditionCode;
      };
    } else {
      if ( block.getFieldValue('args' + i) ) {
        optionCode = argsCode + conditionCode;
      } else if ( block.getFieldValue('default' + i) ) {
        optionCode = conditionCode + " = " + defaultCode;
      } else {
        optionCode = conditionCode;
      };
    };

    n++;
    i = String(n);
  } while (block.getFieldValue('field ' + i));

  if (argsCode != null && optionCode != '') {
    optionCode = optionCode + ', *' + argsCode;
  } else if (argsCode != null && optionCode == '') {
    optionCode = '*' + argsCode;
  };

  if (kwargsCode != null && optionCode != '') {
    optionCode = optionCode + ', **' + kwargsCode;
  } else if (kwargsCode != null && optionCode == '') {
    optionCode = '**' + kwargsCode;
  };

  return  `def ${funcName}` + '(' + optionCode + ')' + `:\n${contents}`;
};

forBlock['python_func_call'] = function (block, generator) {
  // get function name
  const funcName = block.getFieldValue('NAME');

  let n = 0;
  let i ='0';
  let code = `${funcName}`;
  let optionCode = '';
  let conditionCode = '';
  let defaultCode = '';

  do {
    if (block.getInput('keyword' + i)){
      defaultCode = 
        generator.valueToCode(block, 'keyword' + i, Order.NONE);
    }
    if (block.getInput('value_' + i)) {
      conditionCode =
        generator.valueToCode(block, 'value_' + i, Order.NONE);
    }
    if (block.getInput(`ARG${i}`)) {
      conditionCode =
        generator.valueToCode(block, `ARG${i}`, Order.NONE);
    }
    if (n >= 1) {
      if (block.getInput('keyword' + i)) {
        optionCode = optionCode + ', ' + conditionCode + " = " + defaultCode;
      } else {
        optionCode = optionCode + ', ' + conditionCode;
      };
    } else {
      if ( block.getInput('keyword' + i) ) {
        optionCode = conditionCode + " = " + defaultCode;
      } else {
        optionCode = conditionCode;
      };
    };

    n++;
    i = String(n);
  } while (block.getInput('value_' + i) || block.getInput(`ARG${i}`));

  if (block.nextConnection == null) {
    return [code + '(' + optionCode + ')', Order.ATOMIC];  
  }
  return code + '(' + optionCode + ')\n';
};

forBlock['python_return'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'VALUE', Order.NONE);

  // concatenate string
  const code = `return ${valueCode}\n`;

  // return code
  return code;
};

forBlock['python_yield'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'VALUE', Order.NONE);

  // concatenate string
  const code = `yield ${valueCode}\n`;

  // return code
  return code;
};

forBlock['python_abs'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'input_number', Order.NONE);

  // concatenate string
  const code = `abs(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['bool_func'] = function (block, generator) {

  // grab object value
  const valueCode = generator.valueToCode(block, 'INPUT', Order.NONE);

  // concatenate string
  const code = `bool(${valueCode})`;

  // return code
  return [code, Order.ATOMIC];
};

forBlock['range_func'] = function (block, generator) {
  var conditionCode = ``;

  // grab object value
  const stopCode = generator.valueToCode(block, 'STOP', Order.NONE);
  conditionCode = stopCode;

  // grab the start param value if it is there
  if (block.getInput('START')) {
    const startCode = generator.valueToCode(block, 'START', Order.NONE);
    conditionCode = `${startCode}, ${conditionCode}`;
  };

  // grab the step param value if it is there
  if (block.getInput('STEP')) {
    const stepCode = generator.valueToCode(block, 'STEP', Order.NONE);
    conditionCode = `${conditionCode}, ${stepCode}`;
  };

  // concatenate string
  var code = `range(${conditionCode})`;

  // return code
  return [code, Order.COLLECTION];
};

forBlock['slice_func'] = function (block, generator) {
  var conditionCode = ``;

  // grab list name
  const listCode = generator.valueToCode(block, 'LIST', Order.NONE);

  // grab object value
  const stopCode = generator.valueToCode(block, 'STOP', Order.NONE);
  conditionCode = stopCode;

  // grab the start param value if it is there
  if (block.getInput('START')) {
    const startCode = generator.valueToCode(block, 'START', Order.NONE);
    conditionCode = `${startCode}:${conditionCode}`;
  };

  // grab the step param value if it is there
  if (block.getInput('STEP')) {
    const stepCode = generator.valueToCode(block, 'STEP', Order.NONE);
    conditionCode = `${conditionCode}:${stepCode}`;
  };

  // concatenate string
  var code = `${listCode}[${conditionCode}]`;

  // return code
  return [code, Order.COLLECTION];
};
