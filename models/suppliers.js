'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suppliers = sequelize.define('Suppliers', {
    name: DataTypes.STRING,
    kota: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Suppliers;
};