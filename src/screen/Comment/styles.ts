import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  commentContainer: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  commentInput: {
    flex: 1,
  },
  commentBtnWrapper: {
    padding: 5,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 25,
  },
  root: {
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
});

export default styles;
