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

    res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
      });
}));

// POST users
router.post('/users', asyncHandler( async (req, res, next) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
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
                attributes: {
                    exclude: [
                        'password',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            },
        ],
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
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
                attributes: {
                    exclude: [
                        'password',
                        'createdAt',
                        'updatedAt'
                    ]
                }
            },
        ],
        attributes: {
            exclude: [
                'createdAt',
                'updatedAt'
            ]
        }
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
router.post('/courses', authenticateUser, asyncHandler ( async (req, res, next) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).location(`/api/courses/${newCourse.id}`).end();
    } catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        };
    }
}));

// PUT courses
router.put('/courses/:id', authenticateUser, asyncHandler ( async (req, res, next) => {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    if (req.currentUser.id === course.userId) {
        try {
            if (course) {
                await course.update(req.body);
                res.status(204).end();
            } else {
                res.status(404).res.json({
                    message: `Course ${courseId} not found.`
                })
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            };
        }
    } else {
        res.status(403).json({
            message: "You do not have permissions to update this course."
        })
    }
}));

// DELETE courses
router.delete('/courses/:id', authenticateUser, asyncHandler ( async (req, res, next) => {
    const courseId = req.params.id;
    const course = await Course.findByPk(courseId);
    if (req.currentUser.id === course.userId) {
        try {
            if (course) {
                await course.destroy();
                res.status(204).end();
            } else {
                res.status(404).res.json({
                    message: `Course ${courseId} not found.`
                })
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
                const errors = error.errors.map(err => err.message);
                res.status(400).json({ errors });
            } else {
                throw error;
            };
        }
    } else {
        res.status(403).json({
            message: "You do not have permissions to delete this course."
        })
    }
}));

// export
module.exports = router;