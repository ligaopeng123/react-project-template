module.exports = {
    extends: 'erb',
    rules: {
        // A temporary hack related to IDE not resolving correct package.json
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': 'off',
        'import/order': 'off',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/ban-types': 'off',
        ' @typescript-eslint/no-unused-vars': 'off',
        // Since React 17 and typescript 4.1 you can safely disable the rule
        'react/react-in-jsx-scope': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-uses-react': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-fragments': 'off',
        'react/prop-types': 'off',
        'react/jsx-curly-brace-presence': 'off',
        // promise
        'promise/catch-or-return': 'off',
        'promise/always-return': 'off',
        // 关闭Object.assign报错
        'prefer-object-spread': 'off',
        // 关闭prettier
        'prettier/prettier': 'off',
        // 空格
        'indent': 'off',
        // 注释
        "spaced-comment": 'off'
    },
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        createDefaultProgram: true
    },
    settings: {
        'import/resolver': {
            // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
            node: {},
            webpack: {
                config: require.resolve('./.erb/configs/webpack.config.eslint.ts')
            },
            typescript: {}
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx']
        }
    }
};
