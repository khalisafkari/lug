import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {},
  top: {
    height: 56,
    backgroundColor: '#772953',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    textTransform: 'lowercase',
    flex: 1,
  },
  subtitle: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
  },
  btnContainer: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25,
  },
});

export default styles;
