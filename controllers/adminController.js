// /controllers/adminController.js

const Admin = require('../models/Admin');
const Project = require('../models/Project');
const bcrypt=require('bcrypt')

const adminController = {

    registerAdmin: async (req, res) => {
        // Check if the logged-in admin has the role "superadmin" to create a new admin
        const loggedInAdmin = req.admin;
        if (!loggedInAdmin || loggedInAdmin.role !== 'superadmin') {
          return res.status(403).json({ message: 'Permission denied' });
        }
    
        const { username, password } = req.body;
    
        try {
          const existingAdmin = await Admin.findOne({ username });
          if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
          }
    
          const newAdmin = new Admin({
            username,
            password,
          });
    
          await newAdmin.save();
          res.json({ message: 'Admin registered successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },
    
      // Login admin
      loginAdmin: async (req, res) => {
        const { username, password } = req.body;
    
        try {
          const admin = await Admin.findOne({ username });
          if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
          }
    
          const passwordMatch = await bcrypt.compare(password, admin.password);
          if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
          }
    
          // Generate JWT
          const token = await admin.generateAuthToken();  

          res.cookie('jwt', token,{
            httpOnly:false,
            sameSite: 'none',
            secure: true, // Mark as secure if using HTTPS
          }) ;
          console.log(res.getHeaders()['set-cookie']);
    
          res.status(200).json({ message: 'Login successful', token,admin });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
      },

  getAllAdmins: async (req, res) => {
    try {
      const admins = await Admin.find();
      res.json(admins);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAdminById: async (req, res) => {
    const { id } = req.params;

    try {
      const admin = await Admin.findById(id);
      if (!admin) {
        return res.status(404).json({ message: 'Admin not found' });
      }

      res.json(admin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addAdmin: async (req, res) => {
    const { username, password } = req.body;

    try {
      const newAdmin = new Admin({
        username,
        password,
      });

      const savedAdmin = await newAdmin.save();
      res.json(savedAdmin);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getCurrentAdmin: async (req, res) => {
    try {
      // Check if the user is authenticated
      if (!req.rootAdmin) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      // Fetch the current admin
      const currentAdmin = await Admin.findById(req.AdminID);
  
      if (!currentAdmin) {
        return res.status(404).json({ message: 'Admin not found' });
      }
  
      res.json(currentAdmin);
    } catch (error) {
      console.error('Error getting current admin:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },  

  addProject: async (req, res) => {
    const { title, description, technologies } = req.body;

    try {
      const newProject = new Project({
        title,
        description,
        technologies,
      });

      const savedProject = await newProject.save();
      res.json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
};

module.exports = adminController;
