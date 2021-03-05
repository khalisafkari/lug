import React, {useCallback} from 'react';
import {Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
// @ts-ignore
import Carousel from 'react-native-x-carousel';
import styles from './styles';
import {content} from '../../../typed';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Navigation} from 'react-native-navigation';
dayjs.extend(relativeTime);

interface props {
  data: content[];
  componentId: string;
}

const Slide: React.FC<props> = (props) => {
  const onPush = useCallback(
    (item: content) => {
      Navigation.push(props.componentId, {
        component: {
          name: 'com.detail',
          passProps: item,
          options: {
            bottomTabs: {
              visible: false,
            },
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
          },
        },
      });
    },
    [props.componentId],
  );

  const renderItem = useCallback(
    (item: content) => {
      return (
        <Pressable
          onPress={() => {
            onPush(item);
          }}
          key={item.id}
          style={styles.cardContainer}>
          <View style={styles.cardWrapper}>
            <Image
              source={{
                uri: item.cover,
                headers: {
                  Referer: 'https://lovehug.net',
                },
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

  const render = React.createElement(
    View,
    {style: styles.slideContainer},
    React.createElement(Carousel, {
      renderItem: renderItem,
      data: props.data,
      loop: true,
      autoplay: true,
    }),
  );

  return render;
};

export default Slide;
