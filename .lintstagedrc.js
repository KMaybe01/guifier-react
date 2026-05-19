/** @type {import('lint-staged').Configuration} */
export default {
  'src/**/*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  'src/**/*.{css,md,json}': ['prettier --write'],
}
