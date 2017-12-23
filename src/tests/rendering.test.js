import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from "react-redux";
import moment from 'moment';
import store from '../redux/store';
import Task from '../components/task';
import NewTask from '../components/task-new';
import TaskDetails from '../components/task-details';
import Sidepanel from '../components/sidepanel';
import Calendar from '../components/calendar';
import db from '../redux/db';

const div = document.createElement('div');
const task = {
  _id: 'String',
  title: 'Title',
  description: 'Desc',
  completed: true,
  date: moment(),
  startTime: null,
  endTime: null,
  category: {
    _id: 'default_category',
    color: '#ffffff',
    name: 'Default category',
  }
};

const withStore = (component) => () => {
  ReactDom.render(
    <Provider store={store}>
      {component}
    </Provider>
  , div);
}

it('Task', () => {
  ReactDom.render(<Task task={task}/>, div);
});

it('New task modal', withStore(<NewTask isOpen/>));

it('Edit task modal', withStore(<NewTask task={task} isOpen/>));

it('Task details modal', withStore(<TaskDetails task={task} enabled/>));

it('Sidepanel', withStore(<Sidepanel />));

it('Calendar', withStore(<Calendar />));

db.tables.forEach(table => table.destroy());
