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



  db.run(`
    CREATE TABLE IF NOT EXISTS followups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT,
      type TEXT,
      note TEXT,
      next_action TEXT,
      status TEXT
    )
  `);



  db.run(`
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT,
      product TEXT,
      description TEXT,
      amount REAL,
      status TEXT,
      date TEXT
    )
  `);



  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer TEXT,
      product TEXT,
      description TEXT,
      status TEXT,
      delivery_date TEXT
    )
  `);



});


module.exports = db;
