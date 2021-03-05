import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 40,
  },
  btnLogin: {
    height: 45,
    backgroundColor: '#772953',
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  registerContainer: {
    marginHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    color: '#fff',
    fontSize: 13.5,
  },
});

export default styles;
