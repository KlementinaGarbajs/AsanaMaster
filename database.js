import MySqlConnection from 'react-native-my-sql-connection';
 
let config = {
    host:'hostname',
    database:'AsanaMaster',
    user:'root',
    password:'19Humpback.96',
    port:3306
    };
    try{
        const connection = await MySqlConnection.createConnection(config);
        let res = await connection.executeQuery('SELECT * FROM myTable');
        connection.close();
    }catch(err){
        // handle error
    }