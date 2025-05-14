//const { Sequelize } = require('sequelize');
//const config = require('./config.json').development;  // CJS sürümü

//const sequelize = new Sequelize(
//config.database,
//config.username,
//config.password,
//{ host: config.host, dialect: config.dialect }
//);

//module.exports = sequelize;


// ES Modules kullanıyorsanız .mjs uzantısı verin veya "type":"module" ekleyin.
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();      // .env →  DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false          // SQL çıktısını görmek isterseniz true
    }
);
