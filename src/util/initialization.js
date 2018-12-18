import moment from 'moment';
import schedule from 'node-schedule';
import db from '../redux/db';
import store from '../redux/store';
import Api, { createApi } from '../services/api';

import { insertTasks, insertCategories } from '../redux/actions/taskActions';
import { changeDate, changeFocusedDay } from '../redux/actions/calendarActions';
import { saveSettings, login } from '../redux/actions/appActions';

let ipcRenderer;
if (window.require) {
  ipcRenderer = window.require('electron').ipcRenderer;
};

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

const loadTasksFromApi = () => {
  if (!store.getState().app.loggedIn) {
    return;
  }
  if (!Api()) {
    createApi(
      store.getState().app.token,
      store.getState().app.settings.selectedCalendar,
    ); 
  };
  return Api().getTasks().then(res => {
    if (res) {
      store.dispatch(insertTasks(res));
    }
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

const loadUser = () => {
  return db.getAllDocs('user_data').then(res => {
    const token = res.rows.find(r => r.id === 'token');
    if(token) {
      store.dispatch(login(token.doc, true));
    }
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

export default () => loadSettings()
  .then(loadUser)
  .then(loadCategories)
  .then(loadTasks)
  .then(loadTasksFromApi)
  .then(() => {
    updateMomentJs()
    if (tasksToDelete.length > 0) {
      db.deleteItems('tasks', tasksToDelete);
    }
    store.dispatch({ type: 'LOADING_STOP' });
  });
