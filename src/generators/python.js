import * as Blockly from 'blockly';
import {PythonGenerator} from 'blockly/python';

/**
 * @override
 * extends the python generator maintained by blockly that extends the simple codeGenerator class
 */
class testGenerator extends PythonGenerator {
    /**
     * @override
     */
    constructor(name = 'Python') {
        super(name);
    }

    /**
     * @overide
     * finish the code generation
     * does not add variable global declerations like base generator
     */
    finish(code) {
        // Convert the definitions dictionary into a list.
        const imports = [];
        const definitions = [];
        for (let name in this.definitions_) {
        const def = this.definitions_[name];
        if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
            imports.push(def);
        } else {
            definitions.push(def);
        }
        }
        // Call Blockly.CodeGenerator's finish.
        const genny = new Blockly.CodeGenerator('test')
        code = genny.finish(code);
        this.isInitialized = false;

        this.nameDB_.reset();
        const allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
        return  code;
    }
}

export const customGenerator = new testGenerator('python');
