import React from 'react';
import {Platform, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {TapView} from 'react-native-tapdaq';

interface props {
  adUnitId: string;
  style?: StyleProp<ViewStyle>;
  adType: string;
}

const AdBanner: React.FC<props> = ({adUnitId, style, adType}) => {
  return (
    <TapView
      style={[styles.bannerAd, style]}
      placementId={adUnitId}
      adSize={adType}
      didLoad={() => {}}
      didFailToLoad={() => {}}
      didRefresh={() => {}}
      didFailToRefresh={() => {}}
      didClick={() => {}}
    />
  );
};

const styles = StyleSheet.create({
  bannerAd: {
    width: 320,
    height: 50,
    bottom: Platform.select({
      ios: 36,
      android: 0,
    }),
    marginTop: 8,
  },
});

export default AdBanner;
