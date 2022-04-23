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
    .createTable("category", {
      id: {
        type: "int",
        primaryKey: true,
        autoIncrement: true,
        unsigned: true,
      },
      name: { 
        type: "string", 
        length: 100, 
        notNull: true 
      }
    })
    .then(() => insertCategories(db));
};

exports.down = function(db) {
	return db.dropTable("category");
};

exports._meta = {
  "version": 1
};

function insertCategories(db){
	return categoryNames.map( c => db.insert('category', ['name'], c))
}

const categoryNames = [
	['Red Wine'],
	['White Wine'],
	['Rosé Wine'],
	['Sparkling Wine']
]