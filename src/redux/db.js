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

  deleteItems(name, items) {
    const table = this.table(name);
    try {
      items.forEach(async item => {
        await table.remove(item.id, item.rev);
      });
    } catch (e) {
      console.log('Error while deleting old tasks');
    }
  }
}

const base = new Database();

export default base;