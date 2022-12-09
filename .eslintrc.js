const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8')
);

module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['prettier'],
  rules: {
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        format: ['camelCase'],
        leadingUnderscore: 'allowSingleOrDouble',
      },
    ],

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    'class-methods-use-this': 'off',
    'compat/compat': 'off',
    'generator-star-spacing': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/no-cycle': 'off',
    'import/no-unresolved': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'no-console': [
      'error',
      {
        allow: ['info', 'error', 'warn'],
      },
    ],
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'no-shadow': 'off',
    'arrow-parens': 2,
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',
    'promise/no-return-wrap': 'off',
    'prefer-promise-reject-errors': 'off',
    'react/destructuring-assignment': 'off',
    'jsx-a11y/alt-text': 'off',
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
        argsIgnorePattern: '_',
        varsIgnorePattern: '_',
      },
    ],
    'prettier/prettier': ['error', { singleQuote: true }],
    'promise/always-return': 'off',
    'default-case': 'off',
    'promise/catch-or-return': 'off',
    'no-restricted-syntax': 'off',
    'promise/no-nesting': 'off',
    'promise/no-native': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'ignore' },
    ],
    'react/jsx-fragments': 0,
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'react/prefer-stateless-function': 'off',
    'react/prop-types': 'off',
    'react/sort-comp': [
      'error',
      {
        order: [
          'defaultProps',
          'static-variables',
          'static-methods',
          'instance-variables',
          'type-annotations',
          'lifecycle',
          'everything-else',
          'render',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['off', prettierOptions] },
    },
  ],
};
