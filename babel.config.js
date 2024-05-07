module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'babel-plugin-root-import',
      {
        paths: [
          {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
          },
        ],
      },
    ],
    [
      'module:react-native-dotenv',
      {
        // envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    ['babel-plugin-styled-components'],
  ],
};
