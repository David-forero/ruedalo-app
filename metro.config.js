// Learn more https://docs.expo.io/guides/customizing-metro

module.exports = {
    resolver: {
      extraNodeModules: {
        'react-native-debugger': require.resolve('react-native-debugger-open'),
      },
    },
  };

