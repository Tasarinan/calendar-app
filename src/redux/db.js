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

  getAllDocs(name, callback) {
    const promise = this.table(name).allDocs({include_docs: true});
    if (!callback) {
      return promise;
    }
    return promise.then(callback);
  }
}

const base = new Database();

export default base;