import React from 'react';
import {View} from 'react-native';
import {FlatList} from '@stream-io/flat-list-mvcp';
import Loading from 'component/Loading';
import {useBook} from 'utils/lib';
import Error from 'component/Error';

interface props {
  componentId: string;
}

const ListItem = React.lazy(() => import('@component/List'));

const Bookmark: React.FC<props> = ({componentId}) => {
  const {isData, isEmpty, isError, isLoading, setSize, size} = useBook();

  const renderItem = ({item, index}: {item: string; index: number}) => {
    return (
      <React.Suspense fallback={null} key={index}>
        <ListItem item={isData[item]} componentId={componentId} />
      </React.Suspense>
    );
  };

  if (isLoading) {
    return <Loading ActivityProps={{size: 25, color: '#fff'}} />;
  }

  if (isError) {
    return <Error title={'failed'} code={403} />;
  }

  if (isEmpty) {
    return <Error title={'isEmpty'} code={404} />;
  }

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.toString()}
        numColumns={3}
        data={Object.keys(isData)}
        renderItem={renderItem}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          setSize(size + 1);
        }}
      />
    </View>
  );
};

export default Bookmark;
