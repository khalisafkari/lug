import React, {useRef} from 'react';
import {BackHandler, Platform, ScrollView, ToastAndroid} from 'react-native';
import useSWR from 'swr';
import instance from 'utils/instance';
import Error from 'component/Error';
import Loading from 'component/Loading';
import {
  useNavigationcomponentDidAppear,
  useNavigationcomponentDidDisappear,
} from 'utils/hook/navigation';
import {Navigation} from 'react-native-navigation';
import CodePush from 'react-native-code-push';
import ModalUpdate from 'component/ModalUpdate';

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

interface props {
  componentId: string;
}

const Slide = React.lazy(() => import('@component/Slide'));
const MultiComponent = React.lazy(() => import('@component/Multi'));

const Home: React.FC<props> = ({componentId}) => {
  const {data, error} = useSWR('/api/manga', fetcher);

  const modal = useRef<any>();
  const lastBackPressed = useRef<number>();

  const syncImmediate = async () => {
    const RemotePackage = await CodePush.checkForUpdate();
    if (RemotePackage) {
      modal.current.init(RemotePackage);
    }
  };

  useNavigationcomponentDidAppear(() => {
    CodePush.allowRestart();
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'LOVEHUG',
          color: '#fff',
        },
      },
    });

    syncImmediate();
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onBackAndroid);
    }
  }, componentId);

  useNavigationcomponentDidDisappear(() => {
    CodePush.disallowRestart();
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', onBackAndroid);
    }
  }, componentId);

  const onBackAndroid = () => {
    if (
      lastBackPressed.current &&
      lastBackPressed.current + 2000 >= Date.now()
    ) {
      return false;
    }
    lastBackPressed.current = Date.now();
    ToastAndroid &&
      ToastAndroid.show('(;′⌒`) Press again to bye bye', ToastAndroid.SHORT);
    return true;
  };

  if (error) {
    return <Error title={'Failed Load'} code={503} />;
  }

  if (!data) {
    return <Loading ActivityProps={{color: '#fff', size: 25}} />;
  }

  const renderItem = (item: string, index: number) => {
    if (item === 'slide') {
      return null;
    } else if (item === 'top comment') {
      return (
        <React.Suspense
          key={index}
          fallback={<Loading ActivityProps={{color: '#fff', size: 15}} />}>
          <MultiComponent
            horizontal={true}
            data={data.content[item]}
            title={item}
            componentId={componentId}
          />
        </React.Suspense>
      );
    } else {
      return (
        <React.Suspense
          key={index}
          fallback={<Loading ActivityProps={{color: '#fff', size: 15}} />}>
          <MultiComponent
            horizontal={false}
            data={data.content[item]}
            title={item}
            componentId={componentId}
          />
        </React.Suspense>
      );
    }
  };

  return (
    <>
      <ScrollView>
        <React.Suspense
          fallback={<Loading ActivityProps={{color: '#fff', size: 25}} />}>
          <Slide componentId={componentId} data={data.content.slide} />
        </React.Suspense>
        {Object.keys(data.content).map(renderItem)}
      </ScrollView>
      <ModalUpdate ref={modal} />
    </>
  );
};

export default Home;
