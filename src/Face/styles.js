import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
  },
  button: {
    width: '100%',
    height: 50,
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E9E2F4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainer: {
    flex: 1,
    marginTop: 10
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  category: {
    height: 30,
    width: 50,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#E9E2F4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  note: {
    width: '100%',
    height: 60,
    borderWidth: 1,
    borderColor: 'grey',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE18F'
  }
});
