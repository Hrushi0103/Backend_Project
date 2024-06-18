const express = require('express');
const router = express.Router();
const usercontrollers = require('../controllers/controllers');
const bodyParser = require('body-parser');
const mysql = require('mysql2')
const mydb = require('../configs/mydb')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get all users
router.get('/users', usercontrollers.allusers);

// Get user by ID
router.get('/users/:id', usercontrollers.searchusers);

// Delete user by ID
router.delete('/users/delete/:id', usercontrollers.deleteusers);

// Add new user
router.post('/users/add', usercontrollers.addusers);

// Update user by ID
router.put('/users/update/:id', usercontrollers.updateusers);

// Dashboard
router.get('/users/new/dashboard', usercontrollers.abs);

// home
router.get('/home', (req, res) => {
    if (req.session.user) {
        res.render('home', { user: req.session.user });
    } else {
        res.redirect('/login');
    }
});


// contact 
router.get('/contact', (req, res) => {
    res.render('contact');
});

// about 
router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;
