import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

interface props {
  title: string;
  code: number;
}

const Error: React.FC<props> = ({title, code}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorLabel}>
        message: {title} {code}
      </Text>
    </View>
  );
};

export default Error;
