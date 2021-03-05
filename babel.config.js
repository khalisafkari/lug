module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@component': './src/component',
          '@utils': './src/utils',
          '@screen': './src/screen',
          '@styles': './src/styles',
          '@typed': './typed',
        },
      },
    ],
  ],
};
