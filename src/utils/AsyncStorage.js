import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

export const setNote = async (note) => {
  const existingProducts = await AsyncStorage.getItem('notes');
  let newNote = JSON.parse(existingProducts);
  if (!newNote) {
    newNote = [];
  }
  newNote.push(note);

  await AsyncStorage.setItem('notes', JSON.stringify(newNote))
    .then(() => {
      console.log('saved successfully');
    })
    .catch(() => {
      console.log('error');
    });
  Actions.face();
};

export const getNote = async () => await AsyncStorage.getItem('notes');
