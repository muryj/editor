import React, { useState, useMemo } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import DialogInput from "react-native-dialog-input";
import AsyncStorage from "@react-native-community/async-storage";
import styles from "./styles";

function Face(props) {
  const { note } = props;
  const [isDialogVisible, setDialog] = useState(false);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("@storage_Key", "stored value");
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setDialog(true)}>
        <Text>Create new note</Text>
      </TouchableOpacity>
      <DialogInput
        isDialogVisible={isDialogVisible}
        title={"New note"}
        message={"Please name your note"}
        hintInput={"name"}
        submitInput={inputText => {
          this.sendInput(inputText);
        }}
        closeDialog={() => setDialog(false)}
      />
    </View>
  );
}
export default props => useMemo(() => <Face {...props} />, [props]);
