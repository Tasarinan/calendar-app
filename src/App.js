import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import './styles/App.css';

import Calendar from './components/calendar';
import Sidepanel from './components/sidepanel';

export default () => (
  <Provider store={store}>
    <div className="App">
      <Calendar />
      <Sidepanel />
    </div>
  </Provider>
);
