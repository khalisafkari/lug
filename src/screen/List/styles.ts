import {StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

const styles = StyleSheet.create({
  viewWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  searchContainer: {
    backgroundColor: '#772953',
    padding: 5,
    height: 56,
    justifyContent: 'center',
  },
  searchWrapper: {
    backgroundColor: 'rgba(244,244,244,1)',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  inputWrapper: {
    flex: 1,
  },
  searchBtn: {
    backgroundColor: '#333',
    height: 40,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    justifyContent: 'center',
    padding: 8,
  },
  containerMore: {
    padding: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  wrapperMore: {
    backgroundColor: '#772953',
    padding: 10,
    overflow: 'hidden',
    borderRadius: 8,
  },
  moreLabel: {
    fontSize: 12,
    color: 'rgb(230,234,237)',
    textTransform: 'capitalize',
    fontWeight: '600',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default styles;
