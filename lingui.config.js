module.exports = {
  catalogs: [
    {
      path: '<rootDir>/locale/{locale}',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  locales: ['en', 'vi'],
  pseudoLocale: 'pseudo',
  fallbackLocales: {},
  format: 'minimal',
  orderBy: 'messageId',
  rootDir: '.',
  runtimeConfigModule: {
    i18n: ['@lingui/core', 'i18n'],
    Trans: ['@lingui/react', 'Trans'],
  },
  sourceLocale: 'en',
}
