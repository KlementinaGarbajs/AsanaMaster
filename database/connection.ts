let mysql = require('mysql2');
 
// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'asanamaster',
  password: '',
  port: 3306,
});

connection.connect(function(err: { message: string; }) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the MySQL server.');
});
   
export default connection;