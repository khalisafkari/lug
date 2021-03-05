import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import {mangas, useMangaHistoryAll} from '@utils/hook/navigation';
import styles from 'component/Multi/styles';
import Image from 'react-native-fast-image';
import dayjs from 'dayjs';
import {content} from '../../../typed';
import {Navigation} from 'react-native-navigation';

interface props {
  componentId: string;
}

const History: React.FC<props> = ({componentId}) => {
  const state = useMangaHistoryAll(componentId);

  const onPush = useCallback(
    (item: content) => {
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
    },
    [componentId],
  );

  const onHistoryAll = useCallback(() => {
    Navigation.push(componentId, {
      component: {
        name: 'com.historyall',
        options: {
          topBar: {
            backButton: {
              color: '#fff',
            },
            title: {
              text: 'History',
              color: '#fff',
            },
          },
          bottomTabs: {
            visible: false,
          },
        },
        passProps: {content: state},
      },
    });
  }, [componentId, state]);

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
    <View>
      <Pressable onPress={onHistoryAll} style={styles.labelContainer}>
        <Text style={styles.labelText}>History</Text>
      </Pressable>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {state.length > 5
          ? state.slice(0, 6).map(renderItem)
          : state.map(renderItem)}
      </View>
    </View>
  );
};

export default History;
