const express = require("express");
const router = express.Router();
const usercontrollers = require("../controllers/controllers");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get all users
router.get("/users", usercontrollers.allusers);

// Get user by ID
router.get("/users/:id", usercontrollers.searchusers);

// Delete user by ID
router.delete("/users/delete/:id", usercontrollers.deleteusers);

// Add new user
router.post("/users/add", usercontrollers.addusers);

// Update user by ID
router.put("/users/update/:id", usercontrollers.updateusers);

// Dashboard
router.get("/users/new/dashboard", usercontrollers.abs);

// Home route
router.get("/home", usercontrollers.home);

// Contact route
router.get("/contact", usercontrollers.contact);

// About route
router.get("/about", usercontrollers.about);

// login route
router.get("/login", usercontrollers.login);

router.post("/login", usercontrollers.Plogin);

// register route
router.get("/register", usercontrollers.register);

router.post("/register", usercontrollers.Pregister);

//logout route
router.post("/logout", usercontrollers.logout);

module.exports = router;
