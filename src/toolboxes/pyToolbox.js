export const toolbox = {
  'kind': 'categoryToolbox',
  'contents': [
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Variables',
      'categoryStyle': 'variable_category',
      'custom': 'var_category'
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Functions',
      'categoryStyle': 'functions_category',
      'custom': 'func_category'
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Number',
      'categoryStyle': 'math_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Types',
          'categoryStyle': 'math_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_int',
              'fields': {
                'VALUE': 123
              }
            },
            {
              'kind': 'block',
              'type': 'python_float',
              'fields': {
                'VALUE': 123.123
              }
            },
            {
              'kind': 'block',
              'type': 'python_scientific',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_float',
                    'fields': {
                      'VALUE': 78.9,
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 10
                    }
                  }
                },
              }
            },
            {
              'kind': 'block',
              'type': 'python_complexPlus',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
              }
            },
            {
              'kind': 'block',
              'type': 'python_complexMinus',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 2
                    }
                  }
                },
              }
            },
          ]
        },
        {
          'kind': 'category',
          'name': 'Number Operations',
          'categoryStyle': 'math_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'py_operator',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
              }
            },
            {
              'kind': 'block',
              'type': 'python_increment',
              'inputs': {
                'INCREMENT': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                },
              }
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Built-In Functions',
          'categoryStyle': 'math_category',
          'contents': [
          {
            'kind': 'block',
            'type': 'python_abs'
          },
          {
            'kind': 'block',
            'type': 'pow_func',
            'inputs': {
              'INPUT_X': {
                'shadow': {
                  'type': 'python_int',
                  'fields': {
                    'VALUE': 2
                  }
                }
              },
              'INPUT_Y': {
                'shadow': {
                  'type': 'python_int',
                  'fields': {
                    'VALUE': 4
                  }
                }
              },
            }
          }],
        },
      ]
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Boolean',
      'categoryStyle': 'bool_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Values',
          'categoryStyle': 'bool_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_boolean'
            },
            {
              'kind': 'block',
              'type': 'python_boolean',
              'fields': {
                'FIELD': 'False'
              }
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Keywords',
          'categoryStyle': 'bool_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_not'
            },
            {
              'kind': 'block',
              'type': 'python_logical'
            },
            {
              'kind': 'block',
              'type': 'python_is'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Operators',
          'categoryStyle': 'bool_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_relational'
            },
            {
              'kind': 'block',
              'type': 'python_bitwise'
            }
          ]
        },
      ]
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Collections',
      'categoryStyle': 'datatypes_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Types',
          'categoryStyle': 'datatypes_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_list'
            },
            {
              'kind': 'block',
              'type': 'python_tuple'
            },
            {
              'kind': 'block',
              'type': 'python_dictionary'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Collection Operations',
          'categoryStyle': 'datatypes_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'slice_func',
              'inputs': {
                'STOP': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 8
                    }
                  }
                }
              }
            },
            {
              'kind': 'block',
              'type': 'pyConcatLists'
            },
            {
              'kind': 'block',
              'type': 'pyReplicationLists',
              'inputs': {
                'INT': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 3,
                    }
                  }
                },
              }
            },
            {
              'kind': 'block',
              'type': 'pyMembershipLists'
            },
            {
              'kind': 'block',
              'type': 'pyRelationalLists'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Dictionary Methods',
          'categoryStyle': 'datatypes_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'pyKeys'
            },
            {
              'kind': 'block',
              'type': 'pyValues'
            },
            {
              'kind': 'block',
              'type': 'pyItems'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Built-In Functions',
          'categoryStyle': 'datatypes_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_any'
            },
            {
              'kind': 'block',
              'type': 'python_all'
            },
            {
              'kind': 'block',
              'type': 'pyAppend'
            },
            {
              'kind': 'block',
              'type': 'enum_func'
            },
            {
              'kind': 'block',
              'type': 'frozen_func'
            },
            {
              'kind': 'block',
              'type': 'python_len'
            },
            {
              'kind': 'block',
              'type': 'max_func'
            },
            {
              'kind': 'block',
              'type': 'min_func'
            },
            {
              'kind': 'block',
              'type': 'sorted_func'
            },
            {
              'kind': 'block',
              'type': 'sum_func'
            }
          ]
        }
      ],
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Strings',
      'categoryStyle': 'procedure_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Types',
          'categoryStyle': 'procedure_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_string'
            },
            {
              'kind': 'block',
              'type': 'python_stringSpeech'
            },
            {
              'kind': 'block',
              'type': 'python_stringMulti'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'String Operations',
          'categoryStyle': 'procedure_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'py_concat',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_string',
                    'fields': {
                      'VALUE': 'hello'
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_string',
                    'fields': {
                      'VALUE': 'world'
                    }
                  }
                }
              }
            },
            {
              'kind': 'block',
              'type': 'py_stringMultiply',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_string',
                    'fields': {
                      'VALUE': 'hello'
                    }
                  }
                },
                'VALUE2': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 1
                    }
                  }
                }
              }
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'String Methods',
          'categoryStyle': 'procedure_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'pyUpper'
            },
            {
              'kind': 'block',
              'type': 'pyLower'
            },
            {
              'kind': 'block',
              'type': 'pyTitle'
            },
            {
              'kind': 'block',
              'type': 'pyCapitalize'
            },
            {
              'kind': 'block',
              'type': 'pyJoin',
              'inputs': {
                'VALUE1': {
                  'shadow': {
                    'type': 'python_string',
                    'fields': {
                      'VALUE': ', '
                    }
                  }
                }
              }
            },
            {
              'kind': 'block',
              'type': 'pySplit'
            }
          ]
        },
      ]
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Input/Output',
      'categoryStyle': 'io_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Input',
          'categoryStyle': 'io_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'type_func'
            },
            {
              'kind': 'block',
              'type': 'input_func'
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Output',
          'categoryStyle': 'io_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_print'
            },
            // not yet supported in Skulpt
            // {
            //   'kind': 'block',
            //   'type': 'eval_func'
            // }
          ]
        },
        {
          'kind': 'category',
          'name': 'Conversion',
          'categoryStyle': 'io_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'bool_func'
            },
            {
              'kind': 'block',
              'type': 'chr_func'
            },
            {
              'kind': 'block',
              'type': 'pyStrFunc'
            },
            {
              'kind': 'block',
              'type': 'complex_func'
            },
            {
              'kind': 'block',
              'type': 'float_func'
            },
            {
              'kind': 'block',
              'type': 'int_func'
            },
            {
              'kind': 'block',
              'type': 'pyDictFunc'
            },
            {
              'kind': 'block',
              'type': 'list_func'
            },
            {
              'kind': 'block',
              'type': 'set_func'
            }
          ]
        }
      ]
    },
    {
      'kind': 'sep'
    },
    {
      'kind': 'category',
      'name': 'Control',
      'categoryStyle': 'logic_category',
      'contents': [
        {
          'kind': 'category',
          'name': 'Conditionals',
          'categoryStyle': 'logic_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_if',
              'inputs': {
                'CONDITION': {
                  'shadow': {
                    'type': 'python_relational',
                    'inputs': {
                      'VALUE1': {
                        'shadow': {
                        'type': 'var_get',
                        'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
                        'variableTypes': ['Variable']
                        }
                      },
                      'VALUE2': {
                        'shadow': {
                          'type': 'python_boolean',
                          'fields': {
                            'FIELD': 'True'
                          }
                        }
                      }
                    },
                    'fields': {
                      'OPERATOR': '=='
                    }
                  } 
                }
              }
            },
            {
              'kind': 'block',
              'type': 'python_else'
            },
            {
              'kind': 'block',
              'type': 'python_elif',
              'inputs': {
                'CONDITION': {
                  'shadow': {
                    'type': 'python_relational',
                    'inputs': {
                      'VALUE1': {
                        'shadow': {
                        'type': 'var_get',
                        'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
                        'variableTypes': ['Variable']
                        }
                      },
                      'VALUE2': {
                        'shadow': {
                          'type': 'python_boolean',
                          'fields': {
                            'FIELD': 'True'
                          }
                        }
                      }
                    },
                    'fields': {
                      'OPERATOR': '!='
                    }
                  } 
                }
              }
            },
          ]
        },
        {
          'kind': 'category',
          'name': 'Loops',
          'categoryStyle': 'logic_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_while',
              'inputs': {
                'VARIABLE': {
                  'shadow': {
                    'type': 'python_relational',
                    'inputs': {
                      'VALUE1': {
                        'shadow': {
                        'type': 'var_get',
                        'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
                        'variableTypes': ['Variable']
                        }
                      },
                      'VALUE2': {
                        'shadow': {
                          'type': 'python_int',
                          'fields': {
                            'VALUE': 0
                          }
                        }
                      }
                    },
                    'fields': {
                      'OPERATOR': '>'
                    }
                  }
                }
              }
            },
            {
              'kind': 'block',
              'type': 'python_for',
              'inputs': {
                'VARIABLE': {
                  'shadow': {
                    'type': 'var_get',
                    'variable': '%{BKY_VARIABLES_DEFAULT_NAME}',
                    'variableTypes': ['Variable']
                  }
                },
                'ARRAY': {
                  'shadow': {
                    'type': 'range_func',
                    'inputs': {
                      'STOP': {
                        'shadow': {
                          'type': 'python_int',
                          'fields': {
                            'VALUE': 123
                          }
                        }
                      }
                    }
                  },
                }
              }
            },
            {
              'kind': 'block',
              'type': 'range_func',
              'inputs': {
                'STOP': {
                  'shadow': {
                    'type': 'python_int',
                    'fields': {
                      'VALUE': 123
                    }
                  }
                }
              }
            }
          ]
        },
        {
          'kind': 'category',
          'name': 'Keywords',
          'categoryStyle': 'logic_category',
          'contents': [
            {
              'kind': 'block',
              'type': 'python_pass'
            },
            {
              'kind': 'block',
              'type': 'python_break'
            },
            {
              'kind': 'block',
              'type': 'python_continue'
            }
          ]
        },
      ]
    },
    {
      'kind': 'sep'
    }
  ]
};
