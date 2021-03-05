import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  slideContainer: {
    marginTop: 5,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.98,
    height: width * 0.5,
  },
  cornerName: {
    backgroundColor: '#772953',
    width: width * 0.98 - 22,
  },
  cornerLabel: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#0080ff',
    zIndex: 30,
  },
  cornerTime: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderBottomRightRadius: 8,
    backgroundColor: '#2ECC40',
  },
  cornerLabelText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default styles;
