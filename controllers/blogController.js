// /controllers/blogController.js
const BlogPost = require('../models/Blog'); // Import the BlogPost model
const { validationResult } = require('express-validator');

const blogController = {
  // Example function to get all blog posts
  getAllBlogPosts: async (req, res) => {
    try {
      const blogPosts = await BlogPost.find();
      res.json({blogPosts:blogPosts,message:"Blog data recieved"});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Example function to get a specific blog post by ID
  getBlogPostById: async (req, res) => {
    const { id } = req.params;

    try {
      const blogPost = await BlogPost.findById(id);
      if (!blogPost) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.json(blogPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Example function to add a new blog post
  addBlogPost: async (req, res) => {
    // Validate the request body using express-validator
    console.log(req.body)
    
    const { title, content } = req.body;
  
    try {
      // Create a new blog post instance
      const newBlogPost = new BlogPost({
        title,
        content,
      });

      if (req.files) {
        // Map over the uploaded files and add them to the content
        req.files.forEach((file, index) => {
          newBlogPost.content[index].images.push(file.filename);
        });
      }
  
      // Save the blog post to the database
      const savedBlogPost = await newBlogPost.save();
  
      res.status(201).json({ message: 'BlogPost created successfully', savedBlogPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteBlogPostById: async (req, res) => {
    const { id } = req.params;

    try {
      const deletedBlogPost = await BlogPost.findByIdAndDelete(id);
      if (!deletedBlogPost) {
        return res.status(404).json({ message: 'BlogPost not found' });
      }

      res.json({ message: 'BlogPost deleted successfully', deletedBlogPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Add more logical implementations for blog functionalities
};

module.exports = blogController;
