import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    padding: 5,
    width,
  },
  Wrapper: {
    backgroundColor: '#772953',
    flexDirection: 'row',
    width: width - 10,
    padding: 5,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  WrapperCover: {
    flexDirection: 'row',
  },
  imageWrapper: {
    height: 50,
    width: 50 * 1.5,
    borderRadius: 8,
  },
  WrapperLabel: {
    paddingHorizontal: 5,
    width: width - 50 * 1.5 - 40,
  },
  name: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  last: {
    fontSize: 10,
    color: 'rgba(255,255,255,.5)',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  WrapperClose: {
    position: 'absolute',
    right: 5,
    padding: 5,
    backgroundColor: 'rgba(0,0,0,.6)',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
