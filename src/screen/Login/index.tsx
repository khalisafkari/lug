import React, {useState} from 'react';
import {Pressable, Text, TextInput, ToastAndroid, View} from 'react-native';
import styles from './styles';
import {Navigation} from 'react-native-navigation';
import {onLoginUser} from '@utils/lib';
import Loading from 'component/Loading';
import * as sentry from '@sentry/react-native';
import OneSignal from 'react-native-onesignal';

interface props {
  componentId: string;
}

const Login: React.FC<props> = ({componentId}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    setLoading(true);
    if (email && password) {
      onLoginUser(email, password)
        .then(() => {
          Navigation.dismissModal(componentId);
          sentry.setUser({email: email});
          OneSignal.setEmail(email);
          OneSignal.setExternalUserId(email);
        })
        .catch(() => {
          ToastAndroid.show(
            'failed check email & password again',
            ToastAndroid.LONG,
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const onWeb = () => {
    Navigation.showModal({
      component: {
        name: 'com.web',
        passProps: {url: 'https://beta.lovehug.net/authentication'},
      },
    });
  };

  return (
    <View style={styles.root}>
      <View style={styles.inputContainer}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder={'email...'}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder={'password...'}
        />
      </View>
      <Pressable onPress={onLogin} style={styles.btnLogin}>
        {loading ? (
          <Loading ActivityProps={{color: '#fff', size: 15}} />
        ) : (
          <Text style={styles.label}>Login</Text>
        )}
      </Pressable>
      <View style={styles.registerContainer}>
        <Text style={styles.text}>
          If you don't have an account, please register on the website or{' '}
          <Text onPress={onWeb} style={{color: 'blue'}}>
            click register
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Login;
