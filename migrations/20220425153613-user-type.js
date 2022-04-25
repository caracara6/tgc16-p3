'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db
    .createTable("user_type", {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        unsigned: true,
      },
      name: { 
        type: "string", 
        notNull: true 
      },
    })
    .then(() => addUserTypes(db));
};

exports.down = function (db) {
  return db.dropTable("user_type");
};

exports._meta = {
  "version": 1
};

function addUserTypes(db) {
  return userTypes.map(type => db.insert("user_type", ["name"], type));
}

const userTypes = [["shop_owner"], ["manager"], ["customer"]];