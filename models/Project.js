// /models/Project.js

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: [String],
  image: {
    type:String,
  },
  feature:{
    type:Boolean,
    required: true,
  },
  projectlink:{
    type:String,
  },
  role:{
    type:String,
  },
  timeline:[String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
