import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -10,
  },
  update: {
    width: 300,
    opacity: 0,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  header: {
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
    borderRadius: 5,
    backgroundColor: '#772953',
  },
  header_bg: {
    position: 'absolute',
    left: 0,
    bottom: -1,
    width: 300,
    height: 62,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  packageSize: {
    fontSize: 14,
    paddingBottom: 10,
  },
  new: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 15,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
  },
  body: {
    maxHeight: 300,
    paddingHorizontal: 15,
    marginTop: -10,
    zIndex: 1,
  },
  btn_submit: {
    borderRadius: 3,
    height: 38,
    borderWidth: 1,
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_text: {
    fontSize: 14,
    color: '#fff',
  },
  progress: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  progresswrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    borderColor: '#f1f1f1',
  },
  progresscon: {
    height: 15,

    borderRadius: 10,
  },
  progresstext: {
    marginLeft: 10,
  },
  download: {
    padding: 15,
  },
  download_tip: {
    textAlign: 'center',
    color: '#999',
    paddingBottom: 10,
  },
  btnUpdate: {
    flex: 1,
    margin: 5,
    height: 38,
    borderColor: '#772953',
    backgroundColor: '#772953',
  },
});

export default styles;
