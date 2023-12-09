// /server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/db'); // Import the database connection module

const app = express();
app.use(cookieParser());

// Middleware for parsing JSON request bodies
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.static('public'))

const port = process.env.PORT || 3000;
const corsOptions = {
  origin: 'https://sumegportfolio.netlify.app', //included origin as true
  credentials: true, //included credentials as true
};


// Middleware
app.use(cors(corsOptions));


// Define API routes
const errorHandler = require('./utils/errorHandler'); // Import the error handler module
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminRoutes = require('./routes/adminRoutes');
const secureRoute=require('./routes/secureRoute')

// Routes
app.use('/api/blog', blogRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/protected',secureRoute)

// Example route with http-errors
app.get('/example', (req, res, next) => {
  // Create a 404 Not Found error
  next(createError(404, 'This resource was not found'));
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
