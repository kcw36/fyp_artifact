import * as Blockly from 'blockly';
import {blocks} from './blocks/pyBlocks';
import {forBlock} from './generators/blocks';
import {customGenerator} from './generators/python';
import {save, load} from './serializers/serialization';
import {toolbox} from './toolboxes/pyToolbox';
import Sk from './skulpt/skulpt.min';
import './skulpt/skulpt-stdlib';
import './index.css';
import './renderers/custom_renderer.js';
import './themes/custom_themes.js';
import './categories/custom_category.js';

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);
Object.assign(customGenerator.forBlock, forBlock);

// Set up UI elements and inject Blockly
const codeDiv = document.getElementById('generatedCode').firstChild;
// output div and button selection
const blocklyDiv = document.getElementById('blocklyDiv');
const outputBtn = document.getElementById('outputButton');
const outputDiv = document.getElementById('output');

const ws = Blockly.inject(blocklyDiv, {
  renderer: 'custom_renderer',
  toolbox,
  theme: Blockly.Themes.Python,
  grid:{
    spacing: 20,
    length: 3,
    colour: '#ccc',
    snap: true  
    } 
});

// Returns an array of JSON variable blocks.
var fillVariables = function(ws) {
  let blockList = [];

  blockList.push({
    'kind': 'button',
    'text': 'Create Variable',
    'callbackKey': 'create_variable_button'
  })

  // This gets all the variables that the user creates and adds them to the
  // flyout.
  const mainWorkspace =  Blockly.getMainWorkspace();
  const varBlocks = mainWorkspace.getAllVariables();

  for (let i = 0; i<varBlocks.length; i++) {
    if (varBlocks[i].type == 'Variable') {
      blockList.push({
        'kind': 'block',
        'type': 'var_set',
        'fields': {
          'FIELDNAME' : {
            'id': varBlocks[i].getId()
          }
        }
      });
      blockList.push({
        'kind': 'block',
        'type': 'var_get',
        'fields': {
          'FIELDNAME' : {
            'id': varBlocks[i].getId()
          }
        }
      });
    } else if (varBlocks[i].type == 'param') {
      continue;
    } else if (varBlocks[i].type){
      blockList.push({
        'kind': 'block',
        'type': 'var_get_' + varBlocks[i].type.toLowerCase(),
        'fields': {
          'FIELDNAME' : {
            'id': varBlocks[i].getId()
          }
        }
      });
    }
  }

  return blockList;
};

// Returns an array of function blocks.
var fillFunctions = function(ws) {
  let blockList = [];

  // This gets all the variables that the user creates and adds them to the
  // flyout.
  const mainWorkspace =  Blockly.getMainWorkspace();
  const varBlocks = mainWorkspace.getVariablesOfType('param');
  blockList.push({
    'kind': 'block',
    'type': 'python_func_def',
    'fields': {
      'NAME': 'my_function',
    }
  });
  // using procedure map generate matching call blocks
  for (const model of mainWorkspace.getProcedureMap().getProcedures()) {
    
    blockList.push({
      'kind': 'block',
      'type': 'python_func_call',
      'fields': {
        'NAME': model.getName(),
      },
      'extraState': {
        'itemCount': 0,
        'isStatement': false,
        'procedureId' : model.getId(),
      }
    });
  }

  // provide return block
  blockList.push({
    'kind': 'block',
    'type': 'python_return'
  })

  // provide yield block
  blockList.push({
    'kind': 'block',
    'type': 'python_yield'
  })

  // generate function parameter blocks
  for (let i = 0; i<varBlocks.length; i++) {
    if (varBlocks[i].type == 'param') {
      blockList.push({
        'kind': 'block',
        'type': 'var_get_param',
        'fields': {
          'FIELDNAME' : {
            'id': varBlocks[i].getId()
          }
        },
      });
    }
  }
  
  return blockList;
};

// register functions with their associated buttons
var createVariable = function(button) {
  Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, 'Variable');
};

// register callbacks with a toolbox category
ws.registerToolboxCategoryCallback(
  'var_category', fillVariables
);
ws.registerToolboxCategoryCallback(
  'func_category', fillFunctions
);

// Register callback functions with their associated functions
ws.registerButtonCallback(
  'create_variable_button', createVariable
);

// This function resets the code and output divs, shows the
// generated code from the workspace, and evals the code.
// In a real application, you probably shouldn't use `eval`.
export const runCode = () => {
  const pythonCode = customGenerator.workspaceToCode(ws);
  if (!pythonCode) {
    codeDiv.innerText = "Generated Code Will Appear Here:\n" + pythonCode;
    outputDiv.innerText = "Executed Code Will Appear Here:";
    return;
  }
  codeDiv.innerText = pythonCode;
};

// output button 
outputBtn.onclick = (event) => {
  var prog = customGenerator.workspaceToCode(ws);
  outputDiv.innerText = "";

  // empty the code output pane if the generation pane is empty
  if (!prog) {
    outputDiv.innerText = "Executed Code Will Appear Here:";
    return;
  }

  // on filled generation pane trigger skulpt to generate executed code for output
  Sk.configure({
    output: function(text) { outputDiv.innerText += text; },
    read: function(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }
  });

  Sk.misceval.asyncToPromise(function() {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
  }).then(function(mod) {
      console.log('Program execution completed successfully');
  }).catch(function(err) {
    outputDiv.textContent = err.toString();
  });
}

// Load the initial state from storage and run the code.
load(ws);
runCode();

// Every time the workspace changes state, save the changes to storage.
ws.addChangeListener((e) => {
  // UI events are things like scrolling, zooming, etc.
  // No need to save after one of these.
  if (e.isUiEvent) return;
  save(ws);
});

// Whenever the workspace changes meaningfully, run the code again.
ws.addChangeListener((e) => {
  // Don't run the code when the workspace finishes loading; we're
  // already running it once when the application starts.
  // Don't run the code during drags; we might have invalid state.
  if (e.isUiEvent || e.type == Blockly.Events.FINISHED_LOADING ||
    ws.isDragging()) {
    return;
  }
  runCode();
});
