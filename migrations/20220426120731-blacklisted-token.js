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

exports.up = function(db) {
  return db.createTable('blacklisted_token', {
       id: {
		   type:'bigint', 
		   primaryKey:true, 
		   autoIncrement:true
		},
       token: { 
		   type: 'string', 
		   length:5000
		},
       date_created : {
		   type:'date'
		}
  })
};

exports.down = function(db) {
  return db.dropTable('blacklisted_token');
};

exports._meta = {
  "version": 1
};
