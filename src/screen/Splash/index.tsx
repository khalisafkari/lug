import React, {useRef} from 'react';
import {View, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import {useNavigationcomponentDidAppear} from 'utils/hook/navigation';
import {getCountry, verifyCountry} from 'utils/lib';

const Image = Animated.createAnimatedComponent(FastImage);

interface props {
  componentId: string;
}

const Splash: React.FC<props> = ({componentId}) => {
  const refAnimated = useRef<Animated.Value>(new Animated.Value(0)).current;

  useNavigationcomponentDidAppear(() => {
    Animated.timing(refAnimated, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      getCountry()
        .then(verifyCountry)
        .catch(() => {});
    });
  }, componentId);

  return (
    <View style={styles.root}>
      <Image
        style={[
          styles.image,
          {
            opacity: refAnimated.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
        source={require('../../../assets/logo.png')}
      />
    </View>
  );
};

export default Splash;
