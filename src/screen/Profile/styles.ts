import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  menuContainer: {
    flex: 1,
  },
  menuWrapper: {
    overflow: 'hidden',
    backgroundColor: '#404952',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginVertical: 1,
  },
  menuLabel: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  socialContainer: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-evenly',
    backgroundColor: '#404952',
  },
  socialWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  labelSocial: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '900',
    textTransform: 'uppercase',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default styles;
