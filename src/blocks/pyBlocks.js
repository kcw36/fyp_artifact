import * as Blockly from 'blockly/core';
import { getExtraBlockState } from '../serializers/serialization';
import { registerFieldMultilineInput } from '@blockly/field-multilineinput';
import { ObservableProcedureModel, ObservableParameterModel } from '@blockly/block-shareable-procedures';

/*
Strings
*/

const pyString = {
  'type': 'python_string',
  'message0': `'%1'`,
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'field_input',
      'name': 'VALUE',
      'text': 'Hello',
      'spellcheck': false
    }
  ],
  'output': 'String' 
}

const pyStringSpeech = {
  'type': 'python_stringSpeech',
  'message0': `"%1"`,
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'field_input',
      'name': 'VALUE',
      'text': 'Hello',
      'spellcheck': false
    }
  ],
  'output': 'String' 
}

// required plugin for using multi line text fields
registerFieldMultilineInput();
const pyStringMultiline = {
  'type': 'python_stringMulti',
  'message0': `%1`,
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'field_multilinetext',
      'name': 'VALUE',
      'text': `'''some text \n with newlines'''`,
      'spellcheck': false
    }
  ],
  'output': 'String' 
}

const pyConcat = {
  'type': 'py_concat',
  'message0': '%1 + %2',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['String', 'Variable']
    }
  ],
  'output': 'String',
  'inputsInline': true,
}

const pyStringMultiply = {
  'type': 'py_stringMultiply',
  'message0': '%1 * %2',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Integer', 'Variable']
    }
  ],
  'output': 'String',
  'inputsInline': true,
}

const pyUpper = {
  'type': 'pyUpper',
  'message0': '%1.upper()',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    }
  ],
  'output': 'String',
}

const pyLower = {
  'type': 'pyLower',
  'message0': '%1.lower()',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    }
  ],
  'output': 'String',
}

const pyTitle = {
  'type': 'pyTitle',
  'message0': '%1.title()',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    }
  ],
  'output': 'String',
}

const pyCapitalize = {
  'type': 'pyCapitalize',
  'message0': '%1.capitalize()',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    }
  ],
  'output': 'String',
}

const pyJoin = {
  'type': 'pyJoin',
  'message0': '%1.join(%2)',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Collection', 'Variable']
    }
  ],
  'output': 'String',
}

const pySplit = {
  'message0': '%1.split(%2)',
  'colour': '%{BKY_PROCEDURES_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['String', 'Variable']
    },
    {
      'type': 'input_dummy',
      'name': 'locator',
    }
  ],
  'output': 'Collection',
  'inputsInline': true,
  'mutator': 'split_mutator'
}

// mutator for .split method
Blockly.Blocks['pySplit'] = {
  // initiate JSON block definition
  init: function() {
    this.jsonInit(pySplit);
  },  
  // define new context menu options
  customContextMenu: function(options) {
    var block = this;
    var option_addSep = {
      enabled: true,
      text: 'Add Seperator Parameter',
      callback: function() {
        block.addSep_();
      },
    };
    var option_delSep = {
      enabled: true,
      text: 'Remove Seperator Parameter',
      callback: function() {
        block.delSep_();
      },
    };
    options.push(option_addSep, option_delSep);
  },
}

// mutators for adding options to .split function
const splitMutator = {
  // count of seperator parameters included in method
  sep: 0,

  // return seperator count
  saveExtraState: function() {
    return{
      'sep': this.sep
    };
  },

  // load seperator count
  loadExtraState: function(state) {
    this.updateShape_(state['sep']);
  },

  // repetition of saveExtraState logic for outdated DOM objects
  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('sep', this.sep);
    return container;
  },

  // repetition of loadExtraState logic for outdated DOM objects
  domToMutation: function (xmlElement) {
    const sepCount = parseInt(xmlElement.getAttribute('sep'), 10);
    this.updateShape_(sepCount);
  },

  // if expectation of seperator parameters doesn't match what is found on the block retrigger function to add or delete parameters
  updateShape_: function(sepCount) {
    while (this.sep < sepCount) {
      this.addSep_();
    };
    while (this.sep > sepCount) {
      this.delSep_();
    };
  },

  // add paramaeter that matches term parameter
  addPart_: function(term) {
    // get current local value for term attache to the block
    const i = Object.getOwnPropertyDescriptor(this, term).value;

    if (i == 1) {
      return;
    }

    switch(term) {
      case 'sep':
        this.getInput('locator')
            .appendField(new Blockly.FieldTextInput('","'), `field_sep`);
        this.sep++;
        break;
      default:
    }
  },

  // remove parameter that matches term
  removePart_: function(term) {
    const i = Object.getOwnPropertyDescriptor(this, term).value;

    if (i == 0) {
      return
    }

    switch(term) {
      case 'sep':
        this.getInput('locator')
            .removeField(`field_sep`);
        this.sep--;
        break;
      default:
        break;
    }
  },

  // add seperator parameter and trigger change event to reload workspace
  addSep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('sep');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  // remove seperator parameter and trigger change event to reload workspace
  delSep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('sep');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

/*
Number
*/

const pyInt = {
  'type': 'python_int',
  'message0': '%1',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'field_number',
      'name': 'VALUE',
      'value': 123,
      'precision': 1
    }
  ],
  'output': ['Integer']
}

const pyFloat = {
  'type': 'python_float',
  'message0': '%1',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'field_number',
      'name': 'VALUE',
      'value': 123.123
    }
  ],
  'output': ['Float']
}

const pyScientific = {
  'type': 'python_scientific',
  'message0': '%1e%2',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Integer', 'Float']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Integer']
    },
  ],
  'output': 'Number',
  'inputsInline': true
}

const pyComplexPlus = {
  'type': 'python_complexPlus',
  'message0': '%1+%2j',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Integer', 'Float']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Integer', 'Float']
    },
  ],
  'output': 'Number',
  'inputsInline': true
}

const pyComplexMinus = {
  'type': 'python_complexMinus',
  'message0': '%1-%2j',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Integer', 'Float']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Integer', 'Float']
    },
  ],
  'output': 'Number',
  'inputsInline': true
}

const pyOperator = {
  'type': 'py_operator',
  'message0': '%1 %3 %2',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Number', 'Integer', 'Float', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Number', 'Integer', 'Float', 'Variable']
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['+', '+'],
        ['-', '-'],
        ['*', '*'],
        ['/', '/'],
        ['//', '//'],
        ['%', '%'],
        ['**', '**']
      ]
    },
  ],
  'output': 'Number',
  'inputsInline': true
}

const pyIncrement = {
  'type': 'python_increment',
  'message0': '%1 %3 %2',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VARIABLE',
      'check': ['Variable']
    },
    {
      'type': 'input_value',
      'name': 'INCREMENT',
      'check': ['Number','Integer', 'Float', 'Variable']
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['+=', '+='],
        ['-=', '-='],
        ['*=', '*='],
        ['/=', '/=']
      ]
    },
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function'],
  'inputsInline': true
}

// abs
const pyAbs = {
  'type': 'python_abs',
  'message0': 'abs(%1)',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'input_number',
      'check': ['Number', 'Integer', 'Float', 'Variable']
    },
  ],
  "tooltip": "Returns the absolute value of a number.",
  'output': ['Number']
}

// pow func
const powFunc = {
  'message0': 'pow(%1, %2%3)',
  'colour': '%{BKY_MATH_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT_X',
      'check': ['Number','Integer', 'Float', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'INPUT_Y',
      'check': ['Number','Integer', 'Float', 'Variable']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Number'],
  'inputsInline': true,
  "tooltip": "Returns the value of the first value to the power of the second.",
  'mutator': 'pow_python'
}

Blockly.Blocks['pow_func'] = {
  init: function() {
    this.jsonInit(powFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addBase = {
      enabled: true,
      text: 'Add Modulus Parameter',
      callback: function() {
        block.addModulus_();
      },
    };
    var option_delBase = {
      enabled: true,
      text: 'Remove Modulus Parameter',
      callback: function() {
        block.delModulus_();
      },
    };
    options.push(option_addBase, option_delBase);
  },
}

// mutators for adding options to python function
const powPython = {
  itemCount_: 0,

  saveExtraState: function() {
    return{
      'itemCount': this.itemCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addModulus_();
    };
    while (this.itemCount_ > targetCount) {
      this.delModulus_();
    };
  },

  addPart_: function() {
    const i = this.itemCount_;

    if (i == 1) {
      return;
    }

    this.itemCount_++;

    var xmlDom = Blockly.utils.xml.textToDom(
      '<xml>' +
      '  <shadow type="python_int"><field name="VALUE">1</field></shadow>' +
      '</xml>');

    xmlDom = xmlDom.children[0];

    // create new value input
    this.appendValueInput('MODULUS')
        .setCheck(['Number', 'Integer', 'Float', 'Variable'])
        .setShadowDom(xmlDom);
    this.moveInputBefore('MODULUS', 'locator');
    this.getInput("MODULUS")
        .appendField(",", "comma")
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('MODULUS');
  },

  addModulus_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delModulus_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

/*
Boolean
*/

const pyRelational = {
  'type': 'python_relational',
  'message0': '%1 %2 %3\n',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1'
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['>', '>'],
        ['<', '<'],
        ['>=', '>='],
        ['<=', '<='],
        ['==', '=='],
        ['!=', '!=']
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2'
    }
  ],
  'output': 'Boolean'
}

const pyLogical = {
  'type': 'python_logical',
  'message0': '%1 %2 %3\n',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1'
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['and', 'and'],
        ['or', 'or']
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2'
    }
  ],
  'output': 'Boolean'
}

const pyIs = {
  'type': 'python_is',
  'message0': '%1 %2 %3\n',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1'
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['is', 'is'],
        ['is not', 'is not']
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2'
    }
  ],
  'output': 'Boolean'
}

const pyNot = {
  'type': 'python_not',
  'message0': 'not %1\n',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1'
    }
  ],
  'output': 'Boolean'
}

const pyBitwise = {
  'type': 'python_bitwise',
  'message0': '%1 %2 %3\n',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Number','Integer', 'Float', 'Variable']
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['&', '&'],
        ['|', '|'],
        ['^', '^'],
        ['~', '~'],
        ['<<', '<<'],
        ['>>', '>>'],
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Number','Integer', 'Float', 'Variable']
    }
  ],
  'output': 'Number'
}

const pyBool = {
  'type': 'python_boolean',
  'message0': '%1',
  'style': 'bool_blocks',
  'args0': [
    {
      'type': 'field_dropdown',
      'name': 'FIELD',
      'options': [
        ['True', 'True'],
        ['False', 'False']
      ]
    }
  ],
  'output': ['Boolean']
}

// Datatypes

// enumerate func
const pyEnumFunc = {
  'message0': 'enumerate(%1%2)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Collection', 'Variable', 'String']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Enumerate'],
  'inputsInline': true,
  'tooltip': 'Converts a collection into an enumerate object adding a counter as a key to the iterable. Optional parameter start to define start value for enumerate key.',
  'mutator': 'enum_python'
}

Blockly.Blocks['enum_func'] = {
  init: function() {
    this.jsonInit(pyEnumFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addStart = {
      enabled: true,
      text: 'Add Start Parameter',
      callback: function() {
        block.addStart_();
      },
    };
    var option_delStart = {
      enabled: true,
      text: 'Remove Start Parameter',
      callback: function() {
        block.delStart_();
      },
    };
    options.push(option_addStart, option_delStart);
  },
}

// mutators for adding options to python function
const enumPython = {
  itemCount_: 0,

  saveExtraState: function() {
    return{
      'itemCount': this.itemCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addStart_();
    };
    while (this.itemCount_ > targetCount) {
      this.delStart_();
    };
  },

  addPart_: function() {
    const i = this.itemCount_;

    if (i == 1) {
      return;
    }

    this.itemCount_++;

    var xmlDom = Blockly.utils.xml.textToDom(
      '<xml>' +
      '  <shadow type="python_int"><field name="VALUE">0</field></shadow>' +
      '</xml>');

    xmlDom = xmlDom.children[0];

    // create new value input
    this.appendValueInput('start_field')
        .setCheck(['Integer', 'Variable'])
        .setShadowDom(xmlDom);
    this.moveInputBefore('start_field', 'locator');
    this.getInput("start_field")
        .appendField(",", "comma")
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('start_field');
  },

  addStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

// frozenset collection
const pyFrozenFunc = {
  'type': 'frozen_func',
  'message0': 'frozenset(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['String', 'Collection', 'Variable']
    }
  ],
  'output': ['Collection'],
  'tooltip': 'Returns a frozenset object which is a set but unchangeable',
  'inputsInline': true
}

// all
const pyAll = {
  'type': 'python_all',
  'message0': 'all(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'input_set',
      'check': ['Collection', 'Variable']
    },
  ],
  'output': ['Boolean'],
  'tooltip': 'Returns True if all items in a collection are True, otherwise returns False.'
}

// any
const pyAny = {
  'type': 'python_any',
  'message0': 'any(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'input_set',
      'check': ['Collection', 'Variable']
    },
  ],
  'output': ['Boolean'],
  'tooltip': 'Returns True if any item in a collection is True, otherwise returns False.'
}

// len
const pyLen = {
  'type': 'python_len',
  'message0': 'len(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'Object',
      'check': ['String', 'Collection', 'Variable']
    },
  ],
  'output': ['Number'],
  'tooltip': 'Returns the number of items in a collection.'
}

// max
const pyMax = {
  'type': 'max_func',
  'message0': 'max(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Collection', 'String', 'Variable']
    },
  ],
  'output': ['Number', 'String'],
  'tooltip': 'Returns the item with the highest value in a collection'
};

// min
const pyMin = {
  'type': 'min_func',
  'message0': 'min(%1)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Collection', 'Variable']
    },
  ],
  'output': ['Number', 'String'],
  'tooltip': 'Returns the item with the lowest value in a collection'
};

// sorted func
const sortedFunc = {
  'message0': 'sorted(%1%2%3)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Collection', 'Variable']
    },
    {
      'type': 'input_dummy',
      'name': 'locator_key'
    },
    {
      'type': 'input_dummy',
      'name': 'locator_reverse'
    }
  ],
  'output': ['Number'],
  'inputsInline': true,
  'mutator': 'sorted_python',
  'tooltip': 'Returns a sorted list of the given collection. Optional parameter key will execute a function to decide the order and reverse will change sort order from ascending for False to descending for True.'
}

Blockly.Blocks['sorted_func'] = {
  init: function() {
    this.jsonInit(sortedFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addKey = {
      enabled: true,
      text: 'Add Key Parameter',
      callback: function() {
        block.addKey_();
      },
    };
    var option_delKey = {
      enabled: true,
      text: 'Remove Key Parameter',
      callback: function() {
        block.delKey_();
      },
    };
    var option_addReverse = {
      enabled: true,
      text: 'Add Reverse Parameter',
      callback: function() {
        block.addReverse_();
      },
    };
    var option_delReverse = {
      enabled: true,
      text: 'Remove Reverse Parameter',
      callback: function() {
        block.delReverse_();
      },
    };
    options.push(option_addKey, option_delKey, option_addReverse, option_delReverse);
  },
}

// mutators for adding options to python function
const sortedPython = {
  key: 0,
  reverse: 0,

  saveExtraState: function() {
    return{
      'key': this.key,
      'reverse': this.reverse
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['key'], state['reverse']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('key', this.key);
    container.setAttribute('reverse', this.reverse);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const keyCount = parseInt(xmlElement.getAttribute('key'), 10);
    const reverseCount = parseInt(xmlElement.getAttribute('reverse'), 10);
    this.updateShape_(keyCount, reverseCount);
  },

  updateShape_: function(keyCount, reverseCount) {
    while (this.key < keyCount) {
      this.addKey_();
    };
    while (this.key > keyCount) {
      this.delKey_();
    };
    while (this.reverse < reverseCount) {
      this.addReverse_();
    };
    while (this.reverse > reverseCount) {
      this.delReverse_();
    };
  },

  addPart_: function(term) {
    const i = Object.getOwnPropertyDescriptor(this, term).value;

    if (i == 1) {
      return;
    }

    switch(term) {
      case 'key':
        this.getInput('locator_key')
            .appendField(`, key=`, `comma_key`)
            .appendField(new Blockly.FieldTextInput('len'), `field_key`);
        this.key++;
        break;
      case 'reverse':
        this.getInput('locator_reverse')
            .appendField(`, reverse=`, `comma_reverse`)
            .appendField(new Blockly.FieldDropdown([['True', 'True'], ['False', 'False']]), `field_reverse`);
        this.reverse++;
        break;
      default:
    }
  },

  removePart_: function(term) {
    const i = Object.getOwnPropertyDescriptor(this, term).value;

    if (i == 0) {
      return
    }

    switch(term) {
      case 'key':
        this.getInput('locator_key')
            .removeField(`comma_key`);
        this.getInput('locator_key')
            .removeField(`field_key`);
        this.key--;
        break;
      case 'reverse':
        this.getInput('locator_reverse')
            .removeField(`comma_reverse`);
        this.getInput('locator_reverse')
            .removeField(`field_reverse`);
        this.reverse--;
        break;
      default:
        break;
    }
  },

  addKey_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('key');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delKey_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('key');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
  addReverse_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('reverse');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delReverse_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('reverse');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pySum = {
  'type': 'sum_func',
  'message0': 'sum(%1%2)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Set', 'Tuple', 'List', 'Variable']
    },{
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Enumerate'],
  'inputsInline': true,
  'mutator': 'enum_python',
  'tooltip': 'Returns the sum of all items in a collection as a number. Optional parameter start is a value added to the return value.'
}

Blockly.Blocks['sum_func'] = {
  init: function() {
    this.jsonInit(pyEnumFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addStart = {
      enabled: true,
      text: 'Add Start Parameter',
      callback: function() {
        block.addStart_();
      },
    };
    var option_delStart = {
      enabled: true,
      text: 'Remove Start Parameter',
      callback: function() {
        block.delStart_();
      },
    };
    options.push(option_addStart, option_delStart);
  },
}

const pyList = {
  'message0': '[ %1 %2 ]',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'formatter'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Collection', 'List'],
  'mutator': 'pyDataType_mutator',
  'tooltip': 'Define a python list. Ordered and mutable (changeable).',
  'inputsInline': true
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['python_list'] = {
  init: function() {
    this.jsonInit(pyList);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const pyTuple = {
  'message0': '( %1 %2 )',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'formatter'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Collection', 'Tuple'],
  'mutator': 'pyDataType_mutator',
  'tooltip': 'Define a python tuple. Ordered and immutable (unchangeable).',
  'inputsInline': true
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['python_tuple'] = {
  init: function() {
    this.jsonInit(pyTuple);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInputTuple_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInputTuple_();
        },
      };
    options.push(option, option2);
  },
}

const pyDataTypeMutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function(isTuple) {
    let i = this.itemCount_;
    this.itemCount_++;

    // set string counter variables
    let stri = String(i);

    if ( i == 0 ) {
      // create new value input
      this.appendValueInput(stri)
          .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
      this.moveInputBefore(stri, 'locator');
      if (isTuple) {
        // add single item comma
        this.getInput('locator')
            .appendField(',', 'tuple_comma');
      }
      return
    }

    if ( i == 1 && isTuple) {
      // remove single item comma
      this.getInput('locator')
          .removeField('tuple_comma');
    }

    // create new value input
    this.appendValueInput(stri)
        .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
    this.moveInputBefore(stri, 'locator');

    // add seperator
    this.getInput(stri)
        .appendField(',');
  },

  removePart_: function(isTuple) {
    let i = this.itemCount_;

    if (i == 0) {
      return
    }
   
    // set string counter variables
    let stri = String(i-1);

    // delete old value input
    this.removeInput(stri)

    if (i == 2 && isTuple) {
      // add single item comma
      this.getInput('locator')
          .appendField(',', 'tuple_comma');
    }

    if (i == 1 && isTuple) {
      // add single item comma
      this.getInput('locator')
          .removeField('tuple_comma');
    }

    this.itemCount_--;
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_(false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addValueInputTuple_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_(true);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_(false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInputTuple_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_(true);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pyDictionary = {
  'message0': '{%1%2}',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'text_holder'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Collection', 'Dictionary'],
  'mutator': 'pyDictionary_mutator',
  'tooltip': 'Define a python dictionary. Unique values, ordered with key value pairs.',
  'inputsInline': true,
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['python_dictionary'] = {
  init: function() {
    this.jsonInit(pyDictionary);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const pyDictionary_mutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function() {
    this.itemCount_++;
    const i = this.itemCount_;

    // set string counter variables
    const stri = String(i);

    if ( i == 1 ) {

      // create new value input
      this.appendValueInput("value_" + stri)
          .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
      this.getInput("value_" + stri)
          .appendField(new Blockly.FieldTextInput(`"myKey_${stri}"`), "field_" + stri)
          .appendField(":", "colon_" + stri);
      this.moveInputBefore("value_" + stri, `locator`);
      return
    }

    // create new value input
    this.appendValueInput("value_" + stri)
        .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
    this.getInput("value_" + stri)
        .appendField(",", "comma" + stri)
        .appendField(new Blockly.FieldTextInput(`"myKey_${stri}"`), "field_" + stri)
        .appendField(":", "colon_" + stri);
    this.moveInputBefore("value_" + stri, `locator`);
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }
    // set string counter variables
    const stri = String(i);

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('value_' + stri);
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pySet = {
  'message0': '{ %2 }',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': '0',
      'check': ['Number','Integer', 'Float', 'Variable', 'String']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Collection', 'Set'],
  'mutator': 'pySet_mutator',
  'tooltip': 'Define a python set. Unique values, immutable and unordered',
  'inputsInline': true
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['python_set'] = {
  init: function() {
    this.jsonInit(pySet);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const pySetMutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function() {
    this.itemCount_++;
    let i = this.itemCount_;

    // set string counter variables
    let stri = String(i);

    // create new value input
    this.appendValueInput(stri)
        .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
    this.moveInputBefore(stri, 'locator');

    // add seperator
    this.getInput(stri)
        .appendField(',');
  },

  removePart_: function() {
    let i = this.itemCount_;

    if (i == 0) {
      return
    }
   
    // set string counter variables
    let stri = String(i);

    // delete old value input
    this.removeInput(stri)

    this.itemCount_--;
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

// list concatenation operator
const pyConcatLists = {
  'type': 'pyConcatLists',
  'message0': '%1 + %2',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT1',
      'check': ['List', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'INPUT2',
      'check': ['List', 'Variable']
    }
  ],
  'output': ['Collection', 'List'],
  'inputsInline': true
}

// list replication operator
const pyReplicationLists = {
  'type': 'pyReplicationLists',
  'message0': '%1 * %2',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['List', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'INT',
      'check': ['Integer', 'Variable']
    }
  ],
  'output': ['Collection', 'List'],
  'inputsInline': true
}

// list in and not in operator
const pyMembershipLists = {
  'type': 'pyMembershipLists',
  'message0': '%1 %2 %3',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Variable', 'String', 'Number', 'Integer', 'Float']
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['in', 'in'],
        ['no in', 'not in']
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['Variable', 'Collection']
    }
  ],
  'output': ['Boolean'],
  'inputsInline': true
}

const pyRelationalLists = {
  'type': 'pyRelationalLists',
  'message0': '%1 %2 %3\n',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['List', 'Set', 'Tuple', 'Variable']
    },
    {
      'type': 'field_dropdown',
      'name': 'OPERATOR',
      'options': [
        ['>', '>'],
        ['<', '<'],
        ['>=', '>='],
        ['<=', '<='],
        ['==', '=='],
        ['!=', '!=']
      ]
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
      'check': ['List', 'Set', 'Tuple', 'Variable']
    }
  ],
  'output': 'Boolean'
}

// slice
const pySlice = {
  'message0': '%1[%2%3%4]',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'LIST',
      'check': ['Variable']
    },
    {
      'type': 'input_dummy',
      'name': 'start_locator'
    },
    {
      'type': 'input_value',
      'name': 'STOP',
      'check': ['Number', 'Variable', 'Integer', 'Float']
    },
    {
      'type': 'input_dummy',
      'name': 'step_locator'
    }
  ],
  'output': ['Collection', 'List'],
  'inputsInline': true,
  'tooltip': 'Returns a sequence of numbers from 0 to the given value stepping 1 each time. Optional parameter of Start and Step to define a different start and step value for the sequence.',
  'mutator': 'slice_python'
};

Blockly.Blocks['slice_func'] = {
  init: function() {
    this.jsonInit(pySlice);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addStart = {
      enabled: true,
      text: 'Add Start Parameter',
      callback: function() {
        block.addStart_();
        options.push(option_delStart.enabled = true);
      },
    };
    var option_delStart = {
      enabled: true,
      text: 'Remove Start Parameter',
      callback: function() {
        block.delStart_();
      },
    };
    var option_addStep = {
      enabled: true,
      text: 'Add Step Parameter',
      callback: function() {
        block.addStep_();
      },
    };
    var option_delStep = {
      enabled: true,
      text: 'Remove Step Parameter',
      callback: function() {
        block.delStep_();
      },
    };
    options.push(option_addStart, option_delStart, option_addStep, option_delStep);
  },
};

// mutators for adding options to python function
const slicePython = {
  startCount_: 0,
  stepCount_: 0,

  saveExtraState: function() {
    return{
      'startCount': this.startCount_,
      'stepCount': this.stepCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['startCount'], state['stepCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('step', this.stepCount_);
    container.setAttribute('start', this.startCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const startCount = parseInt(xmlElement.getAttribute('start'), 10);
    const stepCount = parseInt(xmlElement.getAttribute('step'), 10);
    this.updateShape_(startCount, stepCount);
  },

  updateShape_: function(startCount, stepCount) {
    while (this.startCount_ < startCount) {
      this.addStart_();
    };
    while (this.startCount_ > startCount) {
      this.delStart_();
    };
    while (this.stepCount_ < stepCount) {
      this.addStep_();
    };
    while (this.stepCount_ > stepCount) {
      this.delStep_();
    };
  },

  addPart_: function(type) {
    switch(type) {
      case 'start':
        var i = this.startCount_;
        if (i >= 1) {
          break;
        }

        this.startCount_++;
        this.appendValueInput('START')
            .setCheck(['Number', 'Variable', 'Integer', 'Float']);
        this.moveInputBefore('START', 'STOP');
        this.getInput('STOP')
            .appendField(':', 'START_comma');
        break;
      case 'step':
        var i = this.stepCount_;
        if (i >= 1) {
          break;
        }

        var j = this.startCount_;
        if (j == 0) {
          alert('First add a start parameter');
          break;
        }

        this.stepCount_++;
        this.appendValueInput('STEP')
            .setCheck(['Number', 'Variable', 'Integer', 'Float']);
        this.moveInputBefore('STEP', 'step_locator');
        this.getInput('STEP')
            .appendField(':', 'STEP_comma');
        break;
    }  
  },

  removePart_: function(type) {
    switch(type) {
      case 'start':
        var i = this.startCount_;
        if (i == 0) {
          break;
        }

        var j = this.stepCount_;
        if (j == 1) {
          alert('First remove step parameter');
          break;
        }

        this.startCount_--;

        this.removeInput('START');
        this.getInput('STOP')
            .removeField('START_comma');
        break;
      case 'step':
        var i = this.stepCount_;

        if (i == 0) {
          break;
        }

        this.stepCount_--;

        this.removeInput('STEP');
        break;
    }
  },

  addStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('start');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('start');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addStep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('step');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delStep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('step');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

const pyKeys = {
  'type': 'pyKeys',
  'message0': '%1.keys()',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Dictionary', 'Variable']
    }
  ],
  'output': 'String',
}

const pyValues = {
  'type': 'pyValues',
  'message0': '%1.values()',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Dictionary', 'Variable']
    }
  ],
  'output': 'String',
}

const pyItems = {
  'type': 'pyItems',
  'message0': '%1.items()',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Dictionary', 'Variable']
    }
  ],
  'output': 'String',
}

const pyAppend = {
  'type': 'pyAppend',
  'message0': '%1.append(%2)',
  'style': 'datatypes_style',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE1',
      'check': ['Collection', 'Variable']
    },
    {
      'type': 'input_value',
      'name': 'VALUE2',
    }
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function'],
}

/*
* Input / Output
*/

// input func
const pyInput = {
  'type': 'input_func',
  'message0': 'input()',
  'style': 'io_blocks',
  'output': 'String',
  'tooltip': 'Generates a prompt window for user input'
}

// chr func
const pyChrFunc = {
  'type': 'chr_func',
  'message0': 'chr(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Integer', 'Number', 'Variable']
    }
  ],
  'output': ['String'],
  "tooltip": "Returns the character that represents the specified unicode integer.",
  'inputsInline': true
}

// sk has not yet implemented eval 
const pyEvalFunc = {
  'type': 'eval_func',
  'message0': 'eval(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['String', 'Variable']
    }
  ],
  'output': ['Variable'],
  "tooltip": "Evaluates the given expression and executes it",
  'inputsInline': true
}

// bool
const pyBoolFunc = {
  'type': 'bool_func',
  'message0': 'bool(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['String', 'Collection', 'Variable']
    },
  ],
  "tooltip": "Returns the boolean value of a specified object.",
  'output': ['Boolean']
}

const pyListFunc = {
  'message0': 'list(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'text_holder',
    },
    {
      'type': 'input_dummy',
      'name': 'locator',
    },
  ],
  'output': ['List', 'Collection'],
  'tooltip': 'Creates a list object',
  'inputsInline': true,
  'mutator': 'listMutator'
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['list_func'] = {
  init: function() {
    this.jsonInit(pyListFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const listMutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function() {
    
    let i = this.itemCount_;
    if (i == 1) {
      return
    }
    this.itemCount_++;
    // set string counter variables
    let stri = String(i);

    // create new value input
    this.appendValueInput(stri)
        .setCheck(['String', 'Collection', 'Variable']);
    this.moveInputBefore(stri, 'locator');
  },

  removePart_: function() {
    let i = this.itemCount_;

    if (i == 0) {
      return
    }
   
    // set string counter variables
    let stri = String(i-1);

    // delete old value input
    this.removeInput(stri)

    this.itemCount_--;
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pySetFunc = {
  'message0': 'set(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'text_holder'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    },
  ],
  'output': ['Set', 'Collection'],
  'inputsInline': true,
  'tooltip': 'Creates a set object',
  'mutator': 'set_func_mutator'
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['set_func'] = {
  init: function() {
    this.jsonInit(pySetFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const pyDictFunc = {
  'message0': 'dict(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'text_holder'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    },
  ],
  'output': ['Collection', 'Dictionary'],
  'mutator': 'dictFuncMutator',
  'tooltip': 'Creates a python dictionary. Unique values, ordered with key value pairs.',
  'inputsInline': true,
}

// for help with mutators see https://github.com/google/blockly-samples/blob/master/plugins/block-plus-minus/src/list_create.js
Blockly.Blocks['pyDictFunc'] = {
  init: function() {
    this.jsonInit(pyDictFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option = {
      enabled: true,
      text: 'Add item',
      callback: function() {
        block.addValueInput_();
      },
    };
    var option2 = {
        enabled: true,
        text: 'Remove item',
        callback: function() {
          block.removeValueInput_();
        },
      };
    options.push(option, option2);
  },
}

const dictFuncMutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function() {
    this.itemCount_++;
    const i = this.itemCount_;

    // set string counter variables
    const stri = String(i);

    if ( i == 1 ) {

      // create new value input
      this.appendValueInput("value_" + stri)
          .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
      this.getInput("value_" + stri)
          .appendField(new Blockly.FieldTextInput(`myKey_${stri}`), "field_" + stri)
          .appendField(" = ", "colon_" + stri);
      this.moveInputBefore("value_" + stri, `locator`);
      return
    }

    // create new value input
    this.appendValueInput("value_" + stri)
        .setCheck(['Number','Integer', 'Float', 'Variable', 'String']);
    this.getInput("value_" + stri)
        .appendField(",", "comma" + stri)
        .appendField(new Blockly.FieldTextInput(`myKey_${stri}`), "field_" + stri)
        .appendField(" = ", "colon_" + stri);
    this.moveInputBefore("value_" + stri, `locator`);
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }
    // set string counter variables
    const stri = String(i);

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('value_' + stri);
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const setFuncMutator = {
  itemCount_: 0,

  saveExtraState: function() {
    return {
      itemCount: this.itemCount_,
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addPart_();
    }
    while (this.itemCount_ > targetCount) {
      this.removePart_();
    }
  },

  addPart_: function() {
    
    let i = this.itemCount_;
    if (i == 1) {
      return
    }
    this.itemCount_++;
    // set string counter variables
    let stri = String(i);

    // create new value input
    this.appendValueInput(stri)
        .setCheck(['String', 'Collection', 'Variable']);
    this.moveInputBefore(stri, 'locator');
  },

  removePart_: function() {
    let i = this.itemCount_;

    if (i == 0) {
      return
    }
   
    // set string counter variables
    let stri = String(i-1);

    // delete old value input
    this.removeInput(stri)

    this.itemCount_--;
  },

  addValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  removeValueInput_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

// str func
const pyStrFunc = {
  'type': 'pyStrFunc',
  'message0': 'str(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Number','Integer', 'Float', 'Variable', 'Boolean', 'String']
    }
  ],
  'output': ['String'],
  "tooltip": "Converts the specified value into a string.",
  'inputsInline': true
}

// float func
const pyFloatFunc = {
  'type': 'float_func',
  'message0': 'float(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Number','Integer', 'Float', 'Variable', 'String']
    }
  ],
  'output': ['Float'],
  "tooltip": "Converts the specified value into a float.",
  'inputsInline': true
}

// complex func
const pyComplexFunc = {
  'message0': 'complex(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'REAL',
      'check': ['Number','Integer', 'Float', 'Variable', 'String']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Number'],
  "tooltip": "Converts the specified value into a complex number. Can accept string in format '3+5j' or add an optional parameter to define real and imaginary components.",
  'inputsInline': true,
  'mutator': 'complex_python'
}

Blockly.Blocks['complex_func'] = {
  init: function() {
    this.jsonInit(pyComplexFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addIm = {
      enabled: true,
      text: 'Add Imaginary Parameter',
      callback: function() {
        block.addIm_();
      },
    };
    var option_delIm = {
      enabled: true,
      text: 'Remove Imaginary Parameter',
      callback: function() {
        block.delIm_();
      },
    };
    options.push(option_addIm, option_delIm);
  },
};

// mutators for adding options to python function
const complexPython = {
  itemCount_: 0,

  saveExtraState: function() {
    return{
      'itemCount': this.itemCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addIm_();
    };
    while (this.itemCount_ > targetCount) {
      this.delIm_();
    };
  },

  addPart_: function() {
    const i = this.itemCount_;

    if (i == 1) {
      return;
    }

    this.itemCount_++;

    var xmlDom = Blockly.utils.xml.textToDom(
      '<xml>' +
      '  <shadow type="python_int"></shadow>' +
      '</xml>');

    xmlDom = xmlDom.children[0];

    // create new value input
    this.appendValueInput('IMAGINARY')
        .setCheck(['Number','Integer', 'Float', 'Variable'])
        .setShadowDom(xmlDom);
    this.moveInputBefore('IMAGINARY', 'locator');
    this.getInput("IMAGINARY")
        .appendField(",", "comma")

    // set check on real component
    this.getInput('REAL')
        .setCheck(['Number','Integer', 'Float', 'Variable'])
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('IMAGINARY');

    // set check on real component
    this.getInput('REAL')
        .setCheck(['Number','Integer', 'Float', 'Variable', 'String'])
  },

  addIm_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delIm_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

// int func
const pyIntFunc = {
  'message0': 'int(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT',
      'check': ['Number','Integer', 'Float', 'String', 'Variable']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    }
  ],
  'output': ['Integer'],
  "tooltip": "Converts the specified value into a integer. Add optional base parameter to define base system for integer.",
  'inputsInline': true,
  'mutator': 'int_python'
}

Blockly.Blocks['int_func'] = {
  init: function() {
    this.jsonInit(pyIntFunc);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addBase = {
      enabled: true,
      text: 'Add Base Parameter',
      callback: function() {
        block.addBase_();
      },
    };
    var option_delBase = {
      enabled: true,
      text: 'Remove Base Parameter',
      callback: function() {
        block.delBase_();
      },
    };
    options.push(option_addBase, option_delBase);
  },
}

// mutators for adding options to python function
const intPython = {
  itemCount_: 0,

  saveExtraState: function() {
    return{
      'itemCount': this.itemCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    this.updateShape_(targetCount);
  },

  updateShape_: function(targetCount) {
    while (this.itemCount_ < targetCount) {
      this.addBase_();
    };
    while (this.itemCount_ > targetCount) {
      this.delBase_();
    };
  },

  addPart_: function() {
    const i = this.itemCount_;

    if (i == 1) {
      return;
    }

    this.itemCount_++;

    var xmlDom = Blockly.utils.xml.textToDom(
      '<xml>' +
      '  <shadow type="python_int"><field name="VALUE">10</field></shadow>' +
      '</xml>');

    xmlDom = xmlDom.children[0];

    // create new value input
    this.appendValueInput('base_field')
        .setCheck(['Number', 'Integer', 'Variable'])
        .setShadowDom(xmlDom);
    this.moveInputBefore('base_field', 'locator');
    this.getInput("base_field")
        .appendField(",", "comma")

    // set check on INPUT component
    this.getInput('INPUT')
        .setCheck(['Variable', 'String'])
  },

  removePart_: function() {
    const i = this.itemCount_;

    if (i == 0) {
      return
    }

    this.itemCount_--;

    // remove value and row inputs
    this.removeInput('base_field');

    // set check on INPUT component
    this.getInput('INPUT')
        .setCheck(['Number','Integer', 'Float', 'String', 'Variable'])
  },

  addBase_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delBase_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

// print
const python_print = {
  'message0': 'print(%1%2)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'field_0'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    },
  ],
  // stops dummy input from creating a newline
  'inputsInline': true,
  "tooltip": "Outputs the inputted expression to the console. Can take optional seperator, end, flush and file parameters. Seperator and end define what to seperate and end the print statements with. Flush specifies if the output is flushed or buffered. File defines an object with a write method.",
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function'],
  'mutator': 'print_python'
};

Blockly.Blocks['python_print'] = {
  init: function() {
    this.jsonInit(python_print);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addObj = {
      enabled: true,
      text: 'Add Object',
      callback: function() {
        block.addObj_();
      },
    };
    var option_delObj = {
      enabled: true,
      text: 'Remove Object',
      callback: function() {
        block.delObj_();
      },
    };
    var option_addSep = {
      enabled: true,
      text: 'Add Sep Parameter',
      callback: function() {
        block.addSep_();
      },
    };
    var option_delSep = {
      enabled: true,
      text: 'Remove Sep Parameter',
      callback: function() {
        block.delSep_();
      },
    };
    var option_addEnd = {
      enabled: true,
      text: 'Add End Parameter',
      callback: function() {
        block.addEnd_();
      },
    };
    var option_delEnd = {
      enabled: true,
      text: 'Remove End Parameter',
      callback: function() {
        block.delEnd_();
      },
    };
    var option_addFlush = {
      enabled: true,
      text: 'Add Flush Parameter',
      callback: function() {
        block.addFlush_();
      },
    };
    var option_delFlush = {
      enabled: true,
      text: 'Remove Flush Parameter',
      callback: function() {
        block.delFlush_();
      },
    };
    var option_addFile = {
      enabled: true,
      text: 'Add File Parameter',
      callback: function() {
        block.addFile_();
      },
    };
    var option_delFile = {
      enabled: true,
      text: 'Remove File Parameter',
      callback: function() {
        block.delFile_();
      },
    };
    var option_showBlockJSON = {
      enabled: false,
      text: 'Show Block JSON',
      callback: function() {
        block.showJSON_();
      }
    }
    options.push(option_addObj, option_delObj, option_addSep, option_delSep, option_addEnd, option_delEnd, option_addFlush, option_delFlush, option_addFile, option_delFile, option_showBlockJSON);
  },
};

// mutators for adding options to python function
const printPython = {
  itemCount_: 0,
  typeArray: { "sep": false, "end": false, "flush": false, "file": false},
  testCounter: 0,

  saveExtraState: function() {
    return{
      'itemCount': this.itemCount_,
      'targetArray': this.typeArray
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['itemCount'], state['targetArray']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    container.setAttribute('sep', this.typeArray['sep']);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const checkArray = [];
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    checkArray['sep'] = xmlElement.getAttribute('sep');
    this.setWarningText(checkArray['sep']);
    this.updateShape_(targetCount, checkArray);
  },

  updateShape_: function(targetCount, targetArray) {
    while (this.itemCount_ < targetCount) {
      this.addObj_();
    };
    while (this.itemCount_ > targetCount) {
      this.delObj_();
    };

    if (targetArray['sep'] == true) {
      this.addSep_();
    };
    if (targetArray['end'] == true) {
      this.addEnd_();
    };
    if (targetArray['file'] == true) {
      this.addFile_();
    };
    if (targetArray['flush'] == true) {
      this.addFlush_();
    };
  },

  checkDiff_: function(checkArray) {
    if (checkArray['sep'] == 'false') {
      this.getInput('locator')
            .appendField(', ', 'comma_' + type)
            .appendField( typeCode , "args_" + type)
            .appendField( new Blockly.FieldTextInput('""'), "field_" + type);
    };
    if (checkArray['sep'] == 'true') {
      this.getInput('locator')
                .removeField("args_" + 'sep');
            this.getInput('locator')
                .removeField("field_" + 'sep');
            this.getInput('locator')
                .removeField("comma_" + 'sep');
    };
  },

  addPart_: function(type, incrementCheck) {
    if ( incrementCheck ) {
      // increment count
      this.itemCount_++;
    };

    let typeCode = type + "=";
    // add different fields to block depending on type required
    switch (type) {
      case "sep":
        if ( this.typeArray[type] == true ){
          if (this.getField('field_' + type)) {
            break;
          } else {
            this.typeArray[type] == false; 
          };
        };
        this.getInput('locator')
            .appendField(', ', 'comma_' + type)
            .appendField( typeCode , "args_" + type)
            .appendField( new Blockly.FieldTextInput('""'), "field_" + type);
        this.typeArray["sep"] = true;

        // if another optional param is present it deletes it and adds it back to the block to keep the order consistent
        if (this.getField('field_end') ) {
          let endCode = this.getFieldValue("field_end");
          this.getInput('locator')
              .removeField('comma_end');
          this.getInput('locator')
              .removeField("args_end");
          this.getInput('locator')
              .removeField("field_end");
          this.getInput('locator')
              .appendField(', ', 'comma_end')
              .appendField( "end=" , "args_end")
              .appendField( new Blockly.FieldTextInput(endCode), "field_end");
        };

        if (this.getField('field_flush') ){
          this.getInput('locator')
              .removeField('comma_flush');
          this.getInput('locator')
              .removeField("args_flush");
          this.getInput('locator')
              .removeField("field_flush");
          this.getInput('locator')
              .appendField(', ', 'comma_flush')
              .appendField( "flush=" , "args_flush")
              .appendField( new Blockly.FieldDropdown([['True', 'True'], ['False', 'False']]), "field_flush");
        };

        if (this.getField('field_file') ){
          let fileCode = this.getFieldValue("field_file");
          this.getInput('locator')
              .removeField('comma_file');
          this.getInput('locator')
              .removeField("args_file");
          this.getInput('locator')
              .removeField("field_file");
          this.getInput('locator')
              .appendField(', ', 'comma_file')
              .appendField( "file=" , "args_file")
              .appendField( new Blockly.FieldTextInput(fileCode), "field_file");
        };

        break;
      case "end":
        if ( this.typeArray[type] == true ){
          if (this.getField('field_' + type)) {
            break;
          } else {
            this.typeArray[type] == false; 
          };
        };
        this.getInput('locator')
            .appendField(', ', 'comma_' + type)
            .appendField( typeCode , "args_" + type)
            .appendField( new Blockly.FieldTextInput('""'), "field_" + type);
        this.typeArray["end"] = true;

        if (this.getField('field_flush') ){
          this.getInput('locator')
              .removeField('comma_flush');
          this.getInput('locator')
              .removeField("args_flush");
          this.getInput('locator')
              .removeField("field_flush");
          this.getInput('locator')
              .appendField(', ', 'comma_flush')
              .appendField( "flush=" , "args_flush")
              .appendField( new Blockly.FieldDropdown([['true', 'TRUE'], ['false', 'FALSE']]), "field_flush");
        };

        if (this.getField('field_file') ){
          let fileCode = this.getFieldValue("field_file");
          this.getInput('locator')
              .removeField('comma_file');
          this.getInput('locator')
              .removeField("args_file");
          this.getInput('locator')
              .removeField("field_file");
          this.getInput('locator')
              .appendField(', ', 'comma_file')
              .appendField( "file=" , "args_file")
              .appendField( new Blockly.FieldTextInput(fileCode), "field_file");
        };
        break;
      case "flush":
        if ( this.typeArray[type] == true ){
          if (this.getField('field_' + type)) {
            break;
          } else {
            this.typeArray[type] == false; 
          };
        };
        this.getInput('locator')
            .appendField(', ', 'comma_' + type)
            .appendField( typeCode , "args_" + type)
            .appendField( new Blockly.FieldDropdown([['true', 'TRUE'], ['false', 'FALSE']]), "field_" + type);
        this.typeArray["flush"] = true;
        
        if (this.getField('field_file') ){
          let fileCode = this.getFieldValue("field_file");
          this.getInput('locator')
              .removeField('comma_file');
          this.getInput('locator')
              .removeField("args_file");
          this.getInput('locator')
              .removeField("field_file");
          this.getInput('locator')
              .appendField(', ', 'comma_file')
              .appendField( "file=" , "args_file")
              .appendField( new Blockly.FieldTextInput(fileCode), "field_file");
          };
        break;
      case "file":
        if ( this.typeArray[type] == true ){
          if (this.getField('field_' + type)) {
            break;
          } else {
            this.typeArray[type] == false; 
          };
        };
        this.getInput('locator')
            .appendField(', ', 'comma_' + type)
            .appendField( typeCode , "args_" + type)
            .appendField( new Blockly.FieldTextInput("sys.stderr"), "field_" + type);
          this.typeArray["file"] = true;
        break;
      default:
        // set string counter variables
        let i = this.itemCount_;
        let stri = String(i);
        
        this.appendValueInput("field_" + stri);
        this.moveInputBefore("field_" + stri, "locator")
        this.getInput('field_' + stri)
            .appendField(', ', 'comma_' + stri);
    };
  },

  removePart_: function( type ) {
    // add different fields to block depending on type required
    switch (type) {
      case "object":
        let i = this.itemCount_;
        // set string counter variables
        let stri = String(i);

        if (i < 1) {
          break;
        };

        this.getInput('field_' + stri)
            .removeField("comma_" + stri);
        this.removeInput("field_" + stri);
        
        this.itemCount_--;
        break;
      default:
          try {
            this.getInput('locator')
                .removeField("args_" + type);
            this.getInput('locator')
                .removeField("field_" + type);
            this.getInput('locator')
                .removeField("comma_" + type);
          }
          catch(err) {
            // TODO: add error reporting
          };
        break;
    };
    this.typeArray[ type ] = false;
  },

  // debug method for when required
  showJSON_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    let holster = ``;
    // get block json
    const blockJson = Blockly.serialization.blocks.save(this, {
      addCoordinates: false,
      addInputBlocks: false,
      addNextBlocks: false,
      doFullSerialization: false,
    });
    // create block from json
    const result = Blockly.serialization.blocks.append(blockJson, this.workspace);
    // output the contents of the block json to the warning text of the block for debugging
    for (const property in blockJson) {
      try {
        if (property == 'extraState') {
          holster = holster + `count: ${blockJson[property]['count']}`;
          holster = holster + `sep: ${blockJson[property]['sep']}`;
        } else {
          holster = holster + `${property}: ${blockJson[property]}`;
        }
      } catch {
        let stringy = JSON.stringify(blockJson[property]);
        holster = holster + `${property}: ${stringy} || `;
      }
      
    };
    // generate string from block json
    const blockText = JSON.stringify(blockJson);
    // create xml object of block
    const xml = Blockly.Xml.blockToDom(this);
    const xml_text = Blockly.Xml.domToText(xml);
    const domText = Blockly.Xml.domToPrettyText(xml);
    const ws = Blockly.getMainWorkspace();
    this.setWarningText(holster);
    //Blockly.Xml.domToBlock(xml, ws);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addObj_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("object", true);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delObj_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("object");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addSep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("sep", false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delSep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("sep");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addEnd_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("end", false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delEnd_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("end");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addFlush_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("flush", false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delFlush_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("flush");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addFile_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("file", false);
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delFile_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("file");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

// type func
const pyTypeFunc = {
  'type': 'type_func',
  'message0': 'type(%1)',
  'style': 'io_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'INPUT'
    }
  ],
  'output': ['Variable'],
  "tooltip": "Returns the type of the given object.",
  'inputsInline': true
}

/*
Variables
*/
const varSet = {
  'type': 'var_set',
  'message0': '%1 = %2\n',
  'colour': '%{BKY_VARIABLES_HUE}',
  'args0': [
    {
      'type': 'field_variable',
      'name': 'FIELDNAME',
      'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
      "variableTypes": ["Variable"],    // Specifies what types to put in the dropdown
      "defaultType": "Variable"
    },
    {
      'type': 'input_value',
      'name': 'VALUE',
      'check': ['Number', 'Integer', 'Float', 'Variable', 'Boolean', 'Collection', 'String', 'Enumerate']
    }
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function']
}

const varGet = {
  'type': 'var_get',
  'message0': '%1',
  'colour': '%{BKY_VARIABLES_HUE}',
  'args0': [
    {
      'type': 'field_variable',
      'name': 'FIELDNAME',
      'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
      "variableTypes": ["Variable"],    // Specifies what types to put in the dropdown
      "defaultType": "Variable"
    }
  ],
  'output': ['Variable']
}

const varGetParam = {
  'message0': '%1',
  'style': 'function_blocks',
  'args0': [
    {
      'type': 'field_variable',
      'name': 'FIELDNAME',
      'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
      "variableTypes": ["param"],    // Specifies what types to put in the dropdown
      "defaultType": "param"
    }
  ],
  'output': ['Variable']
}

Blockly.Blocks['var_get_param'] = {
  init: function() {
    this.jsonInit(varGetParam);
    this.contextMenu = false;
  },
  preconditionFn: function(scope) {
    return 'disabled'
  }
}

/*
Logic
*/

const pyIf = {
  'type': 'python_if',
  'message0': 'if %1:\n %2',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'CONDITION',
      'check': ['Boolean']
    },
    {
      'type': 'input_statement',
      'name': 'EXECUTE',
      'check': ['Statement', 'Function', 'Pass']
    }
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Logic', 'Statement', 'Function']
}

const pyElse = {
  'type': 'python_else',
  'message0': 'else:\n %1',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_statement',
      'name': 'EXECUTE',
      'check': ['Statement', 'Function', 'Pass']
    }
  ],
  'previousStatement': ['Logic', 'Else'],
  'nextStatement': ['Statement', 'Function']
}

const pyElif = {
  'type': 'python_elif',
  'message0': 'elif %1:\n %2',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'CONDITION',
      'check': ['Boolean']
    },
    {
      'type': 'input_statement',
      'name': 'EXECUTE',
      'check': ['Statement', 'Function', 'Pass']
    }
  ],
  'previousStatement': ['Logic'],
  'nextStatement': ['Logic', 'Function', 'Statement']
}

const pyWhile = {
  'type': 'python_while',
  'message0': 'while %1:\n %2',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VARIABLE',
      'check': ['Variable', 'Boolean']
    },
    {
      'type': 'input_statement',
      'name': 'EXECUTE',
      'check': ['Statement', 'Control_Statement', 'Function']
    },
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function', 'Else']
}

const pyFor = {
  'type': 'python_for',
  'message0': 'for %1 in %2:\n %3',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VARIABLE',
      'check': ['Variable']
    },
    {
      'type': 'input_value',
      'name': 'ARRAY',
      'check': ['Collection', 'String', 'Variable', 'Enumerate']
    },
    {
      'type': 'input_statement',
      'name': 'EXECUTE',
      'check': ['Statement', 'Control_Statement', 'Function']
    },
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement', 'Function']
}

// range
const pyRange = {
  'message0': 'range(%1%2%3)',
  'colour': '%{BKY_LOGIC_HUE}',
  'args0': [
    {
      'type': 'input_dummy',
      'name': 'start_locator'
    },
    {
      'type': 'input_value',
      'name': 'STOP',
      'check': ['Number', 'Variable', 'Integer', 'Float']
    },
    {
      'type': 'input_dummy',
      'name': 'step_locator'
    }
  ],
  'output': ['Collection'],
  'inputsInline': true,
  'tooltip': 'Returns a sequence of numbers from 0 to the given value stepping 1 each time. Optional parameter of Start and Step to define a different start and step value for the sequence.',
  'mutator': 'range_python'
};

Blockly.Blocks['range_func'] = {
  init: function() {
    this.jsonInit(pyRange);
  },  
  customContextMenu: function(options) {
    var block = this;
    var option_addStart = {
      enabled: true,
      text: 'Add Start Parameter',
      callback: function() {
        block.addStart_();
        options.push(option_delStart.enabled = true);
      },
    };
    var option_delStart = {
      enabled: true,
      text: 'Remove Start Parameter',
      callback: function() {
        block.delStart_();
      },
    };
    var option_addStep = {
      enabled: true,
      text: 'Add Step Parameter',
      callback: function() {
        block.addStep_();
      },
    };
    var option_delStep = {
      enabled: true,
      text: 'Remove Step Parameter',
      callback: function() {
        block.delStep_();
      },
    };
    options.push(option_addStart, option_delStart, option_addStep, option_delStep);
  },
};

// mutators for adding options to python function
const rangePython = {
  startCount_: 0,
  stepCount_: 0,

  saveExtraState: function() {
    return{
      'startCount': this.startCount_,
      'stepCount': this.stepCount_
    };
  },

  loadExtraState: function(state) {
    this.updateShape_(state['startCount'], state['stepCount']);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('step', this.stepCount_);
    container.setAttribute('start', this.startCount_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const startCount = parseInt(xmlElement.getAttribute('start'), 10);
    const stepCount = parseInt(xmlElement.getAttribute('step'), 10);
    this.updateShape_(startCount, stepCount);
  },

  updateShape_: function(startCount, stepCount) {
    while (this.startCount_ < startCount) {
      this.addStart_();
    };
    while (this.startCount_ > startCount) {
      this.delStart_();
    };
    while (this.stepCount_ < stepCount) {
      this.addStep_();
    };
    while (this.stepCount_ > stepCount) {
      this.delStep_();
    };
  },

  addPart_: function(type) {
    switch(type) {
      case 'start':
        var i = this.startCount_;
        if (i >= 1) {
          break;
        }

        this.startCount_++;
        this.appendValueInput('START')
            .setCheck(['Number', 'Variable', 'Integer', 'Float']);
        this.moveInputBefore('START', 'STOP');
        this.getInput('STOP')
            .appendField(', ', 'START_comma');
        break;
      case 'step':
        var i = this.stepCount_;
        if (i >= 1) {
          break;
        }

        var j = this.startCount_;
        if (j == 0) {
          alert('First add a start parameter');
          break;
        }

        this.stepCount_++;
        this.appendValueInput('STEP')
            .setCheck(['Number', 'Variable', 'Integer', 'Float']);
        this.moveInputBefore('STEP', 'step_locator');
        this.getInput('STEP')
            .appendField(', ', 'STEP_comma');
        break;
    }  
  },

  removePart_: function(type) {
    switch(type) {
      case 'start':
        var i = this.startCount_;
        if (i == 0) {
          break;
        }

        var j = this.stepCount_;
        if (j == 1) {
          alert('First remove step parameter');
          break;
        }

        this.startCount_--;

        this.removeInput('START');
        this.getInput('STOP')
            .removeField('START_comma');
        break;
      case 'step':
        var i = this.stepCount_;

        if (i == 0) {
          break;
        }

        this.stepCount_--;

        this.removeInput('STEP');
        break;
    }
  },

  addStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('start');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delStart_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('start');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addStep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_('step');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delStep_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_('step');
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
};

const pyPass = {
  'type': 'python_pass',
  'message0': 'pass',
  'colour': 180,
  'previousStatement': ['Control_Statement', 'Pass']
}

const pyBreak = {
  'type': 'python_break',
  'message0': 'break',
  'colour': 180,
  'previousStatement': ['Control_Statement']
}

const pyContinue = {
  'type': 'python_continue',
  'message0': 'continue',
  'colour': 180,
  'previousStatement': ['Control_Statement']
}

// functions
const pyFuncDef = {
  'message0': 'def %1(%3%4):\n  %2 \n',
  'style': 'function_blocks',
  'args0': [
    {
      'type': 'field_input',
      'name': 'NAME',
      'text': ''
    },
    {
      'type': 'input_statement',
      'name': 'CONTENTS',
      'check': ['Statement', 'Control_Statement']
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    },
    {
      'type': 'input_dummy',
      'name': 'locator_args'
    }
  ],
  'previousStatement': ['Function', 'Statement'],
  'nextStatement': ['Function', 'Statement'],
  'mutator': 'py_func_def_options',
  'inputsInline': true
}

Blockly.Blocks['python_func_def'] = {
  init: function() {
    this.jsonInit(pyFuncDef);
    this.model = new ObservableProcedureModel(this.workspace, this.getFieldValue('NAME'));
    this.workspace.getProcedureMap().add(this.model);
  },
  getProcedureModel() {
    return this.model;
  },
  isProcedureDef() {
    return true;
  },
  getVarModels() {
    // return varModels here
    return [];
  },
  appendParam(param, index) {
    this.model.insertParameter(param, index);
  },
  deleteParam(index) {
    this.model.deleteParameter(index);
  },
  doProcedureUpdate() {
    this.model.setName(this.getFieldValue('NAME'));
    this.setFieldValue(this.model.getName(), 'NAME');
  },
  // Handle pasting after the procedure name change
  onchange(event) {
    if (event.type === Blockly.Events.BLOCK_CREATE &&
      event.blockId === this.id) {
        this.model.setName(this.getFieldValue('NAME'));
        this.workspace.getProcedureMap().delete(this.model.getId());
        this.workspace.getProcedureMap().add(this.model);
    }
    if (event.type === Blockly.Events.BLOCK_CHANGE &&
        event.blockId === this.id) {
          if (event.name === 'NAME') {
            this.model.setName(this.getFieldValue('NAME'));
          } else if (event.element === 'field') {
            const fieldName = event.name.split(' ');
            if (fieldName[0] ==  'field') {
              const newVal = event.newValue;
              const index = fieldName[1]
              const param = new ObservableParameterModel(this.workspace, newVal);
              this.model.deleteParameter(index);
              this.model.insertParameter(param, index);
            }
          }
          
      this.workspace.getProcedureMap().delete(this.model.getId());
      this.workspace.getProcedureMap().add(this.model);
    }
  },
  destroy: function() { 
    // Insertion markers reference the model of the original block.
    if (this.isInsertionMarker()) return;
    // const callerBlocks = Blockly.Procedures.getCallers(this.model.getName(), this.workspace);
    // for (const block of callerBlocks) {
    //   block.dispose();
    //   this.workspace.addTopBlock(block);
    // }
    this.workspace.getProcedureMap().delete(this.model.getId());
  },
  customContextMenu: function(options) {
    var block = this;
    var option_addArg = {
      enabled: true,
      text: 'Add Parameter',
      callback: function() {
        block.addArg_();
      },
    };
    var option_addDefArg = {
      enabled: true,
      text: 'Add Default Parameter',
      callback: function() {
        block.addDefArg_();
      },
    };
    var option_delArg = {
      enabled: true,
      text: 'Remove Last Parameter',
      callback: function() {
        block.delArg_();
      },
    };
    var option_addMultArg = {
      enabled: true,
      text: 'Add Multiple Argument Parameter',
      callback: function() {
        block.addMultArg_();
      },
    };
    var option_delMultArg = {
      enabled: true,
      text: 'Remove Multiple Argument Parameter',
      callback: function() {
        block.delMultArg_();
      },
    };
    var option_addMultKwarg = {
      enabled: true,
      text: 'Add Multiple Keyword Argument Parameter',
      callback: function() {
        block.addMultKwarg_();
      },
    };
    var option_delMultKwarg = {
      enabled: true,
      text: 'Remove Multiple Keyword Argument Parameter',
      callback: function() {
        block.delMultKwarg_();
      },
    };
    options.push(option_addArg, option_delArg, option_addMultArg, option_delMultArg, option_addMultKwarg, option_delMultKwarg, option_addDefArg);
  },
}

// mutators for adding options to python function
const pyFuncDefOptions = {
  itemCount_: 0,
  label_present_: [],
  args_: false,
  kwargs_: false,

  saveExtraState: function() {
    const state = Object.create(null);

    // for procedure model
    state['procedureId'] = this.model.getId();
    state['name'] = this.model.getName();
    state['parameters'] = this.model.getParameters().map((p) => {
      return {name: p.getName(), id: p.getId()};
    });
    state['createNewModel'] = true;

    // for basic model
    state['itemCount'] = this.itemCount_;
    state['args'] = this.args_;
    state['kwargs'] = this.kwargs_;
  },

  loadExtraState: function(state) {
    const id = state['procedureId']
    const map = this.workspace.getProcedureMap();

    if (map.has(id) && !state['createNewModel']) {
      // Delete the existing model (created in init).
      map.delete(this.model.getId());
      // Grab a reference to the model we're supposed to reference.
      this.model = map.get(id);
      this.doProcedureUpdate();
      return;
    }

    // There is no existing procedure model (we are likely pasting), so
    // generate it from JSON.
    this.model
        .setName(this.getFieldValue('NAME'));
    // for (const [i, param] of state['parameters'].entries()) {
    //   this.model.insertParameter(
    //       i,
    //       new ObservableParameterModel(
    //           this.workspace, param['name'], param['id']));
    // }
    this.doProcedureUpdate(this.itemCount_);

    this.updateShape_(state);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    container.setAttribute('args', this.args_);
    container.setAttribute('kwargs', this.kwargs_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    const targetArg = Boolean(xmlElement.getAttribute('args'));
    const targetKwarg = Boolean(xmlElement.getAttribute('kwargs'));
    const target = {
      itemCount: targetCount,
      args: targetArg,
      kwargs: targetKwarg
    };
    this.updateShape_(target);
  },

  updateShape_: function(state) {
    const targetCount = state['itemCount'];
    const targetArg = state['args'];
    const targetKwarg = state['kwargs'];

    // match the parameters associated with the user generated params for args and kwargs input
    while (this.itemCount_ < targetCount) {
      const type = this.label_present_[this.itemCount_];
      if (type == true)
        this.addDefArg_();
      else {
        this.addArg_();
      };
    };
    while (this.itemCount_ > targetCount) {
      this.delArg_();
    };
    if (targetArg == true) {
      this.addMultArg_();
    };
    if (targetKwarg == true) {
      this.addMultKwarg_();
    };

    // match the parameters associated with the definition block
    // this.matchArgs_();
  },

  addPart_: function(label, content, type) {
    
    // set string counter variables
    let i = this.itemCount_;
    let stri = String(i);

    if ( type == "args" || type == "kwargs" ) {
      if (this.getField('field_' + type)) {
        return;
      } else {
        
        if (type == 'args') {
          this.getInput('locator_args')
            .insertFieldAt(0, label , "args_" + type);
          this.getInput('locator_args')
            .insertFieldAt(1, new Blockly.FieldTextInput(content), "field_" + type);
        } else if (type == 'kwargs') {
          this.getInput('locator_args')
            .appendField( label , "args_" + type);
          this.getInput('locator_args')
            .appendField( new Blockly.FieldTextInput(content), "field_" + type);
        };

        if (i >= 1) {
          if (this.getField('comma_single')) {

          } else {
            this.getInput('locator_args')
              .insertFieldAt(0, ", ", 'comma_single');
          };
          if (this.getField('field_args') && this.getField('field_kwargs')) {
            this.getInput('locator_args')
                .insertFieldAt(3, ", ", 'comma_multi');
          }
        } else {
          if (this.getField('field_args') && this.getField('field_kwargs')) {
            this.getInput('locator_args')
                .insertFieldAt(2, ", ", 'comma_multi');
          }
        };
      };
      if (type == 'args') {
        this.args_ = true;
      };
      if (type == 'kwargs') {
        this.kwargs_ = true;
      };
      return;
    };
    
    if (i == 0) {
      // add input before previously added input
      // move input before previously added input 
      if (this.getField('comma_single')) {

      } else {
        if (this.getField('args_args') || this.getField('args_kwargs')){
          this.getInput('locator_args')
              .insertFieldAt(0, `, `, 'comma_single');
        };
      };

      this.getInput('locator')
          .appendField( new Blockly.FieldVariable(content + stri, null, ['param'], 'param'), "field " + stri);

      if ( type == "default") {
        this.getInput('locator')
            .appendField( " = ", "label" + stri)
            .appendField( new Blockly.FieldTextInput(label) , type + stri);
            this.label_present_[i] = true;
      } else {
        this.label_present_[i] = false;
      };
    } else {
      // move input before previously added input
        this.getInput('locator')
          .appendField(', ', 'comma ' + stri)
          .appendField( new Blockly.FieldVariable(content + stri, null, ['param'], 'param'), "field " + stri);

      if ( type == "default") {
        this.getInput('locator')
            .appendField( " = ", "label" + stri)
            .appendField( new Blockly.FieldTextInput(label) , type + stri);
        this.label_present_[i] = true;
      } else {
        this.label_present_[i] = false;
      };
    };
    if (type == 'default' || type == 'basic') {
      this.appendParam(new ObservableParameterModel(this.workspace, 'my_argument_' + stri), stri)
    }
    // increment count
    this.itemCount_++;
  },

  removePart_: function( type ) {
    if (type == 'args' || type == 'kwargs') {
      if (this.getField('field_' + type)) {
        this.getInput('locator_args')
            .removeField("args_" + type);
        // remove field input and label
        this.getInput('locator_args')
            .removeField("field_" + type);

        // if there is a comma remove it
        if (this.getField('comma_multi')) {
          this.getInput('locator_args')
              .removeField('comma_multi');
        };

        // if there is a starting comma remove it
        if (this.getField('comma_single')) {
          if (this.getField('field_args') || this.getField('field_kwargs')) {

          } else {
            this.getInput('locator_args')
                .removeField('comma_single');
          }
        };
      };
      if (type == 'args') {
        this.args_ = false;
      };
      if (type == 'kwargs') {
        this.kwargs_ = false;
      };
      return
    };

    let i = this.itemCount_ - 1;
    // set string counter variables
    let stri = String(i);

    if (this.getField("field " + stri)) {
      // deletes variable from global list
      const ws = Blockly.getMainWorkspace()
      ws.deleteVariableById(Blockly.Variables.getVariable(ws, null, "my_argument_" + stri, 'param').getId());

      this.deleteParam(stri)
      this.itemCount_--;
      // if label was added to the last argument remove that as well
      if (this.label_present_[i] == true) {
        this.getInput('locator')
            .removeField('default' + stri);
        this.getInput('locator')
            .removeField("label" + stri);
        // remove last item of check array
        this.label_present_[i] == false;
      };

      // remove field input and label
      this.getInput('locator')
          .removeField("field " + stri);
    
      // remove the comma if not first argument
      if ( i >= 1) {
        this.getInput('locator')
            .removeField('comma ' + stri);
      } else if (i == 0 && this.getField('comma_single')) {
        this.getInput('locator_args').removeField('comma_single');
      };
    };
  },

  addArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_(null, "my_argument_", "basic");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("field ");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addDefArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("default_value", "my_argument_", "default");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addMultArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("*", "args", "args");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delMultArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("args");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addMultKwarg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("**", "kwargs", "kwargs");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delMultKwarg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_("kwargs");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pyFuncCall = {
  'message0': '%1(%4%3%2)',
  'style': 'function_blocks',
  'args0': [
    {
      'type': 'field_label',
      'name': 'NAME',
      'text': '%{BKY_UNNAMED_KEY}'
    },
    {
      'type': 'input_dummy',
      'name': 'locator'
    },
    {
      'type': 'input_dummy',
      'name': 'locator_params'
    },
    {
      'type': 'input_dummy',
      'name': 'lplaceholder'
    }
  ],
  'previousStatement': ['Function'],
  'nextStatement': ['Function', 'Statement'],
  'mutator': 'py_func_call_options',
  // stops dummy input from creating a newline
  'inputsInline': true
}

Blockly.Blocks['python_func_call'] = {
  init: function() {
    this.jsonInit(pyFuncCall);
    this.model = new ObservableProcedureModel(this.workspace, Blockly.Procedures.findLegalName(this.getFieldValue('NAME'), this), Blockly.utils.idGenerator.genUid());
    this.workspace.getProcedureMap().add(this.model);
    this.count = 0;
    this.genCount = 0;
  },
  getBlock() {
    return this;
  },
  getProcedureModel() {
    return this.model;
  },
  isProcedureDef() {
    return false;
  },
  getVarModels() {
    // return varModels here
    return [];
  },
  doProcedureUpdate() {
    if (this.getField('NAME')) {
      this.setFieldValue(this.model.getName(), 'NAME');
    }
    const params = this.model.getParameters()
    if (!params) {
      params = this.getProcedureModel()
        .getParameters()
        .map((p) => p.getName());
    }
    // set item count in collection and remove old inputs if it has changed
    const oldCount = this.count;
    const newCount = params.length; 
    const genItems = this.genCount;
    this.count = params.length;
    if (oldCount != newCount) {
      for (let i = 0; i < oldCount; i++) {
        this.removeInput(`ARG${i}`);
      }
      for (let i = 0; i < genItems; i++) {
        if (this.getInput('value_' + (oldCount + i)))
          this.getInput('value_' + (oldCount + i)).name = 'value_' + (newCount + i);
        if ( this.getField("comma " + (oldCount + i))) {
          this.getField("comma " + (oldCount + i)).name = 'comma ' + (newCount + i);
        }
      }
    }
    // comma on custom params on caller block if last param was removed
    if (newCount == 0) {
      if (this.getInput("value_" + (0))) {
        this.getInput("value_" + (0)).removeField("comma " + (0));
      }
    } 

    if (newCount == 1 && oldCount == 0) {
      if (this.getInput("value_" + (1))) {
        this.getInput("value_" + (1)).appendField(", ", "comma " + (1));
      }
    }

    for (const [i, p] of params.entries()) {
      if (!this.getInput(`ARG${i}`)) {
        this.appendValueInput(`ARG${i}`);
        this.moveInputBefore(`ARG${i}`, 'locator_params')
        if (i > 0) {
          this.getInput(`ARG${i}`)
              .appendField(', ', `COMMA${i}`);
        }
      }
    }
  },
  setModel(model) {
    this.model = model;
  },
  setGeneratedItems(items) {
    this.genCount = items;
  },
  setShapeType(shape) {
    this.is_statement_ = shape;
  },
  getCount() {
    return this.count;
  },
  // Handle pasting after the procedure definition has been deleted.
  onchange(event) {
    if (event.type === Blockly.Events.BLOCK_CREATE &&
        event.blockId === this.id) {
      if(!this.model) { // Our procedure definition doesn't exist =(
        this.dispose();
      }
    }
  },
  customContextMenu: function(options) {
    var block = this;
    var option_addArg = {
      enabled: true,
      text: 'Add Parameter',
      callback: function() {
        block.addArg_();
      },
    };
    var option_addKeyArg = {
      enabled: true,
      text: 'Add Keyword Parameter',
      callback: function() {
        block.addKeyArg_();
      },
    };
    var option_delArg = {
      enabled: true,
      text: 'Remove Last Parameter',
      callback: function() {
        block.delArg_();
      },
    };
    var option_expression = {
      enabled: true,
      text: 'Change Block to an Expression',
      callback: function() {
        block.setExpression_();
      }
    };
    var option_statement = {
      enabled: true,
      text: 'Change Block to a Statement',
      callback: function() {
        block.setStatement_();
      }
    };
    options.push(option_addArg, option_addKeyArg, option_delArg, option_expression, option_statement);
  },
}

// mutators for adding options to python function
const pyFuncCallOptions = {
  itemCount_: 0,
  label_present_: [],
  is_statement_: false,

  saveExtraState: function() {
    this.model = this.getProcedureModel();
    const state = Object.create(null);
    state['itemCount'] = this.itemCount_;
    state['procedureId'] = this.model.getId();
    state['isStatement'] = this.is_statement_;
    return state;
  },

  loadExtraState: function(state) {
    // Delete our existing model (created in init).
    const oldModel = this.getProcedureModel();
    if (oldModel.getId()) {
      this.workspace.getProcedureMap().delete(oldModel.getId());
    }

    // Grab a reference to the new model.
    const ws = Blockly.getMainWorkspace();
    const model = ws.getProcedureMap().get(state['procedureId']);
    this.setModel(model);
    if (model) this.doProcedureUpdate();
    this.model_ = model;
    this.updateShape_(state);
  },

  mutationToDom: function () {
    const container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    container.setAttribute('isStatement', this.is_statement_);
    return container;
  },

  /**
   * Parses XML to restore the text inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this {Blockly.Block}
   */
  domToMutation: function (xmlElement) {
    const targetCount = parseInt(xmlElement.getAttribute('items'), 10);
    const isStatement = Boolean(xmlElement.getAttribute('isStatement'));
    const target = {
      itemCount: targetCount,
      isStatement: isStatement
    };
    this.updateShape_(target);
  },

  updateShape_: function(state) {
    const targetCount = state['itemCount'];
    const isStatement = state['isStatement'];

    // match the parameters associated with the user generated params for args and kwargs input
    while (this.itemCount_ < targetCount) {
      const type = this.label_present_[this.itemCount_];
      if (type == true)
        this.addKeyArg_();
      else {
        this.addArg_();
      };
    };
    while (this.itemCount_ > targetCount) {
      this.delArg_();
    };

    if (isStatement == true) {
      this.setOutput(false);
      this.setPreviousStatement(true);
      this.setNextStatement(true);
    } else {
      this.setPreviousStatement(false);
      this.setNextStatement(false);
      this.setOutput(true);
    }

    // match the parameters associated with the definition block
    // this.matchArgs_();
  },

  addPart_: function(type) {
    
    // set string counter variables
    const i = this.itemCount_;
    const inheritedCount = this.getCount();
    const stri = String(i + inheritedCount);
    
    if (i + inheritedCount == 0) {
      this.appendValueInput("value_" + stri);
      this.moveInputBefore("value_" + stri, "locator")
      // this.getInput('locator')
      //     .appendField(new Blockly.FieldVariable("my_argument_" + stri), "field " + stri);

      if ( type == "keyword") {
        this.getInput("value_" + stri)
            .appendField( " = ", "label" + stri)
        this.appendValueInput(type + stri)
        this.moveInputBefore(type + stri, "value_" + stri)
        this.label_present_[i] == true;
      } else {
        this.label_present_[i] == false;
      };
    } else {
      // move input before previously added input
      this.appendValueInput("value_" + stri);
      this.moveInputBefore("value_" + stri, "locator");

      if ( type == "keyword") {
        this.appendValueInput(type + stri);
        this.moveInputBefore(type + stri, "value_" + stri);
        this.getInput("value_" + stri)
            .appendField( " = ", "label" + stri);
        this.getInput(type + stri)
            .appendField(', ', 'comma ' + stri);
        this.label_present_[i] == true;
      } else {
        this.getInput("value_" + stri)
            .appendField(', ', 'comma ' + stri);
        this.label_present_[i] == false;
      };
    };
    // increment count
    this.itemCount_++;
    this.setGeneratedItems(this.itemCount_);
  },

  removePart_: function() {
    let i = this.itemCount_ - 1;
    this.setGeneratedItems(i);
    // set string counter variables
    const inheritedCount = this.getCount();
    const stri = String(i + inheritedCount);

    if (this.getInput("value_" + stri)) {

      this.itemCount_--;
      // if label was added to the last argument remove that as well
      if (this.getInput("keyword" + stri)) {
        this.removeInput("keyword" + stri)
        // remove last item of check array
        this.label_present_[i] == false;
      };

      // remove field input and label
      this.removeInput('value_' + stri)
    }
  },

  setShape_: function(shape) {
    let is_statement;

    if (shape == 'expression'){
      is_statement = false;
    } else if (shape == 'statement'){
      is_statement = true;
    };
    
    this.setShapeType(is_statement);
    this.updateShape_({'itemCount': this.itemCount_, 'isStatement': is_statement});
  },

  addArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("basic");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  delArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.removePart_();
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  addKeyArg_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.addPart_("keyword");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  setExpression_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.setShape_("expression");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },

  setStatement_: function() {
    Blockly.Events.setGroup(true);
    const oldExtraState = getExtraBlockState(this);
    this.setShape_("statement");
    const newExtraState = getExtraBlockState(this);

    if (oldExtraState != newExtraState) {
      Blockly.Events.fire(
        new Blockly.Events.BlockChange(
          this,
          'mutation',
          null,
          oldExtraState,
          newExtraState,
        ),
      );
    }
    Blockly.Events.setGroup(false);
  },
}

const pyReturn = {
  'type': 'python_return',
  'message0': 'return %1',
  'style': 'function_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE',
      'check': null
    },
  ],
  'previousStatement': ['Statement'],
  'inputsInline': true
}

const pyYield = {
  'type': 'python_yield',
  'message0': 'yield %1',
  'style': 'function_blocks',
  'args0': [
    {
      'type': 'input_value',
      'name': 'VALUE',
      'check': null
    },
  ],
  'previousStatement': ['Statement'],
  'nextStatement': ['Statement'],
  'inputsInline': true
}

// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray(
    [pyString, pyStringSpeech, pyStringMultiline, pyUpper, pyLower, pyTitle, pyCapitalize, pyJoin, pySplit, pyConcat, pyStringMultiply, pyInt, pyComplexPlus, pyComplexMinus, pyFloat, pyScientific, pyOperator, powFunc, pyRelational, pyLogical, pyIs, pyNot, pyBitwise, pyIncrement, python_print, varGet, varGetParam, varSet, pyIf, pyElse, pyElif, pyWhile, pyFor, pyPass, pyBreak, pyContinue, pyBool, pyList, pyTuple, pySet, pyDictionary, pyDictFunc, pyConcatLists, pyReplicationLists, pyMembershipLists, pyRelationalLists, pyKeys, pyValues, pyItems, pyFuncDef, pyFuncCall, pyReturn, pyAbs, pyAll, pyAny, pyEvalFunc, pyEnumFunc, pyFrozenFunc, pyListFunc, pySetFunc, sortedFunc, pySum, pyTypeFunc, pyBoolFunc, pyChrFunc, pyFloatFunc, pyComplexFunc, pyIntFunc, pyLen, pyMax, pyMin, pyRange, pyStrFunc, pyInput, pyYield, pySlice, pyAppend]);

// Register Mutators
Blockly.Extensions.registerMutator(
  'pyDataType_mutator',
  pyDataTypeMutator
);

Blockly.Extensions.registerMutator(
  'pyDictionary_mutator',
  pyDictionary_mutator
);

Blockly.Extensions.registerMutator(
  'dictFuncMutator',
  dictFuncMutator
);

// Register Mutators
Blockly.Extensions.registerMutator(
  'pySet_mutator',
  pySetMutator
);

Blockly.Extensions.registerMutator(
  'py_func_def_options',
  pyFuncDefOptions
);

Blockly.Extensions.registerMutator(
  'py_func_call_options',
  pyFuncCallOptions
);

Blockly.Extensions.registerMutator(
  'print_python',
  printPython
);

Blockly.Extensions.registerMutator(
  'enum_python',
  enumPython
);

Blockly.Extensions.registerMutator(
  'pow_python',
  powPython
);

Blockly.Extensions.registerMutator(
  'sorted_python',
  sortedPython
);

Blockly.Extensions.registerMutator(
  'int_python',
  intPython
);

Blockly.Extensions.registerMutator(
  'complex_python',
  complexPython
);

Blockly.Extensions.registerMutator(
  'range_python',
  rangePython
);

Blockly.Extensions.registerMutator(
  'slice_python',
  slicePython
);

Blockly.Extensions.registerMutator(
  'set_func_mutator',
  setFuncMutator
);

Blockly.Extensions.registerMutator(
  'listMutator',
  listMutator
);

Blockly.Extensions.registerMutator(
  'split_mutator',
  splitMutator
);