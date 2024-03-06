module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'babel-plugin-styled-components',
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
  ],
};
