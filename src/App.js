import React from 'react';
import './styles/App.css';

import Calendar from './components/calendar';
import Sidepanel from './components/sidepanel';

export default () => (
  <div className="App">
    <Calendar />
    <Sidepanel />
  </div>
);
