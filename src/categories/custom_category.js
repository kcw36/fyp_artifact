import * as Blockly from 'blockly';

class CustomCategory extends Blockly.ToolboxCategory {
    constructor(categoryDef, toolbox, opt_parent) {
        super(categoryDef, toolbox, opt_parent);
    }
    
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    CustomCategory,
    true,
  );
