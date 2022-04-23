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
    .createTable("product", {
		id: {
			type: "int",
			primaryKey: true,
			autoIncrement: true,
			unsigned: true,
		},
		producer_id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			foreignKey: {
			  name: 'producer_product_fk',
			  table: 'producer',
			  mapping: 'id',
			  rules:{
				onDelete: 'CASCADE',
				onUpdate: 'RESTRICT'
			  }
			}
		},
		category_id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			foreignKey: {
			  name: 'category_product_fk',
			  table: 'category',
			  mapping: 'id',
			  rules:{
				onDelete: 'CASCADE',
				onUpdate: 'RESTRICT'
			  }
			}
		},
		region_id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			foreignKey: {
			  name: 'product_region_fk',
			  table: 'region',
			  mapping: 'id',
			  rules:{
				onDelete: 'CASCADE',
				onUpdate: 'RESTRICT'
			  }
			}
		},
		origin_country_id: {
			type: 'int',
			unsigned: true,
			notNull: true,
			foreignKey: {
			  name: 'origin_country_product_fk',
			  table: 'origin_country',
			  mapping: 'id',
			  rules:{
				onDelete: 'CASCADE',
				onUpdate: 'RESTRICT'
			  }
			}
		},
		name: { 
			type: "string", 
			length: 255, 
			notNull: true 
		},
		description: { 
			type: "string", 
			length: 1000
		},
		nose_attribute: { 
			type: "string", 
			length: 500
		},
		mouth_attribute: { 
			type: "string", 
			length: 500
		},
		alcohol_percentage: { 
			type: "string", 
			length: 10
		},
		price: { 
			type: "int", 
			unsigned: true,
			notNull: true 
		},
		stock: {
			type: 'smallint',
			unsigned: true,
			notNull: true
		},
		vintage: {
			type: 'int',
			unsigned: true
		},
		image_url: { 
			type: "string", 
			length: 500, 
			notNull: true 
		},
		thumbnail_url: { 
			type: "string", 
			length: 500, 
			notNull: true 
		}
    })
};

exports.down = function(db) {
  return db.dropTable("product");
};

exports._meta = {
  "version": 1
};
