import Pouchdb from 'pouchdb';

const databaseNames = [
  'tasks',
  'categories',
  'settings',
];

class Database {
  constructor() {
    this.tables = databaseNames.map(n => new Pouchdb(n));
  }

  table(name) {
    return this.tables[databaseNames.findIndex(n => n === name)];
  }

  getAllDocs(name, callback) {
    const promise = this.table(name).allDocs({include_docs: true});
    return !callback ? promise : promise.then(callback);
  }

  deleteAllTables() {
    this.tables.forEach(table => table.destroy());
  }
}

const base = new Database();

export default base;