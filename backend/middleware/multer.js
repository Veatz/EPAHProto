const multer = require("multer");
const path = require("path");

// ✅ Configure Storage for Uploaded Files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename
  },
});

// ✅ File Filter to Allow Only PDF, JPEG, PNG
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only PDF, JPEG, and PNG files are allowed."), false);
  }
};

// ✅ Increase File Upload Size Limit (10MB) & Allow Large Requests
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024, fieldSize: 10 * 1024 * 1024 },
});

module.exports = upload;
