import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  LayoutChangeEvent,
  Pressable,
  Text,
  ToastAndroid,
  View,
  Animated,
} from 'react-native';
import useSWR from 'swr';
import instance from 'utils/instance';
import {useRegisterHistory, useAdsIntertitial} from 'utils/hook/navigation';
import {WebView} from 'react-native-webview';
import Error from 'component/Error';
import styles from './styles';
import html from 'utils/html';
import {WebViewScrollEvent} from 'react-native-webview/lib/WebViewTypes';
import Icon from 'react-native-vector-icons/AntDesign';
import {Navigation} from 'react-native-navigation';
// @ts-ignore

interface props {
  componentId: string;
  mid: number;
  chapter: number;
  id: number;
}

const fetcher = (url: string) =>
  instance.get(url).then((results) => results.data);

const Reader: React.FC<props> = (props) => {
  const {data, error} = useSWR(`/api/manga/content/${props.id}`, fetcher);
  useRegisterHistory(props.componentId, props.mid, props.chapter, props.id);

  const [id, setId] = useState<any>(null);
  const [state, setState] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [manga, setManga] = useState<string>('');
  const [next, setNext] = useState<any>(null);
  const [prev, setPrev] = useState<any>(null);
  const scrollY = useRef<Animated.Value>(new Animated.Value(0)).current;
  const webviewRef = useRef<typeof WebView | any>();
  const [layout, setLayout] = useState<number>(0);

  const isLoading = !data && !error;
  const isError = error;

  useEffect(() => {
    if (!isLoading && !isError) {
      setState(data.content?.content);
      setNext(data.next?.id);
      setPrev(data.prev?.id);
      setTitle(data.content?.name);
      setManga(data.content?.manga);
    }
  }, [data, isError, isLoading]);

  // eslint-disable-next-line no-shadow
  const onLayoutSize = useCallback((layout: LayoutChangeEvent) => {
    setLayout(layout.nativeEvent.layout.height);
  }, []);

  const onScrollEvent = async (event: WebViewScrollEvent) => {
    const layout_size = Math.round(layout);
    const SIZE = Math.round(event.nativeEvent.contentOffset.y + layout_size);
    if (Math.round(event.nativeEvent.contentOffset.y) < 56) {
      Animated.timing(scrollY, {
        useNativeDriver: true,
        toValue: 0,
        duration: 500,
      }).start();
    } else if (SIZE > Math.round(event.nativeEvent.contentSize.height - 56)) {
      if (next) {
        const fetch = await fetcher(`/api/manga/content/${next}`);
        ToastAndroid.show(fetch.content.name, ToastAndroid.SHORT);
        setState(fetch.content.content);
        setNext(fetch.next ? fetch.next.id : null);
        setPrev(fetch.prev ? fetch.prev.id : null);
        setTitle(fetch.content ? fetch.content.name : '');
        setId(fetch.content ? fetch.content.id : null);
      } else {
        Animated.timing(scrollY, {
          useNativeDriver: true,
          toValue: 0,
          duration: 500,
        }).start();
      }
    } else {
      Animated.timing(scrollY, {
        useNativeDriver: true,
        toValue: 1,
        duration: 500,
      }).start();
    }
  };

  const onNextPush = async () => {
    if (next) {
      const fetch = await fetcher(`/api/manga/content/${next}`);
      setState(fetch.content?.content);
      setPrev(fetch.prev ? fetch.prev.id : null);
      setNext(fetch.next ? fetch.next.id : null);
      setTitle(fetch.content ? fetch.content.name : '');
      setId(fetch.content ? fetch.content.id : null);
      ToastAndroid.show(fetch.content?.name, ToastAndroid.SHORT);
    }
  };

  const onPrevPush = async () => {
    if (prev) {
      const fetch = await fetcher(`/api/manga/content/${prev}`);
      setState(fetch.content?.content);
      setPrev(fetch.prev ? fetch.prev.id : null);
      setNext(fetch.next ? fetch.next.id : null);
      setTitle(fetch.content ? fetch.content.name : '');
      setId(fetch.content ? fetch.content.id : null);
      ToastAndroid.show(fetch.content?.name, ToastAndroid.SHORT);
    }
  };

  const onPushComment = () => {
    if (id) {
      Navigation.push(props.componentId, {
        component: {
          name: 'com.comment',
          passProps: {
            manga: props.mid,
            chapter: id,
          },
          options: {
            topBar: {
              title: {
                text: manga,
                color: '#fff',
                fontSize: 10,
              },
              subtitle: {
                text: title,
                color: '#fff',
              },
            },
            bottomTabs: {
              visible: false,
            },
          },
        },
      });
    } else {
      Navigation.push(props.componentId, {
        component: {
          name: 'com.comment',
          passProps: {
            manga: props.mid,
            chapter: props.chapter,
          },
          options: {
            topBar: {
              title: {
                text: manga,
                color: '#fff',
                fontSize: 12,
              },
              subtitle: {
                text: title,
                color: '#fff',
                fontSize: 10,
              },
            },
            bottomTabs: {
              visible: false,
            },
          },
        },
      });
    }
  };

  useAdsIntertitial(props.componentId);

  if (isError) {
    return <Error title={'Failed Fetch'} code={404} />;
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={(ref) => {
          webviewRef.current = ref;
        }}
        collapsable={false}
        onLayout={onLayoutSize}
        source={{
          html: html(state),
          baseUrl: 'https://lovehug.net',
          headers: {
            Referer: 'https://lovehug.net',
          },
        }}
        showsVerticalScrollIndicator={false}
        onScroll={onScrollEvent}
        onMessage={(event) => {
          if (event.nativeEvent.data === 'up') {
            Animated.timing(scrollY, {
              useNativeDriver: true,
              toValue: 0,
              duration: 500,
            }).start();
          }
        }}
      />
      <Animated.View
        style={[
          styles.topContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -100],
                }),
              },
            ],
          },
        ]}>
        <Pressable
          style={styles.btnContainer}
          onPress={() => {
            Navigation.pop(props.componentId);
          }}>
          <Icon name={'arrowleft'} size={25} color={'#fff'} />
        </Pressable>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <View style={{flex: 1}}>
          <Text numberOfLines={1} style={styles.titleManga}>
            {manga}
          </Text>
          <Text style={styles.chapterManga}>{title}</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.botContainer,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 100],
                }),
              },
            ],
          },
        ]}>
        <Pressable
          onPress={onPrevPush}
          disabled={prev ? false : true}
          style={styles.btnContainer}>
          <Icon name={'arrowleft'} size={25} color={prev ? '#fff' : '#333'} />
        </Pressable>
        <View>
          <Pressable style={styles.btnContainer} onPress={onPushComment}>
            <Icon name={'message1'} size={20} color={'#fff'} />
          </Pressable>
        </View>
        <Pressable
          onPress={onNextPush}
          disabled={next ? false : true}
          style={styles.btnContainer}>
          <Icon name={'arrowright'} size={25} color={next ? '#fff' : '#333'} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

export default Reader;
