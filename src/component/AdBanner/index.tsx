import React from 'react';
// @ts-ignore
import AppLovinMAX from 'react-native-applovin-max';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';

interface props {
  adUnitId: string;
  style?: StyleProp<ViewStyle>;
}

const AdBanner: React.FC<props> = ({adUnitId, style}) => {
  return (
    <AppLovinMAX.AdView
      adUnitId={adUnitId}
      adFormat={AppLovinMAX.AdFormat.BANNER}
      style={[styles.bannerAd, style]}
    />
  );
};

const styles = StyleSheet.create({
  bannerAd: {
    backgroundColor: '#000000',
    width: '100%',
    height: AppLovinMAX.isTablet() ? 90 : 50,
    bottom: Platform.select({
      ios: 36,
      android: 0,
    }),
    marginTop: 8,
  },
});

export default AdBanner;