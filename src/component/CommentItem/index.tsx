import React from 'react';
import {Pressable, Text, View} from 'react-native';
import HTML from 'react-native-render-html';
import {comments} from '../../../typed';
import styles from './styles';
import Image from 'react-native-fast-image';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import instance from 'utils/instance';
import useSWR from 'swr';
import Loading from 'component/Loading';
import Error from 'component/Error';
dayjs.extend(relativeTime);

interface props {
  comment: comments;
}

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

const CommentItem: React.FC<props> = ({comment}) => {
  const {data, error} = useSWR(
    `/api/user/findid?id=${comment.user_id}`,
    fetcher,
  );

  if (!data) {
    return <Loading ActivityProps={{size: 10, color: '#fff'}} />;
  }

  if (error) {
    return <Error title={'failed fetch user'} code={404} />;
  }

  return (
    <View style={styles.commentUI}>
      <Pressable>
        {data.id === 3 ? (
          <Image
            source={require('../../../assets/dev.gif')}
            style={styles.commentAvatar}
          />
        ) : (
          <Image
            source={{
              uri: `https://robohash.org/${data.name}?set=set2`,
              priority: Image.priority.low,
            }}
            // source={{
            //   uri: `https://cdn.statically.io/avatar/shape=circle/${data.name}`,
            //   priority: Image.priority.low,
            // }}
            style={styles.commentAvatar}
          />
        )}
      </Pressable>
      <View style={styles.commentContent}>
        <View style={styles.commentHeader}>
          <View style={styles.nameContainer}>
            {data.id === 3 ? (
              <Text style={styles.names}>Tohka</Text>
            ) : (
              <Text style={styles.names}>{data.name}</Text>
            )}
            {data.id === 3 ? <Text style={styles.badgeText}>Dev</Text> : null}
          </View>
          <Text style={styles.times}>{dayjs(comment.time).fromNow()}</Text>
        </View>
        <HTML
          tagsStyles={{img: {maxHeight: 100, maxWidth: 200}}}
          source={{html: comment.content}}
        />
        <View style={styles.commentChpater}>
          {comment.chapter > 0 ? (
            <Text style={styles.chapter}>chapter {comment.chapter}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
