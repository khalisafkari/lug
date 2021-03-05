import React, {useState} from 'react';
import {Pressable, Text, TextInput, View, Animated} from 'react-native';
import {useSWRInfinite} from 'swr/esm';
import instance from 'utils/instance';
import Loading from 'component/Loading';
import styles from './styles';
import {manga} from '../../../typed';
import Error from 'component/Error';
import {useNavigationcomponentDidAppear} from 'utils/hook/navigation';
import {Navigation} from 'react-native-navigation';

interface props {
  componentId: string;
}

interface isData {
  [key: number]: manga;
}

interface fetcher {
  data: manga[];
  total: number;
  page: number;
}

const fetcher = (url: string) =>
  instance.get(url).then(({data, headers}) => {
    const content: fetcher = {
      data: data.content,
      total: Number(headers.total),
      page: Number(headers.page),
    };
    return content;
  });

const ListItem = React.lazy(() => import('@component/List'));

const List: React.FC<props> = ({componentId}) => {
  const [query, setQuery] = useState<string>('');
  const [genres, setGenres] = useState<string>('');

  const {data, error, size, setSize} = useSWRInfinite((index, prev) => {
    if (prev && prev.total === 1) {
      return null;
    }
    if (prev && !prev.data.length) {
      return null;
    }

    if (query.length > 2 || genres.length > 3) {
      return `/api/manga/list?page=${index}&query=${query}&genres=${genres}`;
    }
    return `/api/manga/list?page=${index}`;
  }, fetcher);

  useNavigationcomponentDidAppear(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        visible: false,
      },
    });
  }, componentId);

  if (error) {
    return React.createElement(Error, {
      title: 'Failed Fetch List',
      code: 503,
    });
  }

  const isLoading = !data && !error;
  const isTotal = !isLoading ? data?.[0]?.total : null;
  const isData = data ? data : [];
  const isEmpty = data ? data?.[0]?.data.length === 0 : false;

  const content: isData | any = {};
  for (let i = 0; i < isData?.length; i++) {
    const objectmanga: manga[] = isData[i].data;
    for (let z = 0; z < objectmanga.length; z++) {
      content[objectmanga[z].id] = objectmanga[z];
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            placeholder="ext: title @genres action,comedy"
            onChangeText={(event) => {
              if (event.indexOf('@') !== -1) {
                if (event.indexOf('@genres') !== -1) {
                  const rgex = event.split(/@genres/gi)[1].replace(/\s/gi, '');
                  const st = event.substring(0, event.indexOf('@'));
                  setQuery(st);
                  setGenres(rgex);
                  setSize(1);
                } else {
                  setQuery(event.substring(0, event.indexOf('@')));
                  setSize(1);
                }
              } else {
                setQuery(event);
                setSize(1);
              }
            }}
          />
        </View>
      </View>
      {isLoading ? (
        <Loading ActivityProps={{color: '#fff', size: 25}} />
      ) : isEmpty ? (
        <Error title={'Empty'} code={404} />
      ) : (
        <Animated.ScrollView>
          <View style={[styles.viewWrapper]}>
            {Object.keys(content).map((item, index) => (
              <React.Suspense fallback={null} key={index}>
                <ListItem item={content[item]} componentId={componentId} />
              </React.Suspense>
            ))}
          </View>
          {isLoading ? null : isTotal ? (
            isTotal > size ? (
              isTotal === size ? null : (
                <View style={styles.containerMore}>
                  <Pressable
                    onPress={() => {
                      setSize(size + 1);
                    }}
                    style={styles.wrapperMore}>
                    <Text style={styles.moreLabel}>More...</Text>
                  </Pressable>
                </View>
              )
            ) : null
          ) : null}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default List;
