import React, {useCallback} from 'react';
import {Linking, Pressable, Switch, Text, View} from 'react-native';
import {getToken, onLogout} from '@utils/lib';
import {useNavigationcomponentDidAppear} from 'utils/hook/navigation';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import Ionic from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import OneSignal, {DeviceState} from 'react-native-onesignal';
import useSWR from 'swr';
import VersionCheck from 'react-native-version-check';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import config from '@utils/config';
import instance from 'utils/instance';

interface props {
  componentId: string;
}

const fetcherOneSignal = async (): Promise<DeviceState> => {
  try {
    return await OneSignal.getDeviceState();
  } catch (error) {
    crashlytics().recordError(error);
    throw error;
  }
};

const fetchUpdate = async () => {
  try {
    if (config.playstore) {
      return await VersionCheck.needUpdate({});
    } else {
      return await VersionCheck.needUpdate({
        // @ts-ignore
        provider: () =>
          instance.get(config.githubURL).then(({data}) => data.tag_name),
      });
    }
  } catch (error) {
    crashlytics().recordError(error);
    throw error;
  }
};

const Profile: React.FC<props> = (props) => {
  const {data, error, mutate} = useSWR('_onesignal_', fetcherOneSignal);
  const {data: update, error: update_error} = useSWR('_update_', fetchUpdate);

  const onBookmark = useCallback(() => {
    Navigation.push(props.componentId, {
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
  }, [props.componentId]);

  useNavigationcomponentDidAppear(() => {
    getToken().then((results) => {
      if (!results) {
        Navigation.showModal({component: {name: 'com.login'}});
      }
    });
  }, props.componentId);

  const onLogoutLayout = () => {
    onLogout();
    Navigation.mergeOptions(props.componentId, {
      bottomTabs: {
        currentTabIndex: 0,
      },
    });
  };

  const OnLinking = (url: string) => {
    Linking.openURL(url);
    (async () => {
      await analytics().logEvent('toURL', {
        url: url,
        description: 'link click upgrade',
      });
    })();
  };

  return (
    <View style={styles.root}>
      <View style={styles.menuContainer}>
        <Pressable onPress={onBookmark} style={styles.menuWrapper}>
          <Text style={styles.menuLabel}>Bookmark</Text>
          <Ionic name={'bookmark'} size={25} color={'#fff'} />
        </Pressable>
        {!error ? (
          <Pressable onPress={onBookmark} style={styles.menuWrapper}>
            <Text style={styles.menuLabel}>Notification</Text>
            <Switch
              trackColor={{false: '#767577', true: '#fff'}}
              value={!data?.isPushDisabled}
              thumbColor={!data?.isPushDisabled ? '#772953' : '#f4f3f4'}
              onValueChange={() => {
                OneSignal.disablePush(!data?.isPushDisabled);
                mutate();
              }}
            />
          </Pressable>
        ) : null}
        <Pressable onPress={onLogoutLayout} style={styles.menuWrapper}>
          <Text style={styles.menuLabel}>LOGOUT</Text>
          <Ionic name={'log-out'} size={25} color={'#772953'} />
        </Pressable>
        {!update && !update_error ? null : error ? null : update?.isNeeded ? (
          <Pressable
            onPress={() => {
              OnLinking(
                update?.storeUrl
                  ? update.storeUrl
                  : 'https://kutt.it/lovehugapk',
              );
            }}
            style={styles.menuWrapper}>
            <Text style={styles.menuLabel}>
              UPDATE <Text style={{color: 'red'}}>Available</Text>
            </Text>
            <Text style={styles.menuLabel}>
              {update?.currentVersion}
              <Text style={{fontWeight: 'bold', fontSize: 15, width: 10}}>
                {' > '}
              </Text>
              <Text style={{color: 'red'}}>{update?.latestVersion}</Text>
            </Text>
          </Pressable>
        ) : null}
      </View>
      <View style={styles.socialContainer}>
        <Pressable
          onPress={() => {
            OnLinking('https://kutt.it/lovehug-wa-grup');
          }}
          style={styles.socialWrapper}>
          <Icon name={'whatsapp'} size={25} color={'#25D366'} />
          <Text style={styles.labelSocial}>Grup Dev</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            OnLinking('https://kutt.it/lovehug-discrod');
          }}
          style={styles.socialWrapper}>
          <Icon name={'discord'} size={25} color={'#7289da'} />
          <Text style={styles.labelSocial}>Community</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            OnLinking('https://kutt.it/lovehug');
          }}
          style={styles.socialWrapper}>
          <Icon name={'firefox'} size={25} color={'#ff4f5e'} />
          <Text style={styles.labelSocial}>Web</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Profile;
