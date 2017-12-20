import Pouchdb from 'pouchdb';

const databaseNames = [
  'tasks',
  'categories',
];

class Database {
  constructor() {
    this.tables = databaseNames.map(n => new Pouchdb(n));
  }

  table(name) {
    return this.tables[databaseNames.findIndex(n => n === name)];
  }
}

const base = new Database();

export default base;