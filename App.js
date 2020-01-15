import { Container } from "native-base";
import React, { Component } from "react";
import Navigation from "./src/navigation";

class App extends Component {
  render() {
    return (
      <Container>
        <Navigation />
      </Container>
    );
  }
}

export default App;
