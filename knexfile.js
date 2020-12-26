// Update with your config settings.

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      database: 'musicrecords',
      user: 'root',
      password: 'root',
      typeCast: function castField(field, next) {
        
        if (field.type === 'BIT' && field.length === 1) {

          const bytes = field.buffer();

          return bytes[0] === 1;
        }

        return next();
      }
    }
  }

};
