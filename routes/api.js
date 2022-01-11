'use strict';

const express = require('express');
const router = express.Router();

// require middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/auth-user');
const { User } = require('../models');

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
        res.status(201).json({ "message": "Account created!" })
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
    res.json({
        message: 'Welcome to courses!',
      });
}));

router.get('/courses/:id', asyncHandler( async (req, res, next) => {

}));

// POST courses
router.post('/courses', asyncHandler ( async (req, res, next) => {

}));

// PUT courses
router.put('/courses/:id', asyncHandler ( async (req, res, next) => {

}));

// DELETE courses
router.delete('/courses/:id', asyncHandler ( async (req, res, next) => {

}));

// export
module.exports = router;