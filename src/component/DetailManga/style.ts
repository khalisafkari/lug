import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  detailMangaContainer: {
    width,
    padding: 5,
    paddingBottom: 15,
  },
  coverContainer: {
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  cover: {
    width: width * 0.45,
    height: width * 0.65,
    borderRadius: 8,
    overflow: 'hidden',
  },
  subDetailContainer: {
    marginBottom: 15,
    paddingTop: 15,
  },
  otherWrapper: {
    alignItems: 'center',
  },
  otherName: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'capitalize',
    fontWeight: '800',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
    textAlign: 'center',
  },
  otherMagazine: {
    fontSize: 10,
    color: 'rgba(255,255,255,.5)',
    fontWeight: '400',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  otherBtnWrapper: {
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  otherBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  otherView: {
    fontSize: 12,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: '600',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  otherBtn: {
    padding: 5,
    borderRadius: 24,
    backgroundColor: 'rgba(245,168,30,255)',
  },
  line: {height: 2, backgroundColor: '#772953', marginVertical: 10},
  chapterContainer: {
    // height: 30,
    backgroundColor: '#772953',
    position: 'absolute',
    transform: [
      {
        translateX: width / 2 - 45,
      },
      {
        translateY: -5,
      },
    ],
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  chapterLabelText: {
    fontSize: 12,
    color: 'rgb(230,234,237)',
    textTransform: 'capitalize',
    // fontWeight: '600',
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  more: {
    alignItems: 'center',
  },
  genreWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBtn: {
    backgroundColor: 'rgba(255,255,255,.6)',
    padding: 0,
    margin: 3,
    borderRadius: 8,
  },
  genreLabel: {
    fontSize: 12,
    // color: '#906CF7',
    color: '#772953',
    fontWeight: '400',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
});

export default styles;
