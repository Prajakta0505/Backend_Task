const config = require('../config/db.config.js');
const { Sequelize, DataTypes } = require('sequelize');

const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';


const db = {};

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user.model.js')(sequelize, DataTypes);
db.Task = require('./task.model.js')(sequelize, DataTypes);

module.exports = db;
