const mysql=require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
    host     :  process.env.HOST,
    user     :  process.env.USER,
    database :  process.env.DATABASE,
});

db.connect((err) => {
    if (err){
        throw err;
    }
    console.log("mysql connected <3 ");
});

module.exports=db;