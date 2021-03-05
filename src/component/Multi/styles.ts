import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  labelContainer: {
    backgroundColor: '#772953',
    marginHorizontal: 2,
    marginVertical: 5,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    height: 30,
  },
  labelText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textTransform: 'uppercase',
  },
  verticaly: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.33,
    paddingVertical: 2,
  },
  cardWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  card: {
    width: width * 0.315,
    height: width * 0.44,
  },
  cornerName: {
    backgroundColor: '#772953',
    width: width * 0.315,
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
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export {width};
export default styles;
