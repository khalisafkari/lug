import React from 'react';
import {Pressable, Text, View} from 'react-native';
import instance from 'utils/instance';
import useSWR from 'swr';
import Error from 'component/Error';
import Loading from 'component/Loading';
import {chapter} from '../../../typed';
import ChapterItem from 'component/ChapterItem';
import {
  useNavigationcomponentDidDisappear,
  useNavigationcomponentDidAppear,
} from '@utils/hook/navigation';

interface props {
  componentId: string;
  id: number;
}

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

const Chapter: React.FC<props> = ({id, componentId}) => {
  const {error, data} = useSWR(`/api/manga/chapter/${id}`, fetcher);

  if (error) {
    return <Error title={'Failed Load Chapter'} code={503} />;
  }

  if (!data) {
    return <Loading ActivityProps={{color: '#fff', size: 25}} />;
  }

  return (
    <View>
      {data.content.map((item: chapter, index: number) => (
        <ChapterItem componentId={componentId} chapter={item} key={index} />
      ))}
    </View>
  );
};

export default Chapter;
