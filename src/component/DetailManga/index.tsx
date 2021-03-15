import React, {useCallback} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import Image from 'react-native-fast-image';
import {manga} from '../../../typed';
import styles from './style';
import ReadMore from 'react-native-read-more-text';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import numeral from 'numeral';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {Navigation} from 'react-native-navigation';

import {removeBookmarkId, saveBookmarkId, useFindBookId} from 'utils/lib';
dayjs.extend(relativeTime);

interface props {
  data: manga;
  componentId: string;
}

const DetailManga: React.FC<props> = ({data, componentId}) => {
  const {isLoading, isData, isError, mutate} = useFindBookId(data.id);

  const onAddBookmark = () => {
    if (isError) {
      Alert.alert('Login Required', 'Please Login Now');
    } else {
      if (!isData) {
        saveBookmarkId(data.id);
        mutate();
      } else {
        removeBookmarkId(data.id);
        mutate();
      }
    }
  };

  // const Download = () => {
  //   Navigation.push(componentId, {
  //     component: {
  //       name: 'com.download.manager',
  //       options: {
  //         topBar: {
  //           title: {
  //             text: 'DOWNLOAD MANGA #' + data.id,
  //             color: '#fff',
  //             fontSize: 12,
  //           },
  //           subtitle: {
  //             text: data.name.slice(0, 150),
  //             fontSize: 10,
  //             color: '#fff',
  //           },
  //         },
  //         bottomTabs: {
  //           visible: false,
  //         },
  //       },
  //       passProps: data,
  //     },
  //   });
  // };

  const _renderTruncatedFooter = useCallback((onPress: () => void) => {
    return (
      <Pressable onPress={onPress} style={styles.more}>
        <Icon name={'caretdown'} size={20} color={'#772953'} />
      </Pressable>
    );
  }, []);

  const renderRevealedFooter = useCallback((onPress: () => void) => {
    return (
      <Pressable onPress={onPress} style={styles.more}>
        <Icon name={'caretup'} size={20} color={'#772953'} />
      </Pressable>
    );
  }, []);

  return (
    <View style={styles.detailMangaContainer}>
      <View style={styles.coverContainer}>
        <Image
          style={styles.cover}
          resizeMode={Image.resizeMode.stretch}
          source={{uri: data.cover, headers: {Referer: 'https://lovehug.net'}}}
        />
      </View>
      <View style={styles.subDetailContainer}>
        <View style={styles.otherWrapper}>
          <Text numberOfLines={2} style={styles.otherName}>
            {data.other_name}
          </Text>
          <Text style={styles.otherMagazine}>{data.magazine}</Text>
        </View>
        <View style={styles.otherBtnWrapper}>
          <View style={styles.otherBtnContainer}>
            <Pressable style={styles.otherBtn}>
              <Icon name={'eye'} color={'#fff'} size={15} />
            </Pressable>
            <Text style={styles.otherView}>
              {numeral(data.views).format('0a')}
            </Text>
          </View>
          <View style={styles.otherBtnContainer}>
            <Pressable
              onPress={onAddBookmark}
              style={[
                styles.otherBtn,
                {backgroundColor: 'rgba(255,0,96,255)'},
              ]}>
              {isLoading ? null : (
                <Icon2
                  name={'favorite'}
                  color={isData ? '#808080' : '#fff'}
                  size={15}
                />
              )}
            </Pressable>
            <Text style={styles.otherView}>
              {numeral(data.favorite).format('0a')}
            </Text>
          </View>
          {/*<View style={styles.otherBtnContainer}>*/}
          {/*  <Pressable*/}
          {/*    onPress={Download}*/}
          {/*    style={[*/}
          {/*      styles.otherBtn,*/}
          {/*      {backgroundColor: 'rgba(156,124,248,255)'},*/}
          {/*    ]}>*/}
          {/*    <Icon2 name={'file-download'} color={'#fff'} size={15} />*/}
          {/*  </Pressable>*/}
          {/*</View>*/}
          <View style={styles.otherBtnContainer}>
            <Pressable
              onPress={() => {
                Navigation.push(componentId, {
                  component: {
                    name: 'com.comment',
                    passProps: {
                      manga: data.id,
                    },
                    options: {
                      bottomTabs: {
                        visible: false,
                      },
                      topBar: {
                        title: {
                          text: data.name,
                          color: '#fff',
                          fontSize: 10,
                        },
                      },
                    },
                  },
                });
              }}
              style={[styles.otherBtn, {backgroundColor: '#808080'}]}>
              <Icon name={'message1'} color={'#fff'} size={15} />
            </Pressable>
          </View>
        </View>
        <ReadMore
          numberOfLines={3}
          renderRevealedFooter={renderRevealedFooter}
          renderTruncatedFooter={_renderTruncatedFooter}>
          {data.description && (
            <Text style={[styles.chapterLabelText]}>
              {data.description
                .replace(/Updating/gi, '')
                .replace(/<([a-z][a-z0-9]*)[^>]*?(\/?)>/gi, '')}
            </Text>
          )}
        </ReadMore>
        <View style={styles.genreWrapper}>
          {data.genres.map((item, index) => {
            if (item) {
              return (
                <Pressable style={styles.genreBtn} key={index}>
                  <Text style={styles.genreLabel}>{item.name}</Text>
                </Pressable>
              );
            }
          })}
        </View>
      </View>

      <View>
        <View style={styles.line} />
        <View style={styles.chapterContainer}>
          <Text style={styles.chapterLabelText}>chapter</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailManga;
