import React, { Component } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import CNRichTextEditor, {
  CNToolbar,
  getDefaultStyles,
  getInitialObject
} from 'react-native-cn-richtext-editor';
import { setNote } from '../utils/AsyncStorage';
import styles from './styles.js';

const defaultStyles = getDefaultStyles();

class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTag: 'body',
      selectedStyles: [],
      note: {
        name: props.note.name || '',
        category: props.note.category || '',
        text: props.note.text || [getInitialObject()]
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
      ...this.state,
      note: { ...this.state.note, text: value }
    });
  };

  renderCategorySection = () => (
    <View style={styles.mainContainer}>
      <View style={styles.categoryContainer}>
        <Text>Category:</Text>
        <TouchableOpacity
          style={[
            styles.category,
            this.state.note.category === 'home' && styles.selected
          ]}
          onPress={() => {
            if (this.state.note.category === 'home') {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: '' }
              });
            } else {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: 'home' }
              });
            }
          }}
        >
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            this.state.note.category === 'work' && styles.selected
          ]}
          onPress={() => {
            if (this.state.note.category === 'work') {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: '' }
              });
            } else {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: 'work' }
              });
            }
          }}
        >
          <Text>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.category,
            this.state.note.category === 'sport' && styles.selected
          ]}
          onPress={() => {
            if (this.state.note.category === 'sport') {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: '' }
              });
            } else {
              this.setState({
                ...this.state,
                note: { ...this.state.note, category: 'sport' }
              });
            }
          }}
        >
          <Text>Sport</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.save}
        onPress={() => setNote(this.state.note)}
      >
        <Text>Save</Text>
      </TouchableOpacity>
    </View>
  );

  renderToolbar = () => (
    <View
      style={{
        minHeight: 35
      }}
    >
      <CNToolbar
        size={28}
        bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
        italic={
          <Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>
        }
        underline={
          <Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>
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
  );

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
        {!this.props.note.text ? this.renderCategorySection() : null}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.main}>
            <CNRichTextEditor
              ref={(input) => (this.editor = input)}
              onSelectedTagChanged={this.onSelectedTagChanged}
              onSelectedStyleChanged={this.onSelectedStyleChanged}
              value={this.state.note.text}
              style={{ backgroundColor: '#fff' }}
              styleList={defaultStyles}
              onValueChanged={this.onValueChanged}
              disabled={!this.props.note.text}
            />
          </View>
        </TouchableWithoutFeedback>

        {!this.props.note.text ? this.renderToolbar() : null}
      </KeyboardAvoidingView>
    );
  }
}

export default Editor;
