import React, {useCallback} from 'react';
import {Pressable, View, Text} from 'react-native';
import {getToken} from '@utils/lib';
import styles from '@component/Multi/styles';
import Loading from 'component/Loading';
import {Navigation} from 'react-native-navigation';
import instance from 'utils/instance';
import useSWR from 'swr';
import {manga} from '@typed/index';

interface props {
  componentId: string;
}

const ListItem = React.lazy(() => import('@component/List'));

const fetcher = async () => {
  try {
    const token: any = await getToken();
    if (token) {
      const data = await instance.get('/api/user/allbook', {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });
      return data.data;
    }
    const error = new Error();
    error.message = 'token failed';
    throw error;
  } catch (e) {
    throw e;
  }
};

const BookmarkL: React.FC<props> = ({componentId}) => {
  const {data, error} = useSWR('_bk_pro', fetcher);

  const isLoading = !data && !error;
  const isEmpty = data && !data.data.length;

  const onBookmark = useCallback(() => {
    Navigation.push(componentId, {
      component: {
        name: 'com.bookmark',
        options: {
          bottomTabs: {
            visible: false,
          },
          topBar: {
            title: {
              text: 'Bookmark',
              color: '#fff',
            },
          },
        },
      },
    });
  }, [componentId]);

  if (isLoading) {
    return <Loading ActivityProps={{color: '#fff', size: 20}} />;
  }

  if (error) {
    return null;
  }

  if (isEmpty) {
    return null;
  }

  return (
    <View>
      <Pressable onPress={onBookmark} style={styles.labelContainer}>
        <Text style={styles.labelText}>Bookmark</Text>
      </Pressable>
      <View style={styles.verticaly}>
        {data.data?.slice(0, 6).map((item: manga, index: number) => (
          <React.Suspense
            key={index}
            fallback={<Loading ActivityProps={{size: 20, color: '#fff'}} />}>
            <ListItem item={item} componentId={componentId} />
          </React.Suspense>
        ))}
      </View>
    </View>
  );
};

export default BookmarkL;
