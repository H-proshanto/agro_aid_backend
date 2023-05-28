const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');
const Story = require('../story/story.model');
const Product = require('../product/product.model');

const ProductDescription = sequelize.define(
  'story-product',
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
    storyId: {
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
    tableName: "story-product",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// relationship  add korte hobe.
// Product.hasOne(ProductDescription, {
//   as: "description",
//   foreignKey: "productId",
// })

module.exports = ProductDescription;
