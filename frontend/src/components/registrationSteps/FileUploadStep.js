import React from "react";

const FileUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a PDF, JPEG, or PNG file.");
        return;
      }

      // Validate file size (5MB limit)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("File size exceeds the limit of 5MB.");
        return;
      }

      // Update formData with the selected file
      setFormData({
        ...formData,
        files: {
          ...formData.files,
          [fileType]: file,
        },
      });
    }
  };

  return (
    <div className="step-container">
      <h2>Step 4: File Upload</h2>

      <div className="form-field">
        <label>RCT Resolution (PDF, JPEG, PNG)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, "rctResolution")}
          required
        />
        {errors.rctResolution && <span className="error">{errors.rctResolution}</span>}
      </div>

      <div className="form-field">
        <label>Business Permit (PDF, JPEG, PNG)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, "businessPermit")}
          required
        />
        {errors.businessPermit && <span className="error">{errors.businessPermit}</span>}
      </div>

      <div className="form-field">
        <label>DOLE Certificate (PDF, JPEG, PNG)</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => handleFileChange(e, "doleCertificate")}
          required
        />
        {errors.doleCertificate && <span className="error">{errors.doleCertificate}</span>}
      </div>
    </div>
  );
};

export default FileUploadStep;