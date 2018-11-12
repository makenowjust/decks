module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  settings: {
    react: {
      version: '16',
    },
  },
  plugins: ['import', 'jsx-a11y', 'promise', 'react', 'unicorn'],
  extends: [
    'plugin:import/recommended',
    'plugin:promise/recommended',
    'plugin:unicorn/recommended',
    'xo-space/esnext',
    'xo-react/space',
    'plugin:jsx-a11y/recommended',
    'prettier',
    'prettier/react',
    'prettier/unicorn',
  ],
  rules: {
    'import/order': ['error', {'newlines-between': 'always'}],
    // Which do you like `"foo"` or `&quot;foo&quot`? -- Of course I like the first!
    // Actually there is no reason to use the second. It is UTF-8 age now.
    'react/no-unescaped-entities': 'off',
  },
};
