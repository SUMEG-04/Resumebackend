// /routes/adminRoutes.js

const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to add a new admin user (register)
router.post('/register', adminController.registerAdmin);

// Route for admin login
router.post('/login', adminController.loginAdmin);

// Route to get all admin users
router.get('/admins', adminController.getAllAdmins);

// Route to get a specific admin user by ID
router.get('/admins/:id', adminController.getAdminById);

// Route to add a new admin user
router.post('/admins', adminController.addAdmin);

router.get('/current',authMiddleware ,adminController.getCurrentAdmin);

// Route to get all projects
router.get('/projects', adminController.getAllProjects);

// Route to add a new project
router.post('/projects', adminController.addProject);

// Add more routes as needed for admin functionalities

module.exports = router;
