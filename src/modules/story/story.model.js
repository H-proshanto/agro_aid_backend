const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');

const Story = sequelize.define(
    'stories',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        coverImage: {
            allowNull: true,
            type: DataTypes.STRING(4000),
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        desciption: {
            allowNull: true,
            type: DataTypes.STRING(10000),
        },
        body: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        updatedBy: {
            type: DataTypes.UUID,
            allowNull: true,
        }
    },
    {
        tableName: "stories",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);


module.exports = Story;
