import React from 'react';
import {ScrollView} from 'react-native';
import useSWR from 'swr';
import instance from 'utils/instance';
import Error from 'component/Error';
import Loading from 'component/Loading';
import {useNavigationcomponentDidAppear} from 'utils/hook/navigation';
import {Navigation} from 'react-native-navigation';

const fetcher = (url: string) => instance.get(url).then((res) => res.data);

interface props {
  componentId: string;
}

const Slide = React.lazy(() => import('@component/Slide'));
const MultiComponent = React.lazy(() => import('@component/Multi'));

const Home: React.FC<props> = ({componentId}) => {
  const {data, error} = useSWR('/api/manga', fetcher);

  useNavigationcomponentDidAppear(() => {
    Navigation.mergeOptions(componentId, {
      topBar: {
        title: {
          text: 'LOVEHUG',
          color: '#fff',
        },
      },
    });
  }, componentId);

  if (error) {
    return <Error title={'Failed Load'} code={503} />;
  }

  if (!data) {
    return <Loading ActivityProps={{color: '#fff', size: 25}} />;
  }

  return (
    <ScrollView>
      <React.Suspense
        fallback={<Loading ActivityProps={{color: '#fff', size: 25}} />}>
        <Slide componentId={componentId} data={data.content.slide} />
      </React.Suspense>
      {Object.keys(data.content).map((item, index) => {
        if (item === 'slide') {
          return null;
        }
        if (item === 'top comment') {
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
        }
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
      })}
    </ScrollView>
  );
};

export default Home;
