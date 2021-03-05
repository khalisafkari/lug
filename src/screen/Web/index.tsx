import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {Navigation} from 'react-native-navigation';

interface props {
  url: string;
  componentId: string;
}

const Web: React.FC<props> = (props) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.top}>
        <Pressable
          style={styles.btnContainer}
          onPress={() => {
            Navigation.dismissModal(props.componentId)
          }}>
          <Icon name={'arrowleft'} size={25} color={'#fff'} />
        </Pressable>
        <Text numberOfLines={1} style={styles.title}>
          {props.url}
        </Text>
      </View>
      <WebView source={{uri: props.url}} />
    </View>
  );
};

export default Web;
