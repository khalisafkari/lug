import {Dimensions, StyleSheet} from 'react-native';

const width = Dimensions.get('window').width;


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: width * 0.95,
    opacity: 0,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  header: {
    height: 120,
    backgroundColor: '#772953',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  header_bg: {
    height: 62,
    width: width * 0.95,
    position: 'absolute',
    bottom: 0,
  },
  newLabel: {
    color: '#fff',
    fontSize: 15,
    marginLeft: 15,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  bodyContainer: {
    maxHeight: width * 0.95,
    paddingHorizontal: 15,
    marginTop: -10,
    zIndex: 1,
  },
  labelSize: {
    fontSize: 10,
    paddingBottom: 10,
    color: '#772953',
    fontWeight: 'bold',
    textTransform:'uppercase'
  },
  labelHash: {
    color: '#000',
    fontSize: 10,
  },
  updateInfoContainer: {
    backgroundColor: '#333',
    marginBottom: 10,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 8,
    height: 100,
  },
  labelUpddateInfo: {
    color: '#4fff00',
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingBottom: 10,
  },
  labelBtnWhite: {
    borderRadius: 3,
    height: 38,
    borderWidth: 1,
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#772953',
  },
  labelBtnPurple: {
    borderRadius: 3,
    height: 38,
    borderWidth: 1,
    margin: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#772953',
  },
  labelH2: {
    fontSize: 14,
    color: '#772953',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  labelH2Purple: {
    fontSize: 14,
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  downloadContainer: {},
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  progressWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    borderWidth: 2,
    borderColor: '#f1f1f1',
  },
  progress: {
    height: 10,
    borderRadius: 8,
    backgroundColor: '#772953',
  },
  progressLabel: {
    marginLeft: 10,
    fontSize: 11,
  },
  containerInfo: {
    backgroundColor: '#333',
    marginVertical: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerInfoText: {
    color: '#4fff00',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default styles;
