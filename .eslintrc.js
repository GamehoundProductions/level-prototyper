module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'eol-last': 'off',
    'spaced-comment': 'off',
    'space-before-function-paren': 'off',
    'no-multiple-empty-lines': 'off',
    'comma-spacing': 'off',
    'comma-dangle': 'off',
    'keyword-spacing': 'off',
    'curly': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
