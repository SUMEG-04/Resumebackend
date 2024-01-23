// multerConfig.js
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb)=> {
    cb(null, 'public/images');
  },
  filename: (req, file, cb)=> {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  },
});


// const fileFilter = (req, file, cb) => {
//   const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//   if (allowedFileTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const multerConfig = multer({storage:multer.memoryStorage(),limits:{fileSize:10*1024*1024}});

module.exports = multerConfig;
