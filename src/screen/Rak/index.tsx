import React from 'react';
import {ScrollView} from 'react-native';
import Loading from 'component/Loading';

interface props {
  componentId: string;
}

const BookmarkL = React.lazy(() => import('@component/BookmarkL'));
const History = React.lazy(() => import('@component/History'));

const Rak: React.FC<props> = (props) => {
  return (
    <ScrollView>
      <React.Suspense
        fallback={<Loading ActivityProps={{size: 20, color: '#fff'}} />}>
        <BookmarkL componentId={props.componentId} />
      </React.Suspense>
      <React.Suspense
        fallback={<Loading ActivityProps={{size: 20, color: '#fff'}} />}>
        <History componentId={props.componentId} />
      </React.Suspense>
    </ScrollView>
  );
};

export default Rak;
