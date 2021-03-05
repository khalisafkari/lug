import React from 'react';
import {ActivityIndicator, Linking, Pressable, Text, View} from 'react-native';
import {useNavigationcomponentDidAppear} from 'utils/hook/navigation';
import {getToken, useBook} from 'utils/lib';
import {Navigation} from 'react-native-navigation';
import Error from '@component/Error';
import Loading from '@component/Loading';
import {FlatList} from '@component/BidFlatList';
import rootstyle from './styles';
import styles from 'component/Multi/styles';
import Image from 'react-native-fast-image';
import dayjs from 'dayjs';

interface props {
  componentId: string;
}

const Protect: React.FC<props> = (props) => {
  const {
    isEmpty,
    isLoading,
    isData,
    size,
    setSize,
    isError,
    isTotal,
  } = useBook();

  useNavigationcomponentDidAppear(() => {
    getToken().then((results) => {
      if (!results) {
        Navigation.showModal({component: {name: 'com.login'}});
      }
    });
  }, props.componentId);

  if (isLoading) {
    return <Loading ActivityProps={{size: 20, color: '#fff'}} />;
  }

  if (isEmpty) {
    return <Error title={'isEmpity'} code={404} />;
  }

  if (isError) {
    return <Error title={'failed fetch'} code={403} />;
  }

  const renderItem = ({item}: {item: string}) => {
    return (
      <Pressable
        onPress={() => {
          Linking.openURL(`https://beta.lovehug.net/post/${isData[item].slug}`);
        }}
        style={styles.cardContainer}>
        <View style={styles.cardWrapper}>
          <Image
            source={{
              uri: isData[item].cover,
              headers: {Referer: 'https://lovehug.net'},
            }}
            style={styles.card}
          />
          <View style={styles.cornerLabel}>
            <Text style={styles.cornerLabelText}>
              {isData[item].last_chapter}
            </Text>
          </View>
          <View style={styles.cornerTime}>
            <Text style={styles.cornerLabelText}>
              {dayjs(isData[item].last_update).fromNow()}
            </Text>
          </View>
          <View style={styles.cornerName}>
            <Text numberOfLines={1} style={styles.cornerLabelText}>
              {isData[item].name}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  };

  const onLoadMore = async () => {
    return;
  };

  const onStartLoad = async () => {
    return;
  };

  return (
    <View style={rootstyle.root}>
      <FlatList
        numColumns={3}
        data={Object.keys(isData)}
        keyExtractor={(item) => item.toString()}
        renderItem={renderItem}
        activityIndicatorColor={'#fff'}
        onEndReachedThreshold={0.01}
        onStartReached={onStartLoad}
        onEndReached={onLoadMore}
        HeaderLoadingIndicator={() => null}
        FooterLoadingIndicator={() =>
          isTotal === size || size > isTotal ? null : (
            <View style={rootstyle.indicatorContainer}>
              <ActivityIndicator size={'small'} color={'#fff'} />
            </View>
          )
        }
      />
    </View>
  );
};

export default Protect;
