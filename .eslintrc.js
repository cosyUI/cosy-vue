module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'vue/script-indent': ['error', 2, { 'baseIndent': 1 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: [
        '*.vue',
        '**/__tests__/*.{j,t}s?(x)'
      ],
      rules: {
        'indent': 'off'
      },
      env: {
        jest: true
      }
    }
  ]
}
