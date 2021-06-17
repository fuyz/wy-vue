// const INLINE_ELEMENTS = require('eslint-plugin-vue/lib/utils/inline-non-void-elements.json')
module.exports = {
    env: {
        // 此项指定环境的全局变量，下面的配置指定为浏览器环境
        browser: true,
        node: true
    },
    parser: 'vue-eslint-parser', // Specifies the ESLint parser
    extends: [
        'plugin:vue/essential',
        // 'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'eslint:recommended'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    plugins: ['vue'],
    rules: {
        'no-mixed-spaces-and-tabs': 'off',
        'no-var': 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-consecutive-blank-lines': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-consecutive-blank-lines': 'off',
        'no-self-compare': 'off',
        // 'space-infix-ops': ['error'],
        // 'newline-per-chained-call': 'off',
        'indent': 'off',
        // 'eol-last': ['error'],
        // "vue/max-attributes-per-line": 'off'
        'object-curly-newline': 'off',
        'no-empty-function': 'off',
        // "prettier/prettier": "error",
        // fyz - 自定义
        //强制不使用分号结尾
        'semi': ['warn', 'never'],
        'quotes': ['warn', 'single'],//强制使用单引号
        'space-before-function-paren': 'off', // 函数定义时括号前面要不要有空格
        'no-empty': ['warn', 'always'], // 块语句中的内容不能为空
        'no-unused-vars': 'warn', // 不能有声明后未被使用的变量或参数
        'vue/no-unused-vars': 'off',
        'vue/max-attributes-per-line': 'off',
        'max-lines-per-function': 'off',
        'prefer-const': 'warn', // 首选const
        'eqeqeq': 'warn', // 必须使用全等
    },
    overrides: [
        {
            // enable the rule specifically for TypeScript files
            files: ['*.ts', '*.tsx'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 0
            }
        },
        {
            // enable the rule specifically for TypeScript files
            files: ['*.vue', '*.html'],
            rules: {
                'vue/html-closing-bracket-newline': [
                    'error',
                    {
                        singleline: 'never',
                        multiline: 'never'
                    }
                ]
            }
        }
    ]
}
