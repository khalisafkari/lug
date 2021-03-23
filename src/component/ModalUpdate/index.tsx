import React, {PureComponent} from 'react';
import {
  UIManager,
  View,
  Animated,
  ScrollView,
  Text,
  Pressable,
  LayoutAnimation,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Image from 'react-native-fast-image';
import styles from './styles';
import CodePush from 'react-native-code-push';

interface states {
  label: string;
  description: string;
  packageSize: string;
  receivedBytes: number;
  status: number;
  show: boolean;
  isMandatory: boolean;
}

class ModalUpdate extends PureComponent<any, states> {
  private RemotePackage: any;
  private Anim = new Animated.Value(0);
  private width = new Animated.Value(0);

  constructor(props: any) {
    super(props);
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    this.state = {
      label: '',
      description: '',
      packageSize: '',
      receivedBytes: 0,
      status: 0,
      show: false,
      isMandatory: false,
    };
  }

  install = async () => {
    LayoutAnimation.easeInEaseOut();
    this.setState({status: 1}); //download
    const LocalPackage = await this.RemotePackage.download((progress: any) => {
      this.setState({
        receivedBytes: progress.receivedBytes,
      });

      Animated.timing(this.width, {
        // @ts-ignore
        toValue: parseFloat(
          // @ts-ignore
          progress.receivedBytes / progress.totalBytes,
        ).toFixed(2),
        duration: 150,
        useNativeDriver: false,
      }).start();
    });
    this.setState({status: 2}); //downloadComplete
    await LocalPackage.install(
      LocalPackage.isMandatory
        ? CodePush.InstallMode.IMMEDIATE
        : CodePush.InstallMode.ON_NEXT_RESUME,
    );
    if (!LocalPackage.isMandatory) {
      this.setState({status: 3});
      this.setVisible(false);
      ToastAndroid &&
        ToastAndroid.show(
          'Complete the update at the next startup',
          ToastAndroid.SHORT,
        );
    }
  };

  init = (RemotePackage: any) => {
    const {label, description, packageSize, isMandatory} = RemotePackage;
    this.setState({label, description, packageSize, isMandatory});
    this.RemotePackage = RemotePackage;
    this.setVisible(true);
  };

  ignore = () => {
    this.setVisible(false);
  };

  setVisible = (bool: boolean) => {
    this.setState({show: bool});
    Animated.timing(this.Anim, {
      toValue: bool ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  render() {
    const {
      show,
      label,
      description,
      packageSize,
      status,
      receivedBytes,
      isMandatory,
    } = this.state;

    const backgroundColor = this.Anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', 'rgba(0,0,0,.5)'],
    });

    const opacity = this.Anim.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const transform = [
      {
        translateY: this.Anim.interpolate({
          inputRange: [0, 1],
          outputRange: [100, 0],
        }),
      },
    ];

    // @ts-ignore
    const Size = parseInt(packageSize / 1000);
    // @ts-ignore
    const receivedSize = parseInt(receivedBytes / 1000);

    return (
      <Animated.View
        pointerEvents={show ? 'auto' : 'none'}
        style={[styles.content, {backgroundColor}]}>
        <Animated.View style={[styles.update, {opacity, transform}]}>
          <View style={styles.header}>
            <Icon name="rocket" color="#fff" size={30} />
            <Text style={styles.new}>New version available {label}</Text>
            <Image
              style={styles.header_bg}
              resizeMode="cover"
              source={require('../../../assets/updata.png')}
            />
          </View>
          {status == 0 && (
            <View style={styles.body}>
              <ScrollView>
                <Text style={[styles.packageSize, {color: '#772953'}]}>
                  [更新大小: {Size}KB]
                </Text>
                <Text style={styles.description}>{description}</Text>
              </ScrollView>
            </View>
          )}
          {status == 0 && (
            <View style={styles.footer}>
              {!isMandatory && (
                <Pressable
                  onPress={this.ignore}
                  style={[styles.btn_submit, {borderColor: '#772953'}]}>
                  <Text style={[styles.btn_text, {color: '#772953'}]}>
                    Next time
                  </Text>
                </Pressable>
              )}
              <Pressable
                onPress={this.install}
                style={[styles.btn_submit, styles.btnUpdate]}>
                <Text style={styles.btn_text}>Update</Text>
              </Pressable>
            </View>
          )}
          {status >= 1 && (
            <View style={styles.download}>
              <View style={styles.progress}>
                <View style={styles.progresswrap}>
                  <Animated.View
                    style={[
                      styles.progresscon,
                      {backgroundColor: '#772953', flex: this.width},
                    ]}
                  />
                </View>
                <Text style={styles.progresstext}>
                  {receivedSize + '/' + Size + 'KB'}
                </Text>
              </View>
              <Text style={styles.download_tip}>
                {(status == 1 && '正在努力更新中，请等待') ||
                  (status == 2 && '正在安装...') ||
                  (status == 3 && '下次启动完成更新')}
              </Text>
            </View>
          )}
        </Animated.View>
      </Animated.View>
    );
  }
}

export default ModalUpdate;
