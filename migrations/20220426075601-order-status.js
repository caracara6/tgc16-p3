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
  return db.createTable("order_status", {
    id: { 
      type: "int", 
      primaryKey: true, 
      unsigned: true, 
      autoIncrement: true },
    name: { 
      type: "string", 
      length: 100, 
      notNull: true },
  }).then(() => insertOrderStatuses(db));
};

exports.down = function (db) {
  return db.dropTable("order_status");
};

exports._meta = {
  "version": 1
};

function insertOrderStatuses(db){
	return orderStatuses.map( o => db.insert('order_status', ['name'], o))
}

const orderStatuses = [
	['Pending Payment'],
	['Payment Confirmed'],
	['Preparing for Delivery'],
	['Out for Delivery'],
  ['Delivered']
]