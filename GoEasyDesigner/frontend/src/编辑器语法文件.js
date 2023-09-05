// Difficulty: "Moderate"
// This is the JavaScript tokenizer that is actually used to highlight
// all code in the syntax definition editor and the documentation!
//
// This definition takes special care to highlight regular
// expressions correctly, which is convenient when writing
// syntax highlighter specifications.
export default {
    // Set defaultToken to invalid to see what you do not tokenize yet
    defaultToken: 'invalid',
    tokenPostfix: '.js',

    keywords: [
        'break', 'case', 'catch', 'class', 'continue', 'const',
        'constructor', 'debugger', 'default', 'delete', 'do', 'else',
        'export', 'extends', 'false', 'finally', 'for', 'from', 'function',
        'get', 'if', 'import', 'in', 'instanceof', 'let', 'new', 'null',
        'return', 'set', 'super', 'switch', 'symbol', 't// Difficulty: "Moderate"\n' +
        '// This is the JavaScript tokenizer that is actually used to highlight\n' +
        '// all code in the syntax definition editor and the documentation!\n' +
        '//\n' +
        '// This definition takes special care to highlight regular\n' +
        '// expressions correctly, which is convenient when writing\n' +
        '// syntax highlighter specifications.\n' +
        'return {\n' +
        '    // Set defaultToken to invalid to see what you do not tokenize yet\n' +
        '    defaultToken: \'invalid\',\n' +
        '    tokenPostfix: \'.js\',\n' +
        '\n' +
        '    keywords: [\n' +
        '        \'break\', \'case\', \'catch\', \'class\', \'continue\', \'const\',\n' +
        '        \'constructor\', \'debugger\', \'default\', \'delete\', \'do\', \'else\',\n' +
        '        \'export\', \'extends\', \'false\', \'finally\', \'for\', \'from\', \'function\',\n' +
        '        \'get\', \'if\', \'import\', \'in\', \'instanceof\', \'let\', \'new\', \'null\',\n' +
        '        \'return\', \'set\', \'super\', \'switch\', \'symbol\', \'this\', \'throw\', \'true\',\n' +
        '        \'try\', \'typeof\', \'undefined\', \'var\', \'void\', \'while\', \'with\', \'yield\',\n' +
        '        \'async\', \'await\', \'of\'\n' +
        '    ],\n' +
        '\n' +
        '    typeKeywords: [\n' +
        '        \'any\', \'boolean\', \'number\', \'object\', \'string\', \'undefined\'\n' +
        '    ],\n' +
        '\n' +
        '    operators: [\n' +
        '        \'<=\', \'>=\', \'==\', \'!=\', \'===\', \'!==\', \'=>\', \'+\', \'-\', \'**\',\n' +
        '        \'*\', \'/\', \'%\', \'++\', \'--\', \'<<\', \'</\', \'>>\', \'>>>\', \'&\',\n' +
        '        \'|\', \'^\', \'!\', \'~\', \'&&\', \'||\', \'?\', \':\', \'=\', \'+=\', \'-=\',\n' +
        '        \'*=\', \'**=\', \'/=\', \'%=\', \'<<=\', \'>>=\', \'>>>=\', \'&=\', \'|=\',\n' +
        '        \'^=\', \'@\',\n' +
        '    ],\n' +
        '\n' +
        '    // we include these common regular expressions\n' +
        '    symbols: /[=><!~?:&|+\\-*\\/\\^%]+/,\n' +
        '    escapes: /\\\\(?:[abfnrtv\\\\"\']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,\n' +
        '    digits: /\\d+(_+\\d+)*/,\n' +
        '    octaldigits: /[0-7]+(_+[0-7]+)*/,\n' +
        '    binarydigits: /[0-1]+(_+[0-1]+)*/,\n' +
        '    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,\n' +
        '\n' +
        '    regexpctl: /[(){}\\[\\]\\$\\^|\\-*+?\\.]/,\n' +
        '    regexpesc: /\\\\(?:[bBdDfnrstvwWn0\\\\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,\n' +
        '\n' +
        '    // The main tokenizer for our languages\n' +
        '    tokenizer: {\n' +
        '        root: [\n' +
        '            [/[{}]/, \'delimiter.bracket\'],\n' +
        '            { include: \'common\' }\n' +
        '        ],\n' +
        '\n' +
        '        common: [\n' +
        '            [/[\u4e00-\u9fa5\\w$][\u4e00-\u9fa5\\w$]*/, {\n' +
        '                cases: {\n' +
        '                    \'@typeKeywords\': \'keyword\',\n' +
        '                    \'@keywords\': \'keyword\',\n' +
        '                    \'@default\': \'identifier\'\n' +
        '                }\n' +
        '            }],\n' +
        '            // identifiers and keywords\n' +
        '            [/[a-z_$][\\w$]*/, {\n' +
        '                cases: {\n' +
        '                    \'@typeKeywords\': \'keyword\',\n' +
        '                    \'@keywords\': \'keyword\',\n' +
        '                    \'@default\': \'identifier\'\n' +
        '                }\n' +
        '            }],\n' +
        '            [/[A-Z][\\w\\$]*/, \'type.identifier\'],  // to show class names nicely\n' +
        '            // [/[A-Z][\\w\\$]*/, \'identifier\'],\n' +
        '\n' +
        '            // whitespace\n' +
        '            { include: \'@whitespace\' },\n' +
        '\n' +
        '            // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)\n' +
        '            [/\\/(?=([^\\\\\\/]|\\\\.)+\\/([gimsuy]*)(\\s*)(\\.|;|\\/|,|\\)|\\]|\\}|$))/, { token: \'regexp\', bracket: \'@open\', next: \'@regexp\' }],\n' +
        '\n' +
        '            // delimiters and operators\n' +
        '            [/[()\\[\\]]/, \'@brackets\'],\n' +
        '            [/[<>](?!@symbols)/, \'@brackets\'],\n' +
        '            [/@symbols/, {\n' +
        '                cases: {\n' +
        '                    \'@operators\': \'delimiter\',\n' +
        '                    \'@default\': \'\'\n' +
        '                }\n' +
        '            }],\n' +
        '\n' +
        '            // numbers\n' +
        '            [/(@digits)[eE]([\\-+]?(@digits))?/, \'number.float\'],\n' +
        '            [/(@digits)\\.(@digits)([eE][\\-+]?(@digits))?/, \'number.float\'],\n' +
        '            [/0[xX](@hexdigits)/, \'number.hex\'],\n' +
        '            [/0[oO]?(@octaldigits)/, \'number.octal\'],\n' +
        '            [/0[bB](@binarydigits)/, \'number.binary\'],\n' +
        '            [/(@digits)/, \'number\'],\n' +
        '\n' +
        '            // delimiter: after number because of .\\d floats\n' +
        '            [/[;,.]/, \'delimiter\'],\n' +
        '\n' +
        '            // strings\n' +
        '            [/"([^"\\\\]|\\\\.)*$/, \'string.invalid\'],  // non-teminated string\n' +
        '            [/\'([^\'\\\\]|\\\\.)*$/, \'string.invalid\'],  // non-teminated string\n' +
        '            [/"/, \'string\', \'@string_double\'],\n' +
        '            [/\'/, \'string\', \'@string_single\'],\n' +
        '            [/`/, \'string\', \'@string_backtick\'],\n' +
        '        ],\n' +
        '\n' +
        '        whitespace: [\n' +
        '            [/[ \\t\\r\\n]+/, \'\'],\n' +
        '            [/\\/\\*\\*(?!\\/)/, \'comment.doc\', \'@jsdoc\'],\n' +
        '            [/\\/\\*/, \'comment\', \'@comment\'],\n' +
        '            [/\\/\\/.*$/, \'comment\'],\n' +
        '        ],\n' +
        '\n' +
        '        comment: [\n' +
        '            [/[^\\/*]+/, \'comment\'],\n' +
        '            [/\\*\\//, \'comment\', \'@pop\'],\n' +
        '            [/[\\/*]/, \'comment\']\n' +
        '        ],\n' +
        '\n' +
        '        jsdoc: [\n' +
        '            [/[^\\/*]+/, \'comment.doc\'],\n' +
        '            [/\\*\\//, \'comment.doc\', \'@pop\'],\n' +
        '            [/[\\/*]/, \'comment.doc\']\n' +
        '        ],\n' +
        '\n' +
        '        // We match regular expression quite precisely\n' +
        '        regexp: [\n' +
        '            [/(\\{)(\\d+(?:,\\d*)?)(\\})/, [\'regexp.escape.control\', \'regexp.escape.control\', \'regexp.escape.control\']],\n' +
        '            [/(\\[)(\\^?)(?=(?:[^\\]\\\\\\/]|\\\\.)+)/, [\'regexp.escape.control\', { token: \'regexp.escape.control\', next: \'@regexrange\' }]],\n' +
        '            [/(\\()(\\?:|\\?=|\\?!)/, [\'regexp.escape.control\', \'regexp.escape.control\']],\n' +
        '            [/[()]/, \'regexp.escape.control\'],\n' +
        '            [/@regexpctl/, \'regexp.escape.control\'],\n' +
        '            [/[^\\\\\\/]/, \'regexp\'],\n' +
        '            [/@regexpesc/, \'regexp.escape\'],\n' +
        '            [/\\\\\\./, \'regexp.invalid\'],\n' +
        '            [/(\\/)([gimsuy]*)/, [{ token: \'regexp\', bracket: \'@close\', next: \'@pop\' }, \'keyword.other\']],\n' +
        '        ],\n' +
        '\n' +
        '        regexrange: [\n' +
        '            [/-/, \'regexp.escape.control\'],\n' +
        '            [/\\^/, \'regexp.invalid\'],\n' +
        '            [/@regexpesc/, \'regexp.escape\'],\n' +
        '            [/[^\\]]/, \'regexp\'],\n' +
        '            [/\\]/, { token: \'regexp.escape.control\', next: \'@pop\', bracket: \'@close\' }],\n' +
        '        ],\n' +
        '\n' +
        '        string_double: [\n' +
        '            [/[\u4e00-\u9fa5\\w$]+/, \'string\'],\n' +
        '            [/[^\\\\"]+/, \'string\'],\n' +
        '            [/@escapes/, \'string.escape\'],\n' +
        '            [/\\\\./, \'string.escape.invalid\'],\n' +
        '            [/"/, \'string\', \'@pop\']\n' +
        '        ],\n' +
        '\n' +
        '        string_single: [\n' +
        '            [/[^\\\\'] + /, \'string\'],\n'+
    '            [/@escapes/, \'string.escape\'],\n'+
            '            [/\\\\./, \'string.escape.invalid\'],\n' +
        '            [/\'/, \'string\', \'@pop\']\n' +
        '                [/[\u4e00-\u9fa5\\w$]+/, \'string\'],\n' +
        '        ],\n' +
        '\n' +
        '        string_backtick: [\n' +
        '            [/\\$\\{/, { token: \'delimiter.bracket\', next: \'@bracketCounting\' }],\n' +
        '            [/[^\\\\`$]+/, \'string\'],\n' +
        '            [/@escapes/, \'string.escape\'],\n' +
        '            [/\\\\./, \'string.escape.invalid\'],\n' +
        '            [/`/, \'string\', \'@pop\']\n' +
        '        ],\n' +
        '\n' +
        '        bracketCounting: [\n' +
        '            [/\\{/, \'delimiter.bracket\', \'@bracketCounting\'],\n' +
        '            [/\\}/, \'delimiter.bracket\', \'@pop\'],\n' +
        '            { include: \'common\' }\n' +
        '        ],\n' +
        '    },\n' +
        '};\nhis', 'throw', 'true',
    'try', 'typeof', 'undefined', 'var', 'void', 'while', 'with', 'yield',
    'async', 'await', 'of'
],

typeKeywords: [
    'any', 'boolean', 'number', 'object', 'string', 'undefined'
],

    operators: [
    '<=', '>=', '==', '!=', '===', '!==', '=>', '+', '-', '**',
    '*', '/', '%', '++', '--', '<<', '</', '>>', '>>>', '&',
    '|', '^', '!', '~', '&&', '||', '?', ':', '=', '+=', '-=',
    '*=', '**=', '/=', '%=', '<<=', '>>=', '>>>=', '&=', '|=',
    '^=', '@',
],

    // we include these common regular expressions
    symbols: /[=><!~?:&|+\-*\/\^%]+/,
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    digits: /\d+(_+\d+)*/,
    octaldigits: /[0-7]+(_+[0-7]+)*/,
    binarydigits: /[0-1]+(_+[0-1]+)*/,
    hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,

    regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
    regexpesc: /\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

    // The main tokenizer for our languages
    tokenizer: {
    root: [
        [/[{}]/, 'delimiter.bracket'],
        { include: 'common' }
    ],

        common: [
        [/[\u4e00-\u9fa5\w$][\u4e00-\u9fa5\w$]*/, {
            cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@default': 'identifier'
            }
        }],
        // identifiers and keywords
        [/[a-z_$][\w$]*/, {
            cases: {
                '@typeKeywords': 'keyword',
                '@keywords': 'keyword',
                '@default': 'identifier'
            }
        }],
        [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely
        // [/[A-Z][\w\$]*/, 'identifier'],

        // whitespace
        { include: '@whitespace' },

        // regular expression: ensure it is terminated before beginning (otherwise it is an opeator)
        [/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/, { token: 'regexp', bracket: '@open', next: '@regexp' }],

        // delimiters and operators
        [/[()\[\]]/, '@brackets'],
        [/[<>](?!@symbols)/, '@brackets'],
        [/@symbols/, {
            cases: {
                '@operators': 'delimiter',
                '@default': ''
            }
        }],

        // numbers
        [/(@digits)[eE]([\-+]?(@digits))?/, 'number.float'],
        [/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, 'number.float'],
        [/0[xX](@hexdigits)/, 'number.hex'],
        [/0[oO]?(@octaldigits)/, 'number.octal'],
        [/0[bB](@binarydigits)/, 'number.binary'],
        [/(@digits)/, 'number'],

        // delimiter: after number because of .\d floats
        [/[;,.]/, 'delimiter'],

        // strings
        [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/'([^'\\]|\\.)*$/, 'string.invalid'],  // non-teminated string
        [/"/, 'string', '@string_double'],
        [/'/, 'string', '@string_single'],
        [/`/, 'string', '@string_backtick'],
    ],

        whitespace: [
        [/[ \t\r\n]+/, ''],
        [/\/\*\*(?!\/)/, 'comment.doc', '@jsdoc'],
        [/\/\*/, 'comment', '@comment'],
        [/\/\/.*$/, 'comment'],
    ],

        comment: [
        [/[^\/*]+/, 'comment'],
        [/\*\//, 'comment', '@pop'],
        [/[\/*]/, 'comment']
    ],

        jsdoc: [
        [/[^\/*]+/, 'comment.doc'],
        [/\*\//, 'comment.doc', '@pop'],
        [/[\/*]/, 'comment.doc']
    ],

        // We match regular expression quite precisely
        regexp: [
        [/(\{)(\d+(?:,\d*)?)(\})/, ['regexp.escape.control', 'regexp.escape.control', 'regexp.escape.control']],
        [/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/, ['regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],
        [/(\()(\?:|\?=|\?!)/, ['regexp.escape.control', 'regexp.escape.control']],
        [/[()]/, 'regexp.escape.control'],
        [/@regexpctl/, 'regexp.escape.control'],
        [/[^\\\/]/, 'regexp'],
        [/@regexpesc/, 'regexp.escape'],
        [/\\\./, 'regexp.invalid'],
        [/(\/)([gimsuy]*)/, [{ token: 'regexp', bracket: '@close', next: '@pop' }, 'keyword.other']],
    ],

        regexrange: [
        [/-/, 'regexp.escape.control'],
        [/\^/, 'regexp.invalid'],
        [/@regexpesc/, 'regexp.escape'],
        [/[^\]]/, 'regexp'],
        [/\]/, { token: 'regexp.escape.control', next: '@pop', bracket: '@close' }],
    ],

        string_double: [
        [/[\u4e00-\u9fa5\w$]+/, 'string'],
        [/[^\\"]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/"/, 'string', '@pop']
    ],

        string_single: [
        [/[^\\']+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/'/, 'string', '@pop']
            [/[\u4e00-\u9fa5\w$]+/, 'string'],
    ],

        string_backtick: [
        [/\$\{/, { token: 'delimiter.bracket', next: '@bracketCounting' }],
        [/[^\\`$]+/, 'string'],
        [/@escapes/, 'string.escape'],
        [/\\./, 'string.escape.invalid'],
        [/`/, 'string', '@pop']
    ],

        bracketCounting: [
        [/\{/, 'delimiter.bracket', '@bracketCounting'],
        [/\}/, 'delimiter.bracket', '@pop'],
        { include: 'common' }
    ],
},
};
