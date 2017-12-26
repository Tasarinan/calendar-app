import React from 'react';
import { Provider } from 'react-redux';
import moment from 'moment';
import schedule from 'node-schedule';
import './styles/App.css';
import store from './redux/store';
import db from './redux/db';

import { insertTasks, insertCategories } from './redux/actions/taskActions';
import { changeDate, changeFocusedDay } from './redux/actions/calendarActions';
import { saveSettings } from "./redux/actions/appActions";

import Calendar from './components/calendar';
import Sidepanel from './components/sidepanel';
let ipcRenderer;
if (window.require) {
  ipcRenderer = window.require('electron').ipcRenderer;
}

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
let tasksToDelete = [];

const loadTasks = () => {
  const del = store.getState().app.settings.deleteOldTasks;
  const delInfo = store.getState().app.settings.deleteTasksAfter;
  return db.getAllDocs('tasks', res => {
    let tasks = res.rows.map(r => ({...r.doc, date: moment(r.doc.date)}));
    if (del) {
      const delDate = moment().subtract(delInfo.count, delInfo.name);

      tasks = tasks.filter(t => {
        const toDelete = t.date.isBefore(delDate, 'day');
        if (toDelete) {
          tasksToDelete.push({id: t._id, rev: t._rev});
        }
        return !toDelete;
      });
    }
    createNotifications(tasks);
    store.dispatch(insertTasks(tasks));
  });
}

const loadCategories = () => {
  return db.getAllDocs('categories', res => {
    store.dispatch(insertCategories(
      res.rows.map(r => r.doc)
    ));
  });
}

const loadSettings = () => {
  return db.table('settings').get('settings_bundle').then(res => {
    store.dispatch(saveSettings(res, true));
  }).catch(e => {
    store.dispatch(saveSettings({}));
  });
}

const updateMomentJs = () => {
  moment.updateLocale('en', {
    week: {
      dow: store.getState().app.settings.weekStart,
    },
  });
}

const createNotifications = (tasks) => {
  const now = moment();
  tasks.forEach(t => {
    if (!t.completed && t.startTime) {
      const date = moment(t.date)
          .hour(t.startTime.hours)
          .minute(t.startTime.minutes);
      if (date.isAfter(now)) {
        schedule.scheduleJob(date.toDate(), () => {
          new Notification(t.title, {
            body: 'Its time to start this task'
          }).onclick = () => {
            ipcRenderer.send('focusWindow', 1);
            store.dispatch(changeDate(date));
            store.dispatch(changeFocusedDay(date));
          };
        });
      }
    }
  });
}
loadSettings()
  .then(loadCategories)
  .then(loadTasks)
  .then(updateMomentJs)
  .then(() => {
    if (tasksToDelete.length > 0) {
      db.deleteItems('tasks', tasksToDelete);
    }
    store.dispatch({ type: 'LOADING_STOP' });
  });
/* End initialization */