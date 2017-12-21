import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import db from './redux/db';
import { insertTasks, insertCategories } from './redux/actions/taskActions';
import './styles/App.css';

import Calendar from './components/calendar';
import Sidepanel from './components/sidepanel';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
    this.handleLoading = this.handleLoading.bind(this);
    store.subscribe(this.handleLoading);
  }

  handleLoading() {
    const state = store.getState()
    if (!state.app.loading === this.state.loading) {
      this.setState({ loading: state.app.loading });
    }
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.loading ?
          <div className="App-loading">Loading...</div> :
          <div className="App">
            <Calendar />
            <Sidepanel />
          </div>
        }
      </Provider>
    );
  }
}

/* Initialize */
const loadTasks = () => {
  return db.getAllDocs('tasks', res => {
    store.dispatch(insertTasks(
      res.rows.map(r => ({...r.doc, date: new Date(r.doc.date)}))
    ));
  });
}

const loadCategories = () => {
  db.getAllDocs('categories', res => {
    store.dispatch(insertCategories(
      res.rows.map(r => r.doc)
    ));
    store.dispatch({ type: 'LOADING_STOP' });
  });
}

loadTasks().then(loadCategories);
/* End initialization */