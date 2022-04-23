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
    .createTable("producer", {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        unsigned: true,
      },
      name: { 
        type: "string", 
        length: 300, 
        notNull: true 
      },
      description: { 
        type: "string", 
        length: 1000
      },
      image_url: { 
        type: "string", 
        length: 500
      }
    })
};

exports.down = function(db) {
  return db.dropTable("producer");
};

exports._meta = {
  "version": 1
};
