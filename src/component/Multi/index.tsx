import React, {useCallback} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import {content} from '../../../typed';
import styles from './styles';
import dayjs from 'dayjs';
import {Navigation} from 'react-native-navigation';

interface props {
  horizontal: boolean;
  data: content[];
  title: string;
  componentId: string;
}

const Multi: React.FC<props> = ({horizontal, componentId, data, title}) => {
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
                text: item.name ? item.name.slice(0, 100) : '',
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

  const renderItem = useCallback(
    (item: content, index: number) => {
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

  const render = (
    <View>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{title}</Text>
      </View>
      {horizontal ? (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {data.map((item, index) => renderItem(item, index))}
        </ScrollView>
      ) : (
        <View style={styles.verticaly}>
          {data.map((item, index) => renderItem(item, index))}
        </View>
      )}
    </View>
  );

  return render;
};

export default Multi;
