const knex = require('knex')({
    client: 'mysql',
    connection: {
      user: 'foo',
      password:'bar',
      database:'tgc16p3',
      host: 'localhost'
    }
  })
  const bookshelf = require('bookshelf')(knex)
  
  module.exports = bookshelf;