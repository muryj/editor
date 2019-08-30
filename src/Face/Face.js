import React, { useState, useMemo, useEffect } from 'react';
import { TouchableOpacity, Text, View, FlatList } from 'react-native';
import DialogInput from 'react-native-dialog-input';
import { Actions } from 'react-native-router-flux';
import styles from './styles';
import { getNote } from '../utils/AsyncStorage';

function Face() {
  const [isDialogVisible, setDialog] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFiltered] = useState([]);
  const [filter, setFilter] = useState('all');

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
    setFiltered(notes);
  }, [notes]);

  useEffect(() => {
    let filtered;
    switch (filter) {
      case 'home':
        filtered = notes.filter((item) => item.category === 'home');
        break;
      case 'work':
        filtered = notes.filter((item) => item.category === 'work');
        break;
      case 'sport':
        filtered = notes.filter((item) => item.category === 'sport');
        break;
      default:
        filtered = notes;
        break;
    }
    setFiltered(filtered);
  }, [filter]);


  const renderNotes = () => (
    <View style={styles.listContainer}>
      <FlatList
        data={filteredNotes}
        keyExtractor={(item, index) => `note${index}`}
        onEndReached={() => {}}
        onEndReachedThreshold={0.01}
        disableVirtualization
        renderItem={({ item }) => renderNote(item)}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getNote().then((response) => setNotes(JSON.parse(response)));
        }}
      />
    </View>
  );

  const renderNewButton = () => (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        setDialog(true);
        console.log(notes, 'lol');
      }}
    >
      <Text>Create new note</Text>
    </TouchableOpacity>
  );

  const renderNote = (note) => (
    <TouchableOpacity style={styles.note} onPress={() => {
      Actions.editor({
        note: { name: note.name, text: note.text, category: note.category },
        title: `Note ${note.name}`
      });
    }}>
      <Text>{note.name}</Text>
    </TouchableOpacity>
  );

  const renderFilters = () => (
    <View style={styles.categoryContainer}>
      <Text>Filter:</Text>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setFilter('all')}
      >
        <Text>All</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setFilter('home')}
      >
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setFilter('work')}
      >
        <Text>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.category}
        onPress={() => setFilter('sport')}
      >
        <Text>Sport</Text>
      </TouchableOpacity>
    </View>
  );
  const renderModal = () => (
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
  );

  return (
    <View style={styles.container}>
      {renderNewButton()}
      {renderFilters()}
      {renderNotes()}
      {renderModal()}
    </View>
  );
}
export default (props) => useMemo(() => <Face {...props} />, [props]);
