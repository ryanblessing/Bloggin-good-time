const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// create our User model
class User extends Model {
    pwCheck(loginPW) {
        return bcrypt.compareSync(loginPW, this.password)
    }
}
// define table columns and configuration
User.init({
    //define an id column
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 8]
        }
    }
}, {
    //hook to create a new password for a new user
    hooks: {
        async beforeCreate(newUserData) { 
            newUserData.password = await bcrypt.hash(newUserData.password, 10)
            return newUserData;
        }, 
        async beforeUpdate(updateUserData) {
            updateUserData.password = await bcrypt.hash(updateUserData.password, 10)
            return updateUserData;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
    }
);

module.exports = User;