import React from 'react';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import './styles/App.css';
import store from './redux/store';
import initialize from './util/initialization';

import Calendar from './components/calendar';
import Sidepanel from './components/sidepanel';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    type: 'dark'
  }
});

initialize();

export default class App extends React.Component {
  constructor() {
    super();

    this.state = { loading: true };

    store.subscribe(this.handleLoading);
  }

  handleLoading = () => {
    const state = store.getState();
    
    if (!state.app.loading === this.state.loading) {
      this.setState({ loading: state.app.loading });
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loading ?
          <div className="App-loading">Loading...</div> :
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Calendar />
              <Sidepanel />
            </div>
          </MuiThemeProvider>
        }
      </Provider>
    );
  }
}
