'use strict'; // opt in to restricted "strict" variant of JS. 
// strict and non strict code can coexist 

// STRICT MODE CHANGES: 
// eliminate JS silent errors -> throw errors
// can be made to run faster than normal code 
// prohibits some syntax

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
           User.hasMany(models.Course, {
               foreignKey: {
                   fieldName: 'userId',
               },
           }) 
        }
    };
    User.init({
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        emailAddress: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};