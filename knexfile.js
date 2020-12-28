// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'musicrecords',
      user: 'root',
      password: 'root',
      typeCast: function castField(field, next) {
        
        if (field.type === 'TINY' && field.length === 1) {

          return field.string() === '1'
        }

        return next();
      }
    }
  }

};
