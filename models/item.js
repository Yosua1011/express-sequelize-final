'use strict';
const checkcode = require('../helpers/codeitem')
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    brand: DataTypes.STRING,
    codeitem: {
      type: DataTypes.STRING,
      validate: {
        max:6,
        min:6,
        isTrue: function(code, next) {
          Item.find({
            where: {codeitem: code},
            attributes: ['id']
          })
          .done(function(error,user){
            if (error)
              return next(error)
            if (user)
              return next('CodeItem is not right')
            next()
          })
        }
      }
    }
  }, {
    // hooks: {
    //   beforeCreate: (data) => {
    //     let kodenya = ''
    //     data.codeitem = kodenya
    //     const cek = checkcode(kodenya)
    //   }
    // }
  });

  Item.associate = function (models) {
    Item.hasMany(models.Suppliers)
    // Item.belongsToMany(models.Supplier, {through: 'SupplierItem'})
  };

  return Item;
};