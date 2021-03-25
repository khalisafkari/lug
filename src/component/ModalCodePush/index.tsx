import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  Text,
  Pressable,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import Image from 'react-native-fast-image';
import styles from './styles';
import Icon from 'react-native-vector-icons/Entypo';
import config from '@utils/config';
import CodePush, {LocalPackage, RemotePackage} from 'react-native-code-push';
import numeral from 'numeral';

interface props {}

const ModalCodePush: React.FC<props> = () => {
  const ref = useRef<Animated.Value>(new Animated.Value(0)).current;
  const refSize = useRef<Animated.Value>(new Animated.Value(0)).current;
  const refPlanet = useRef<Animated.Value>(new Animated.Value(0)).current;

  const [state, setState] = useState<RemotePackage | null>(null);
  const [status, setStatus] = useState<number>(0);
  const [progress, setProgress] = useState<any>('0%');
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [show, setShow] = useState<boolean>(false);

  const setVisble = useCallback(
    (bool: boolean) => {
      Animated.parallel([
        Animated.timing(ref, {
          toValue: bool ? 1 : 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(refPlanet, {
          useNativeDriver: true,
          duration: bool ? 2000 : 150,
          toValue: bool ? 1 : 0,
        }),
      ]).start(() => {
        setShow(bool);
      });
    },
    [ref, refPlanet],
  );

  const sendDataToRemote = useCallback(
    (remotepackage: RemotePackage | null) => {
      if (remotepackage !== null) {
        setState(remotepackage);
        setVisble(true);
      }
    },
    [setVisble],
  );

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental(true);
    CodePush.allowRestart();
    CodePush.checkForUpdate(config.getKeyDev()).then((result) => {
      if (result) {
        sendDataToRemote(result);
      }
    });

    return () => {
      CodePush.disallowRestart();
    };
  }, [sendDataToRemote]);

  const onInstall = async () => {
    LayoutAnimation.easeInEaseOut();
    setStatus(1);
    setMessage('download...');
    const local: LocalPackage | any = await state?.download((progress) => {
      const progressByte: any | number = (
        progress.receivedBytes / progress.totalBytes
      ).toFixed(2);
      setProgress(numeral(progressByte).format('0%'));
      setMessage(`download ${numeral(progressByte).format('0%')}`);
      Animated.timing(refSize, {
        toValue: progressByte,
        useNativeDriver: false,
        duration: 150,
      }).start();
    });
    setMessage('install..');
    await local.install(
      local.isMandatory
        ? CodePush.InstallMode.IMMEDIATE
        : CodePush.InstallMode.ON_NEXT_RESTART,
    );
    if (!local.isMandatory) {
      setMessage('done, restart app');
      setStatus(2);
    }

    await CodePush.notifyAppReady();
  };

  const convertDescription = (description: string | undefined) => {
    return description?.replace(/\\n/g, '\n');
  };

  const backgroundColor = ref.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(0,0,0,.5)'],
  });

  const opacity = ref.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const transform = [
    {
      translateY: ref.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0],
      }),
    },
  ];

  return (
    <Animated.View
      pointerEvents={show ? 'auto' : 'none'}
      style={[styles.container, {backgroundColor}]}>
      <Animated.View style={[styles.content, {opacity, transform}]}>
        <View style={styles.header}>
          <Animated.View
            style={{
              transform: [
                {
                  translateY: refPlanet.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }),
                },
              ],
            }}>
            <Icon name="rocket" color="#fff" size={30} />
          </Animated.View>
          <Text style={styles.newLabel}>New version available </Text>
          <Image
            style={styles.header_bg}
            resizeMode={Image.resizeMode.stretch}
            source={require('../../../assets/updata.png')}
          />
        </View>
        <View style={styles.bodyContainer}>
          {status === 0 ? (
            <Text style={styles.labelSize}>
              SIZE : {numeral(state?.packageSize).format('0.0 b')}{' '}
              {state?.label}
            </Text>
          ) : null}
          {status === 0 ? (
            <View style={styles.updateInfoContainer}>
              <Animated.ScrollView>
                <Text style={styles.labelUpddateInfo}>
                  {convertDescription(state?.description)}
                </Text>
              </Animated.ScrollView>
            </View>
          ) : null}
          {status === 0 ? (
            <View style={styles.labelContainer}>
              {!state?.isMandatory ? (
                <Pressable
                  onPress={() => {
                    setVisble(false);
                  }}
                  style={styles.labelBtnWhite}>
                  <Text style={styles.labelH2}>Next time</Text>
                </Pressable>
              ) : null}
              <Pressable onPress={onInstall} style={styles.labelBtnPurple}>
                <Text style={styles.labelH2Purple}>Install</Text>
              </Pressable>
            </View>
          ) : null}
          {status >= 1 ? (
            <View style={styles.downloadContainer}>
              {status === 1 ? (
                <View style={styles.progressContainer}>
                  <View style={styles.progressWrap}>
                    <Animated.View style={[styles.progress, {flex: refSize}]} />
                  </View>
                  <Text style={styles.progressLabel}>{progress}</Text>
                </View>
              ) : (
                <View style={styles.labelContainer}>
                  {!state?.isMandatory ? (
                    <Pressable
                      onPress={() => {
                        setVisble(false);
                      }}
                      style={styles.labelBtnWhite}>
                      <Text style={styles.labelH2}>Next Time</Text>
                    </Pressable>
                  ) : null}
                  <Pressable
                    onPress={() => {
                      CodePush.restartApp();
                    }}
                    style={styles.labelBtnPurple}>
                    <Text style={styles.labelH2Purple}>Restart</Text>
                  </Pressable>
                </View>
              )}
              {message !== undefined ? (
                <View style={styles.containerInfo}>
                  <Text style={styles.containerInfoText}>{message}</Text>
                </View>
              ) : null}
            </View>
          ) : null}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

export default ModalCodePush;
