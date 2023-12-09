// routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const multerConfig = require('../config/multerConfig');

// Route to get all projects
router.get('/projects', projectController.getAllProjects);

// Route to get a specific project by ID
router.get('/projects/:id', projectController.getProjectById);

// Route to add a new project
router.post('/projects', multerConfig.single('image'), projectController.addProject);

// Add more routes as needed for project functionalities
router.delete('/projects/:id', projectController.deleteProjectById);

module.exports = router;
