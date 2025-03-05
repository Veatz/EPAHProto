import React from "react";

const BasicInfoStep = ({ formData, setFormData, nextStep }) => {
  const validateBasicInfo = () => {
    if (!formData.name || !formData.shortname || !formData.address || !formData.representation) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateBasicInfo()) {
      nextStep();
    }
  };

  return (
    <div className="step-container">
      <h2>Step 1: Basic Information</h2>

      <div className="form-field">
        <label htmlFor="name">Name of Organization *</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="shortname">Short Name *</label>
        <input
          type="text"
          id="shortname"
          value={formData.shortname}
          onChange={(e) => setFormData({ ...formData, shortname: e.target.value })}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="description">Short Description</label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="form-field">
        <label htmlFor="address">Office Address *</label>
        <input
          type="text"
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="representation">CBO Representation *</label>
        <select
          id="representation"
          value={formData.representation}
          onChange={(e) => setFormData({ ...formData, representation: e.target.value })}
          required
        >
          <option value="">Select...</option>
          <option value="Main">Main</option>
          <option value="Branch">Branch</option>
        </select>
      </div>

      <div>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default BasicInfoStep;
