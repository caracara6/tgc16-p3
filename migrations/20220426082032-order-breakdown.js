'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {
	return db.createTable("orders_product", {
		id: {
			type: "int",
			primaryKey: true,
			unsigned: true,
			autoIncrement: true
		},
		quantity: {
			type: "smallint",
			unsigned: true,
			notNull: true,
		},
		order_id: {
			type: "int",
			unsigned: true,
			notNull: true,
			foreignKey: {
				name: "order_breakdown_order_fk",
				table: "orders",
				mapping: "id",
				rules: {
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
				}
			}
		},
		product_id: {
			type: "int",
			unsigned: true,
			notNull: true,
			foreignKey: {
				name: "order_breakdown_product_fk",
				table: "product",
				mapping: "id",
				rules: {
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
				}
			}
		}
	});
};

exports.down = function (db) {
	return db.dropTable("orders_product");
};

exports._meta = {
	"version": 1
};
