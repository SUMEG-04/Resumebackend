require('dotenv').config();

const mongoose = require('mongoose');
const dbUrl = process.env.MONGO_URI;
const fs = require('fs');
// The rest of your server setup

// Define your database connection URL

// Connect to the database
mongoose.connect(dbUrl).then(()=>{console.log('connection successful')}).catch((err)=>{console.log('no connection:',err)})

