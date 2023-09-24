const mysql = require('mysql');

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'kk', 
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    throw err;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;
