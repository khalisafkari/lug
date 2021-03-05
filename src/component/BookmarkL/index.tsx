import React, {useCallback} from 'react';
import {Pressable, View, Text} from 'react-native';
import {useBook} from '@utils/lib';
import styles from '@component/Multi/styles';
import Loading from 'component/Loading';
import Error from 'component/Error';
import {Navigation} from 'react-native-navigation';

interface props {
  componentId: string;
}

const ListItem = React.lazy(() => import('@component/List'));

const BookmarkL: React.FC<props> = ({componentId}) => {
  const {isData, isLoading, isError, isEmpty} = useBook();

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

  if (isError) {
    return null;
  }

  if (isEmpty) {
    return (
      <View>
        <Pressable style={styles.labelContainer}>
          <Text style={styles.labelText}>Bookmark</Text>
        </Pressable>
        <Error title={'isEmpty'} code={404} />
      </View>
    );
  }

  return (
    <View>
      <Pressable onPress={onBookmark} style={styles.labelContainer}>
        <Text style={styles.labelText}>Bookmark</Text>
      </Pressable>
      <View style={styles.verticaly}>
        {Object.keys(isData)
          .slice(0, 6)
          .map((item, index) => (
            <React.Suspense
              key={index}
              fallback={<Loading ActivityProps={{size: 20, color: '#fff'}} />}>
              <ListItem item={isData[item]} componentId={componentId} />
            </React.Suspense>
          ))}
      </View>
    </View>
  );
};

export default BookmarkL;
