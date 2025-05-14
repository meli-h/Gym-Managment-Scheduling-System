import { sequelize } from '../config/db.js';
import AccountModel from './account.js';
import PersonModel from './person.js';
import AdminModel from './administrator.js';
import MemberModel from './gymMember.js';
import TrainerModel from './trainer.js';
import MembershipModel from './membership.js';
import ReservationModel from './reservation.js';

// MODELLER
export const Account = AccountModel(sequelize, Sequelize.DataTypes);
export const Person = PersonModel(sequelize, Sequelize.DataTypes);
export const Administrator = AdminModel(sequelize, Sequelize.DataTypes);
export const GymMember = MemberModel(sequelize, Sequelize.DataTypes);
export const Trainer = TrainerModel(sequelize, Sequelize.DataTypes);
export const Membership = MembershipModel(sequelize, Sequelize.DataTypes);
export const Reservation = ReservationModel(sequelize, Sequelize.DataTypes);

// İLİŞKİLER  ----------------------------------

// Person 1‑1 Account
Person.belongsTo(Account, { foreignKey: 'account_name', as: 'account' });
Account.hasOne(Person, { foreignKey: 'account_name', as: 'person' });

// Person 1‑1 Administrator
Administrator.belongsTo(Person, { foreignKey: 'person_id', as: 'person' });
Person.hasOne(Administrator, { foreignKey: 'person_id', as: 'administrator' });

// ISA ‑ GymMember & Trainer alt‑tür
GymMember.belongsTo(Person, { foreignKey: 'gymmember_id', as: 'person' });
Person.hasOne(GymMember, { foreignKey: 'gymmember_id', as: 'member' });

Trainer.belongsTo(Person, { foreignKey: 'trainer_id', as: 'person' });
Person.hasOne(Trainer, { foreignKey: 'trainer_id', as: 'trainer' });

// GymMember 1‑M Membership
Membership.belongsTo(GymMember, { foreignKey: 'gymmember_id' });
GymMember.hasMany(Membership, { foreignKey: 'gymmember_id' });

// Reservation ilişkileri
Reservation.belongsTo(GymMember, { foreignKey: 'gymmember_id' });
GymMember.hasMany(Reservation, { foreignKey: 'gymmember_id' });

Reservation.belongsTo(Trainer, { foreignKey: 'trainer_id' });
Trainer.hasMany(Reservation, { foreignKey: 'trainer_id' });

// -----------------------------------------------------------

// BAĞLANTI TESTİ
export const initDB = async () => {
  await sequelize.authenticate();        // bağlantıyı doğrula
  console.log('✅  Database connection established (no schema changes).');
};
// 'use strict';

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;



