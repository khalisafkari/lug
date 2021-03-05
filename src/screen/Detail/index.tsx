import React, {useCallback, useRef} from 'react';
import {Animated, Pressable, Text, View} from 'react-native';
import instance from 'utils/instance';
import useSWR from 'swr';
import Error from 'component/Error';
import Loading from 'component/Loading';
import Chapter from 'component/Chapter';
// import DetailManga from 'component/DetailManga';
import Image from 'react-native-fast-image';
import styles from './styles';
import {
  mangas,
  useMangaHistory,
  useNavigationcomponentDidAppear,
} from 'utils/hook/navigation';
import Icon from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Navigation} from 'react-native-navigation';
dayjs.extend(relativeTime);

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

interface props {
  componentId: string;
  id: number;
}

const DetailManga = React.lazy(() => import('@component/DetailManga'));

const Detail: React.FC<props> = (props) => {
  const {error, data} = useSWR(`/api/manga/detail/${props.id}`, fetcher);
  const state = useMangaHistory(props.componentId, props.id);


  const value = useRef<Animated.Value>(new Animated.Value(100)).current;

  const closeBotton = () => {
    Animated.timing(value, {
      duration: 1000,
      toValue: 100,
      useNativeDriver: true,
    }).start();
  };

  useNavigationcomponentDidAppear(() => {
    Animated.timing(value, {
      duration: 1000,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, props.componentId);

  const onPush = useCallback(
    (item: mangas) => {
      Navigation.push(props.componentId, {
        component: {
          name: 'com.reader',
          passProps: {
            chapter: item.last_chapter,
            id: item.chapterId,
            last_update: item.last_update,
            manga: item.name,
            mid: item.id,
            name: `Chapter ${item.last_chapter}`,
            views: item.views,
          },
          options: {bottomTabs: {visible: false}, topBar: {visible: false}},
        },
      });
    },
    [props.componentId],
  );

  if (error) {
    return <Error title={'Failed Load'} code={503} />;
  }

  if (!data) {
    return <Loading ActivityProps={{color: '#fff', size: 25}} />;
  }

  return (
    <View>
      <Animated.ScrollView>
        <React.Suspense
          fallback={<Loading ActivityProps={{size: 15, color: '#fff'}} />}>
          <DetailManga componentId={props.componentId} data={data.content} />
        </React.Suspense>
        <Chapter componentId={props.componentId} id={props.id} />
      </Animated.ScrollView>
      {state ? (
        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateY: value.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 100],
                  }),
                },
              ],
            },
          ]}>
          <View style={styles.Wrapper}>
            <Pressable
              style={styles.WrapperCover}
              onPress={() => {
                onPush(state);
              }}>
              <Image source={{uri: state.cover}} style={styles.imageWrapper} />
              <View style={styles.WrapperLabel}>
                <Text numberOfLines={1} style={styles.name}>
                  {state.name}
                </Text>
                <Text numberOfLines={1} style={styles.last}>
                  Chapter {state.last_chapter}{' '}
                  {dayjs(state.last_update).fromNow()}
                </Text>
              </View>
            </Pressable>
            <Pressable onPress={closeBotton} style={styles.WrapperClose}>
              <Icon name={'close'} size={15} color={'#fff'} />
            </Pressable>
          </View>
        </Animated.View>
      ) : null}
    </View>
  );
};

export default Detail;
