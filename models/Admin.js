// /models/Admin.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'superadmin'], // Add more roles as needed
    default: 'admin',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  tokens:[
    {
      token:{
        type:String,
        required:true,
      }
    }
  ],
});

// Hash the password before saving
adminSchema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 10);
  }
  next();
});

adminSchema.methods.generateAuthToken = async function () {
  try {
    return jwt.sign({ _id: this._id.toString(), role: this.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  } catch (err) {
    console.log(err);
  }
};


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
