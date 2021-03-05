import React from 'react';
import {chapter} from '../../../typed';
import style from './styles';
import {Pressable, Text, View} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Navigation} from 'react-native-navigation';
import {useChapterComponentColorDisable} from 'utils/hook/navigation';
import {MMKVwithIDCHapter} from 'utils/database/mmkv';
dayjs.extend(relativeTime);

interface props {
  componentId: string;
  chapter: chapter;
}

const ChapterItem: React.FC<props> = ({chapter, componentId}) => {
  const state = useChapterComponentColorDisable(componentId, chapter.id);

  const onPush = (chapter: chapter) => {
    Navigation.push(componentId, {
      component: {
        name: 'com.reader',
        passProps: chapter,
        options: {bottomTabs: {visible: false}, topBar: {visible: false}},
      },
    });
    MMKVwithIDCHapter.setBoolAsync(`chapterId-${chapter.id}`, true)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <Pressable
      onPress={() => {
        onPush(chapter);
      }}
      style={style.chapterContainer}>
      <View
        style={[
          style.chapterWrapper,
          {
            backgroundColor: state ? 'transparent' : '#404952',
          },
        ]}>
        <Text style={style.chapterTitle}>{chapter.name}</Text>
        <Text style={style.chapterTime}>
          {dayjs(chapter.last_update).fromNow()}
        </Text>
      </View>
    </Pressable>
  );
};

export default ChapterItem;
