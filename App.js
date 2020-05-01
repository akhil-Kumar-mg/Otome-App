import { Container } from "native-base";
import React, { Component } from "react";
import Navigation from "./src/navigation";
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import rootReducer from './src/reducers/index';

class App extends Component {
  render() {
    return (
      <Provider store={createStore(rootReducer)}>
        <Container>
          <Navigation />
        </Container>
      </Provider>

    );
  }
}

export default App;
