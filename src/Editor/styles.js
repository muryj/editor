import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  main: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 1,
    alignItems: 'stretch'
  },
  toolbarButton: {
    fontSize: 20,
    width: 28,
    height: 28,
    textAlign: 'center'
  },
  italicButton: {
    fontStyle: 'italic'
  },
  boldButton: {
    fontWeight: 'bold'
  },
  underlineButton: {
    textDecorationLine: 'underline'
  },
  lineThroughButton: {
    textDecorationLine: 'line-through'
  },
  mainContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  save: {
    height: 30,
    backgroundColor: 'purple',
    borderRadius: 16,
    width: 80,
    padding: 5,
    borderWidth: 1,
    borderColor: '#E9E2F4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#E9E2F4',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
