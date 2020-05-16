import React, { Component } from "react";
import Navigation from "./src/navigation";
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


class App extends Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <Navigation />
      </PaperProvider>

    );
  }
}

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'sans-serif',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'sans-serif-medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'sans-serif-light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'sans-serif-thin',
      fontWeight: 'normal',
    },
  },
};


const theme = {
  ...DefaultTheme,
  roundness: 2,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export default App;
