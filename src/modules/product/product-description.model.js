const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');
const Product = require('./product.model');

const ProductDescription = sequelize.define(
  'product-descriptions',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    productId: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    description: {
      type: DataTypes.STRING(10000),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updatedBy: {
      type: DataTypes.UUID,
      allowNull: true,
    }
  },
  {
    tableName: "product-descriptions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

Product.hasOne(ProductDescription, {
  as: "description",
  foreignKey: "productId",
})

module.exports = ProductDescription;
