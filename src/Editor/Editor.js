import React, { Component } from 'react';
import { Keyboard, KeyboardAvoidingView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import CNRichTextEditor, { CNToolbar, getDefaultStyles, getInitialObject } from 'react-native-cn-richtext-editor';
import { setNote } from '../utils/AsyncStorage';
import styles from './styles.js';

const defaultStyles = getDefaultStyles();


class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      value: [getInitialObject()],
      note: {
        name: props.note.name,
        category: '',
        text: ''
      }
    };

    this.editor = null;
  }

  onStyleKeyPress = (toolType) => {
    this.editor.applyToolbar(toolType);
  };

  onSelectedTagChanged = (tag) => {
    this.setState({
      selectedTag: tag
    });
  };

  onSelectedStyleChanged = (styles) => {
    this.setState({
      selectedStyles: styles
    });
  };

  onValueChanged = (value) => {
    this.setState({
      ...this.state, note: { ...this.state.note, text: value }
    });
  };


  render() {
    return (
      <KeyboardAvoidingView
        behavior="padding"
        enabled
        keyboardVerticalOffset={0}
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: '#eee',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}
      >
        <View style={styles.mainContainer}>
          <View style={styles.categoryContainer}>
            <Text>Category:</Text>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.setState({ ...this.state, note: { ...this.state.note, category: 'home' } })}
            >
              <Text>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.setState({ ...this.state, note: { ...this.state.note, category: 'work' } })}
            >
              <Text>Work</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.category}
              onPress={() => this.setState({ ...this.state, note: { ...this.state.note, category: 'sport' } })
              }
            >
              <Text>Sport</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.save} onPress={() => setNote(this.state.note)}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={(input) => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={this.state.value}
              style={{ backgroundColor: '#fff' }}
              styleList={defaultStyles}
              onValueChanged={this.onValueChanged}
            />
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            minHeight: 35
          }}
        >
          <CNToolbar
            size={28}
            bold={
              <Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>
            }
            italic={
              <Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>
            }
            underline={
              <Text style={[styles.toolbarButton, styles.underlineButton]}>
                U
              </Text>
            }
            lineThrough={
              <Text style={[styles.toolbarButton, styles.lineThroughButton]}>
                S
              </Text>
            }
            body={<Text style={styles.toolbarButton}>T</Text>}
            title={<Text style={styles.toolbarButton}>h1</Text>}
            heading={<Text style={styles.toolbarButton}>h3</Text>}
            ul={<Text style={styles.toolbarButton}>ul</Text>}
            ol={<Text style={styles.toolbarButton}>ol</Text>}
            selectedTag={this.state.selectedTag}
            selectedStyles={this.state.selectedStyles}
            onStyleKeyPress={this.onStyleKeyPress}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default Editor;
