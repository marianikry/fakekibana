const db = require('better-sqlite3')('logs.db', {verbose: console.log});
db.exec('create table if not exists log_table(creation text, log text)');

module.exports = db;
