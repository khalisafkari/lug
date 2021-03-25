import {Navigation} from 'react-native-navigation';
import Home from '@screen/Home';
import Detail from '@screen/Detail';
import Reader from '@screen/Reader';
import Rak from '@screen/Rak';
import HistoryAll from '@screen/HistoryAll';
import List from '@screen/List';
import Comment from '@screen/Comment';
import Profile from '@screen/Profile';
import Login from '@screen/Login';
import Web from 'screen/Web';
import Bookmark from '@screen/Bookmark';
import Splash from '@screen/Splash';
import Protect from '@screen/Protect';
import {RouteSplash} from '@utils/route';

import analytics from '@react-native-firebase/analytics';
import Tapdaq from 'react-native-tapdaq-ad';
import OneSignal from 'react-native-onesignal';
import CodePush from 'react-native-code-push';
import config from '@utils/config';

Navigation.registerComponent('com.home', () =>
  CodePush({
    deploymentKey: config.getKeyDev(),
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  })(Home),
);

Navigation.registerComponent('com.list', () => List);
Navigation.registerComponent('com.rak', () => Rak);
Navigation.registerComponent('com.profile', () => Profile);
Navigation.registerComponent('com.splash', () => Splash);
Navigation.registerComponent('com.protect', () => Protect);

Navigation.events().registerAppLaunchedListener(async () => {
  RouteSplash();
});

Navigation.setLazyComponentRegistrator((componentName) => {
  if (componentName === 'com.detail') {
    Navigation.registerComponent('com.detail', () => Detail);
  } else if (componentName === 'com.reader') {
    Navigation.registerComponent('com.reader', () => Reader);
  } else if (componentName === 'com.historyall') {
    Navigation.registerComponent('com.historyall', () => HistoryAll);
  } else if (componentName === 'com.comment') {
    Navigation.registerComponent('com.comment', () => Comment);
  } else if (componentName === 'com.login') {
    Navigation.registerComponent('com.login', () => Login);
  } else if (componentName === 'com.web') {
    Navigation.registerComponent('com.web', () => Web);
  } else if (componentName === 'com.bookmark') {
    Navigation.registerComponent('com.bookmark', () => Bookmark);
  }
});

Navigation.events().registerComponentDidDisappearListener(
  async ({componentName, componentType}) => {
    if (componentType === 'Component') {
      await analytics().logScreenView({
        screen_name: componentName,
        screen_class: 'navigation',
      });
    }
  },
);

Navigation.setDefaultOptions({
  layout: {
    backgroundColor: '#333',
  },
  topBar: {
    background: {
      color: '#772953',
    },
    backButton: {
      color: '#fff',
    },
    rightButtonColor: '#fff',
  },
  bottomTab: {
    selectedIconColor: '#fff',
  },
  bottomTabs: {
    backgroundColor: '#333',
    titleDisplayMode: 'alwaysHide',
    tabsAttachMode: 'onSwitchToTab',
  },
});

Tapdaq.initialize(
  '6052cf2e08fe6c2d735d6553',
  '6b290f78-f553-4f91-86cc-bcb5a4f3aed1',
).then(() => {});

OneSignal.setAppId('deffad9f-2bd8-404e-ba0e-0d8829522aa4');
