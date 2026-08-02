const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./printlead.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      company TEXT,
      phone TEXT,
      email TEXT
    )
  `);
});

module.exports = db;
