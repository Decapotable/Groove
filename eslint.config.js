const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  { ignores: ['dist/*', '.expo/*'] },
  { files: ['scripts/**/*.js'], languageOptions: { globals: { Buffer: 'readonly', __dirname: 'readonly' } } },
]);
