import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    height: 56,
    backgroundColor: '#772953',
    width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  botContainer: {
    position: 'absolute',
    height: 56,
    backgroundColor: '#772953',
    width,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btnContainer: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25,
  },
  titleManga: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    textTransform: 'capitalize',
  },
  chapterManga: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default styles;
