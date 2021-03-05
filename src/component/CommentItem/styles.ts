import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  commentUI: {
    paddingLeft: 0,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentAvatar: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 10,
  },
  commentContent: {
    marginLeft: 16,
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  badgeText: {
    paddingHorizontal: 10,
    backgroundColor: '#772953',
    fontSize: 8,
    height: 10,
    color: '#fff',
    borderRadius: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    transform: [
      {
        translateY: -10,
      },
      {
        translateX: 2,
      },
    ],
  },
  names: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  times: {
    fontSize: 11,
    color: '#808080',
  },
  commentChpater: {
    paddingTop: 10,
  },
  chapter: {
    fontSize: 10,
    color: '#808080',
    textTransform: 'uppercase',
  },
});

export default styles;
