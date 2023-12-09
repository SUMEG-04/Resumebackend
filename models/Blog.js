// /models/Blog.js

const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: [
    {
      type: {
        type: String,
        enum: ['text', 'image'],
        required: true,
      },
      para: String,
      images: [String], // Array of image URLs or file paths
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
