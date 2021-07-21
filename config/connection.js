 const Sequelize = require('sequelize');

 require('dotenv').config();
 //create connection to our database, pass in MySQL information for username and password

 let sequelize;

//gotten from 13.5.6- to connect the the jawsdb deployment
 if (process.env.JAWSDB_URL) {
   sequelize = new Sequelize(process.env.JAWSDB_URL);
 } else {
   sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
     host: 'localhost',
     dialect: 'mysql',
     port: 3306
   });
 }


 module.exports = sequelize;