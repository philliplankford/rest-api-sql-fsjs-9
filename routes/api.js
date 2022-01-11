'use strict';

const express = require('express');
const router = express.Router();

// require middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { User, Course } = require('../models');
const course = require('../models/course');

// GET users
router.get('/users', authenticateUser, asyncHandler( async (req, res, next) => {
    const user = req.currentUser;

    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
      });
}));

// POST users
router.post('/users', asyncHandler( async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).setHeader('Location', '/');
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
}));

// GET courses
router.get('/courses', asyncHandler( async (req, res, next) => {
    const courses = await Course.findAll({
        include: [
            {
                model: User,
                as: 'User',
            },
        ],
    });
    res.status(200).json(courses);
}));

router.get('/courses/:id', asyncHandler( async (req, res, next) => {
    const courseId = req.params.id;

    const course = await Course.findOne({
        where: {
            id: courseId,
        },
        include: [
            {
                model: User,
                as: 'User',
            },
        ],
    });

    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).json({
            message: `Course ${courseId} not found.`
        })
    };

}));

// POST courses
router.post('/courses', asyncHandler ( async (req, res, next) => {
    try {

    } catch (error) {
        
    }
}));

// PUT courses
router.put('/courses/:id', asyncHandler ( async (req, res, next) => {

}));

// DELETE courses
router.delete('/courses/:id', asyncHandler ( async (req, res, next) => {

}));

// export
module.exports = router;