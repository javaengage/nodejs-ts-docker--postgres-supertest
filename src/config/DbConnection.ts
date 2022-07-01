import { Sequelize } from 'sequelize-typescript'

const env = process.env.NODE_ENV || 'development';
const dbConfig = require('./DbConfig')[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    models: [__dirname + '/../models'],
    repositoryMode: true
});

const db = {
    Sequelize,
    sequelize
}

export  default db;
