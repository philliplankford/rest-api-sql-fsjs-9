const express = require('express');
const router = express.Router();

// GET users
router.get('/users', (req, res, next) => {
    res.json({
        message: 'Welcome to users!',
      });
});

// POST users
router.post('/users', (req, res, next) => {

});

// GET courses
router.get('/courses', (req, res, next) => {
    res.json({
        message: 'Welcome to courses!',
      });
});

router.get('/courses/:id', (req, res, next) => {

});

// POST courses
router.post('/courses', (req, res, next) => {

});

// PUT courses
router.put('/courses/:id', (req, res, next) => {

});

// DELETE courses
router.delete('/courses/:id', (req, res, next) => {

});

// export
module.exports = router;