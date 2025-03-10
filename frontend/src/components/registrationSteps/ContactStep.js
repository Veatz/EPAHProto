import React from "react";

const ContactStep = ({ formData, setFormData, errors }) => {
  const handleInputChange = (e, contactType) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [contactType]: {
        ...formData[contactType],
        [name]: value,
      },
    });
  };

  return (
    <div className="step-container">
      <h2>Step 3: Contact Persons</h2>

      <div className="form-field">
        <h3>Primary Contact Person</h3>
        <label>Complete Name</label>
        <input
          type="text"
          name="name"
          value={formData.primaryContact.name}
          onChange={(e) => handleInputChange(e, "primaryContact")}
          required
        />
        {errors.primaryContactName && <span className="error">{errors.primaryContactName}</span>}

        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.primaryContact.designation}
          onChange={(e) => handleInputChange(e, "primaryContact")}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.primaryContact.email}
          onChange={(e) => handleInputChange(e, "primaryContact")}
          required
        />
        {errors.primaryContactEmail && <span className="error">{errors.primaryContactEmail}</span>}

        <label>Telephone Number</label>
        <input
          type="text"
          name="telephone"
          value={formData.primaryContact.telephone}
          onChange={(e) => handleInputChange(e, "primaryContact")}
        />

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.primaryContact.mobile}
          onChange={(e) => handleInputChange(e, "primaryContact")}
        />
      </div>

      <div className="form-field">
        <h3>Secondary Contact Person</h3>
        <label>Complete Name</label>
        <input
          type="text"
          name="name"
          value={formData.secondaryContact.name}
          onChange={(e) => handleInputChange(e, "secondaryContact")}
        />

        <label>Designation</label>
        <input
          type="text"
          name="designation"
          value={formData.secondaryContact.designation}
          onChange={(e) => handleInputChange(e, "secondaryContact")}
        />

        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.secondaryContact.email}
          onChange={(e) => handleInputChange(e, "secondaryContact")}
        />

        <label>Telephone Number</label>
        <input
          type="text"
          name="telephone"
          value={formData.secondaryContact.telephone}
          onChange={(e) => handleInputChange(e, "secondaryContact")}
        />

        <label>Mobile Number</label>
        <input
          type="text"
          name="mobile"
          value={formData.secondaryContact.mobile}
          onChange={(e) => handleInputChange(e, "secondaryContact")}
        />
      </div>
    </div>
  );
};

export default ContactStep;