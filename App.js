import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import Editor from './src/Editor';
import Face from './src/Face';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="face" component={Face} title="Notes" initial />
      <Scene key="editor" component={Editor} title="Edit note"  />
    </Stack>
  </Router>
);

export default App;
