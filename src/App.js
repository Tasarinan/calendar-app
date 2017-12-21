import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import db from './redux/db';
import { insertTasks, insertCategories } from './redux/actions/taskActions';
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

/* Initialize */
db
  .table('tasks')
  .allDocs({include_docs: true})
  .then(res => {
    store.dispatch(insertTasks(
      res.rows.map(r => ({...r.doc, date: new Date(r.doc.date)}))
    ));
  });

db
  .table('categories')
  .allDocs({include_docs: true})
  .then(res => {
    store.dispatch(insertCategories(
      res.rows.map(r => r.doc)
    ));
    store.dispatch({ type: 'LOADING_STOP' });
  });
/* End initialization */
