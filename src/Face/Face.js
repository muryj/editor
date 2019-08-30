import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { getNote } from '../utils/AsyncStorage';

function Face(props) {
  const { note } = props;
  const [isDialogVisible, setDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notes, setNotes] = useState([]);

  const newNote = async (noteName) => {
    Actions.editor({
      note: { name: noteName },
      title: `Edit note ${noteName}`
    });
  };

  useEffect(() => {
    getNote().then((response) => setNotes(JSON.parse(response)));
  }, []);
  useEffect(() => {
    setRefreshing(false);
  }, [notes]);

  const renderNotes = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => `note${index}`}
        onEndReached={() => {}}
        onEndReachedThreshold={0.01}
        disableVirtualization
        renderItem={({ item }) => renderNote(item)}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        refreshing = {refreshing}
        onRefresh = {() => {
          setRefreshing(true);
          getNote().then((response) => setNotes(JSON.parse(response)));
        }
        }
      />
    </View>
  );

  const renderNote = (note) => (
    <TouchableOpacity style={styles.note}>
      <Text>{note.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setDialog(true);
          console.log(notes, 'lol');
        }}
      >
        <Text>Create new note</Text>
      </TouchableOpacity>
        {renderNotes()}
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={'New note'}
        message={'Please name your note'}
        hintInput={'name'}
        submitInput={(inputText) => {
          newNote(inputText).then(() => setDialog(false));
        }}
        closeDialog={() => setDialog(false)}
      />
    </View>
  );
}
export default (props) => useMemo(() => <Face {...props} />, [props]);
