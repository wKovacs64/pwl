module.exports = {
  '*.{js,ts,tsx}': ['prettier --write', 'eslint --fix'],
  '*.{html,json,md,yml,yaml}': ['prettier --write'],
};
