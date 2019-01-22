import React, { Component } from "react";
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import StartScreen from './src/movie/screens/startScreen.js';
import rootReducer from './src/reducers/index';

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <StartScreen />
      </Provider>
    );
  }
}
export default App;
