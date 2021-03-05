import React, {useCallback} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {mangas} from 'utils/hook/navigation';
import {content} from '../../../typed';
import {Navigation} from 'react-native-navigation';
import styles from 'component/Multi/styles';
import Image from 'react-native-fast-image';
import dayjs from 'dayjs';

interface props {
  componentId: string;
  content: mangas[];
}

const HistoryAll: React.FC<props> = (props) => {
  const onPush = useCallback(
    (item: content) => {
      Navigation.push(props.componentId, {
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
    },
    [props.componentId],
  );

  const renderItem = useCallback(
    (item: mangas, index: number) => {
      return (
        <Pressable
          onPress={() => {
            onPush(item);
          }}
          key={index}
          style={styles.cardContainer}>
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
    },
    [onPush],
  );

  return (
    <ScrollView>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {props.content.map(renderItem)}
      </View>
    </ScrollView>
  );
};

export default HistoryAll;
