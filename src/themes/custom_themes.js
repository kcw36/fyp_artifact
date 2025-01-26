import * as Blockly from 'blockly/core';

// defines new theme pyTheme
Blockly.Themes.Python = Blockly.Theme.defineTheme('pyTheme', {
    'base':Blockly.Themes.Classic,
    'componentStyles': {
      'toolboxBackgroundColour': '#643B9F',
      'toolboxForegroundColour': '#fff',
      'flyoutBackgroundColour': '#AC94F4',
      'flyoutForegroundColour': '#ccc',
      'flyoutOpacity': 1,
      'scrollbarColour': '#643B9F',
      'insertionMarkerColour': '#fff',
      'insertionMarkerOpacity': 0.3,
      'scrollbarOpacity': 0.4,
      'cursorColour': '#d0d0d0',
      'blackBackground': '#333'
    },
    // category styles to replace category colours
    'categoryStyles': {
        'class_category': {
            'colour': '#FFA500'
        },
        'datatypes_category': {
            'colour': '#EDAB5A'
        },
        'control_keywords': {
          'colour': 180
        },
        'functions_category': {
          'colour': '#00c04b'
        },
        'bool_category': {
          'colour': '#800080'
        },
        'io_category': {
          'colour': '#ff85c1'
        }
    },
    // block styles to replace block colours
    'blockStyles': {
      'logic_blocks': {
        'colourPrimary': '%{BKY_MATH_HUE}'
      },
      'function_blocks': {
        'colourPrimary': '#00c04b'
      },
      'datatypes_style': {
        'colourPrimary': '#EDAB5A'
      },
      'bool_blocks': {
        'colourPrimary': '#800080'
      },
      'io_blocks': {
          'colourPrimary': '#ff85c1'
      }
    },
    'fontStyle':
    {
      'family': 'Monospace',
      'size': 12
    }
  })