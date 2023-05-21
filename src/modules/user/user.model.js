const sequelize = require('../../config/lib/sequelize');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const User = sequelize.define(
    'users',
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        firstName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        profileImage: {
            allowNull: true,
            type: DataTypes.STRING(1000),
        },
        dob: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        gender: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        email: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            }
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("password", bcrypt.hashSync(value, 10));
            },
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
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = User;
