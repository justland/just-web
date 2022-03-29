module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', { allowNamespaces: true }]],
  plugins: [
    '@babel/plugin-transform-runtime'
  ],
};
