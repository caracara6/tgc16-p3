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
  return db.createTable('product_size', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true,
      unsigned: true
    },
    size_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'products_sizes_size_id',
        table: 'size',
        mapping: 'id',
        rules:{
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    },
    product_id: {
      type: 'int',
      unsigned: true,
      notNull: true,
      foreignKey: {
        name: 'products_sizes_product_id',
        table: 'product',
        mapping: 'id',
        rules:{
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        }
      }
    }
  });
};

exports.down = function(db) {
  return db.dropTable('product_size');
};

exports._meta = {
  "version": 1
};
