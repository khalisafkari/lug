import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps, View} from 'react-native';
import styles from './styles';

interface props {
  ActivityProps?: ActivityIndicatorProps;
}

const Loading: React.FC<props> = (props) => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator {...props.ActivityProps} />
    </View>
  );
};

export default Loading;
