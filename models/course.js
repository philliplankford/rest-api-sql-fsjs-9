'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Course extends Model {
        static associate(models){ // ES6 Syntax
            Course.belongsTo(models.User, {
                foreignKey: {
                    fieldName: 'userId',
                },
            })
        }
    };
    Course.init({
        title: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
        },
        estimatedTime: {
            type: DataTypes.STRING,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize, 
        modelName: 'Course',
    });
    return Course
};