import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
    , TouchableWithoutFeedback, Text
    , KeyboardAvoidingView } from 'react-native';
import styles from './styles.js';

import  CNRichTextEditor , { CNToolbar, getInitialObject , getDefaultStyles } from "react-native-cn-richtext-editor";

const defaultStyles = getDefaultStyles();

class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTag : 'body',
            selectedStyles : [],
            value: [getInitialObject()]
        };

        this.editor = null;
    }

    onStyleKeyPress = (toolType) => {
        this.editor.applyToolbar(toolType);
    }

    onSelectedTagChanged = (tag) => {
        this.setState({
            selectedTag: tag
        })
    }

    onSelectedStyleChanged = (styles) => {
        this.setState({
            selectedStyles: styles,
        })
    }

    onValueChanged = (value) => {
        this.setState({
            value: value
        });
    }


    render() {
        return (
            <KeyboardAvoidingView
                behavior="padding"
                enabled
                keyboardVerticalOffset={0}
                style={{
                    flex: 1,
                    paddingTop: 20,
                    backgroundColor:'#eee',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
                    <View style={styles.main}>
                        <CNRichTextEditor
                            ref={input => this.editor = input}
                            onSelectedTagChanged={this.onSelectedTagChanged}
                            onSelectedStyleChanged={this.onSelectedStyleChanged}
                            value={this.state.value}
                            style={{ backgroundColor : '#fff'}}
                            styleList={defaultStyles}
                            onValueChanged={this.onValueChanged}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <View style={{
                    minHeight: 35
                }}>

                    <CNToolbar
                        size={28}
                        bold={<Text style={[styles.toolbarButton, styles.boldButton]}>B</Text>}
                        italic={<Text style={[styles.toolbarButton, styles.italicButton]}>I</Text>}
                        underline={<Text style={[styles.toolbarButton, styles.underlineButton]}>U</Text>}
                        lineThrough={<Text style={[styles.toolbarButton, styles.lineThroughButton]}>S</Text>}
                        body={<Text style={styles.toolbarButton}>T</Text>}
                        title={<Text style={styles.toolbarButton}>h1</Text>}
                        heading={<Text style={styles.toolbarButton}>h3</Text>}
                        ul={<Text style={styles.toolbarButton}>ul</Text>}
                        ol={<Text style={styles.toolbarButton}>ol</Text>}

                        selectedTag={this.state.selectedTag}
                        selectedStyles={this.state.selectedStyles}
                        onStyleKeyPress={this.onStyleKeyPress} />
                </View>
            </KeyboardAvoidingView>
        );
    }

}


export default Editor;
