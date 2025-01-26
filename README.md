# Block Programming with Python Syntax

## Purpose

This app is built upon Blockly framework and libraries to deliver a Block Based coding environement with Python Syntax. The purpose of this application is to help with education of young and new learners who want to move to something more advanced than a traditional pseudo code based block prgramming tool but are not ready for a fully fledged integrated development environment.

## Installation

1. [Install](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) npm if you haven't before.
2. Run `git clone https://github.com/kcw36/fyp_artifact.git` to clone this repository
3. Run `npm install` to install and update the required dependencies.
4. Open `dist/index.html` to run the app

## Development

1. Run `npm run start` to run the development server and see the app in action.
2. If you make any changes to the source code, just refresh the browser while the server is running to see them.
3. There is caching in the application using the browser that you deploy the app to. If the development causes the application to break and it won't reset upon a fix clear your browser cache and this will solve the issue.

## Production

1. Navigate to the `dist` subdirectory inside is three files:
    1. `bundle.js` -> Bundled production code produced by webpack
    2. `bundle.js.LICENSE.txt` -> License information produced by webpack
    3. `index.html` -> Html skeleton acts as entry point for app into hsoting solution
2. For local hosting open `index.html`
3. For web hosting clone this subdirectory into the your hosting solution

## Webpack Serving

To run your app locally, run `npm run start` to run the development server.

To deploy your app so that others can use it, run `npm run build` to run a production build. This will bundle your code and minify it to reduce its size to the `dist` subdirectory.

## Structure

- `package.json` contains basic information about the app. This is where the scripts to run, build, etc. are listed.
- `package-lock.json` is used by npm to manage dependencies.
- `webpack.config.js` is the configuration for webpack.
- `src/` contains the rest of the source code.
```
    ├───blocks
    ├───categories
    ├───generators
    ├───renderers
    ├───serializers
    ├───skulpt
    ├───themes
    ├───toolboxes
    ├───index.css
    ├───index.html
    └───index.js
```
- `dist/` contains the packaged output.

### Source Code

- `index.html` contains the skeleton HTML for the page. This file is modified during the build to import the bundled source code output by webpack.
- `index.js` is the entry point of the app. It configures Blockly and sets up the page to show the blocks, the generated code, and the output of running the code in JavaScript.
- `blocks/pyBlocks.js` has JSON definitons for all project blocks. More complex blocks also use JavaScript functions. If ocnfused on what a block does look at the `message0` property in the JSON definition.
- `categories/custom_category.js` has skeleton for extending the category module in Blockly.
- `generators/blocks.js` contains the block to code generators for each project block.
- `generators/python.js` contains the extension of Python generator class form Blockly.
- `serializers/serialization.js` has code to save and load the workspace using the browser's local storage.
- `skulpt` contains the Skulpt module for executing the Python code in JavaScript. Two file versions for minimised and standard library.
- `themes/custom_themes.js` contains custom themes and colour stylings used in this project.
- `toolboxes/pyToolbox.js` contains the toolbox definition for the app. Contains all custom blocks added for this project.
