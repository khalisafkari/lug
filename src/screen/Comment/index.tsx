import React, {useState} from 'react';
import {
  FlatList,
  Pressable,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import instance from 'utils/instance';
import {useSWRInfinite} from 'swr';
import Error from 'component/Error';
import Loading from 'component/Loading';
import {comments} from '../../../typed';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';
import {onSendComment} from 'utils/lib';

interface props {
  componentId: string;
  manga: number | null;
  chapter?: number | null;
}

interface isData {
  [key: string]: comments;
}

const CommentItem = React.lazy(() => import('@component/CommentItem'));

const fetcher = (url: string) =>
  instance.get(url).then((result) => result.data.content);

const Comment: React.FC<props> = (props) => {
  const [text, setText] = useState<string>('');
  const {data, error, size, setSize, mutate} = useSWRInfinite((index, prev) => {
    if (prev && !prev) {
      return null;
    }
    if (props.chapter) {
      return `/api/manga/comment/${props.manga}/${Math.floor(
        props.chapter,
      )}?page=${index}`;
    }
    return `/api/manga/comment/${props.manga}?page=${index}`;
  }, fetcher);

  const isLoading = !data && !error;
  const isData = data ? data : [];
  const isEmpty = data ? data?.[0]?.length === 0 : false;

  const comment: isData = {};
  for (let i = 0; i < isData.length; i++) {
    const data = isData[i];
    for (let d = 0; d < data.length; d++) {
      comment[data[d].id] = data[d];
    }
  }

  if (error) {
    return <Error title={'comment disable on mobile'} code={0} />;
  }

  const onSendMessage = () => {
    onSendComment({
      data: text,
      chapter: props.chapter,
      manga: props.manga,
    })
      .then(() => {
        ToastAndroid.show('success', ToastAndroid.SHORT);
        mutate();
        setText('');
      })
      .catch((error) => {
        ToastAndroid.show(error.toString(), ToastAndroid.LONG);
      })
      .finally(() => {});
  };

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <Loading ActivityProps={{color: '#fff', size: 25}} />
      ) : isEmpty ? (
        <Error title={'not comment'} code={0} />
      ) : (
        <FlatList
          style={styles.root}
          keyExtractor={(item) => item.toString()}
          data={Object.keys(comment)}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item}) => {
            return (
              <React.Suspense
                fallback={
                  <Loading ActivityProps={{size: 15, color: '#fff'}} />
                }>
                <CommentItem comment={comment[item]} />
              </React.Suspense>
            );
          }}
          onEndReachedThreshold={0.01}
          onEndReached={() => {
            setSize(size + 1);
          }}
        />
      )}
      {isLoading ? null : (
        <View style={styles.commentContainer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.commentInput}
            multiline={true}
            placeholder={'comment...'}
          />
          <Pressable onPress={onSendMessage} style={styles.commentBtnWrapper}>
            <Icon name={'send'} size={25} />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Comment;
