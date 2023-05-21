const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');

const Product = sequelize.define(
    'products',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        productName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        productImage: {
            allowNull: true,
            type: DataTypes.STRING(1000),
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
        tableName: "products",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


module.exports = Product;
