/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: {sourceExts, assetExts},
} = getDefaultConfig(__dirname);

const config = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(defaultConfig, config);

// const {getDefaultConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://facebook.github.io/metro/docs/configuration
//  *
//  * @type {import('metro-config').MetroConfig}
//  */
// // const config = {};

// // module.exports = mergeConfig(getDefaultConfig(__dirname), config);

// // module.exports = (() => {
// //   const config = getDefaultConfig(__dirname);

// //   const {transformer, resolver} = config;

// //   config.transformer = {
// //     ...transformer,
// //     babelTransformerPath: require.resolve('react-native-svg-transformer'),
// //   };
// //   config.resolver = {
// //     ...resolver,
// //     assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
// //     sourceExts: [...resolver.sourceExts, 'svg'],
// //   };

// //   return config;
// // })();

// // module.exports = (async () => {
// //   const {
// //     resolver: {sourceExts, assetExts},
// //   } = await getDefaultConfig();
// //   return {
// //     transformer: {
// //       getTransformOptions: async () => ({
// //         transform: {
// //           experimentalImportSupport: false,
// //           inlineRequires: true,
// //         },
// //       }),
// //       babelTransformerPath: require.resolve('react-native-svg-transformer'),
// //     },
// //     resolver: {
// //       assetExts: assetExts.filter(ext => ext !== 'svg'),
// //       sourceExts: [...sourceExts, 'svg'],
// //     },
// //   };
// // })();

// // const defaultConfig = getDefaultConfig(__dirname);
// // const {assetExts, sourceExts} = defaultConfig.resolver;

// // const config = {
// //   transformer: {
// //     babelTransformerPath: require.resolve('react-native-svg-transformer'),
// //   },
// //   resolver: {
// //     assetExts: assetExts.filter(ext => ext !== 'svg'),
// //     sourceExts: [...sourceExts, 'svg'],
// //   },
// // };

// // module.exports = mergeConfig(defaultConfig, config);

// module.exports = (async () => {
//   const defaultConfig = await getDefaultConfig();
//   return {
//     ...defaultConfig,
//     transformer: {
//       ...defaultConfig.transformer,
//       assetPlugins: ['react-native-svg-transformer'],
//     },
//   };
// })();
