'use strict';
module.exports = (sequelize, DataTypes) => {
  const Apartment = sequelize.define('Apartment', {
    userID: DataTypes.NUMBER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    price: DataTypes.NUMBER,
    size: DataTypes.NUMBER,
    roomCount: DataTypes.NUMBER,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    longitude: DataTypes.FLOAT,
    latitude: DataTypes.FLOAT,
    status: DataTypes.NUMBER
  }, {});
  Apartment.associate = function(models) {
    // associations can be defined here
  };
  return Apartment;
};