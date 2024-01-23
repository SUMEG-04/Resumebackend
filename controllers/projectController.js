const Project = require('../models/Project');
const { Storage } = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'portfolio-412110',
  keyFilename: 'mykey.json',
});
const bucket = storage.bucket('mywebsite-sumeg');

const projectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await Project.find();
      res.json(projects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getProjectById: async (req, res) => {
    const { id } = req.params;

    try {
      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  addProject: async (req, res) => {
    const {
      title,
      description,
      technologies,
      feature,
      projectlink,
      role,
      timeline
    } = req.body;
  
    const image = req.file;
  
    // Check if all required fields are present
    if (!title || !description || !technologies || !feature || !projectlink || !role || !timeline || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    try {
      const uniqueFilename = image;
      const file = bucket.file(uniqueFilename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      stream.end(image.buffer);

      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      const newProject = new Project({
        title,
        description,
        technologies,
        image: imageUrl,
        feature,
        projectlink,
        role,
        timeline,
      });
  
      const savedProject = await newProject.save();
      res.json({message:"Project added successfully",savedProject});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteProjectById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProject = await Project.findByIdAndDelete(id);
      if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }

      res.json({ message: 'Project deleted successfully', deletedProject });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

};

module.exports = projectController;
