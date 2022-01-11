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
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A title is required.'
                },
                notEmpty: {
                    msg: "Please provide a title."
                },
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'A description is required.'
                },
                notEmpty: {
                    msg: "Please provide a description."
                },
            }
        },
        estimatedTime: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        materialsNeeded: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        sequelize, 
        modelName: 'Course',
    });
    return Course
};