const multer = require("multer");
const path = require("path");

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// File filter to allow only PDF, JPEG, and PNG files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, JPEG, and PNG files are allowed."), false);
  }
};

// Initialize multer with the configuration
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
})
module.exports = upload;