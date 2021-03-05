import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from 'component/Multi/styles';
import Image from 'react-native-fast-image';
import dayjs from 'dayjs';
import {manga} from '../../../typed';
import {Navigation} from 'react-native-navigation';

interface props {
  item: manga;
  componentId: string;
}

const ListItem: React.FC<props> = ({item, componentId}) => {
  const onPush = useCallback(() => {
    Navigation.push(componentId, {
      component: {
        name: 'com.detail',
        passProps: item,
        options: {
          topBar: {
            background: {
              color: '#333',
            },
            backButton: {
              color: '#fff',
            },
            title: {
              text: item.name,
              fontSize: 12,
              color: '#fff',
            },
          },
          bottomTabs: {
            visible: false,
          },
        },
      },
    });
  }, [componentId, item]);

  return (
    <Pressable onPress={onPush} style={styles.cardContainer}>
      <View style={styles.cardWrapper}>
        <Image
          source={{
            uri: item.cover,
            headers: {Referer: 'https://lovehug.net'},
          }}
          style={styles.card}
        />
        <View style={styles.cornerLabel}>
          <Text style={styles.cornerLabelText}>{item.last_chapter}</Text>
        </View>
        <View style={styles.cornerTime}>
          <Text style={styles.cornerLabelText}>
            {dayjs(item.last_update).fromNow()}
          </Text>
        </View>
        <View style={styles.cornerName}>
          <Text numberOfLines={1} style={styles.cornerLabelText}>
            {item.name}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ListItem;
