const BasicInfoStep = ({ formData, setFormData }) => {
  return (
    <div className="step-container">
      <h2>Step 1: Basic Information</h2>

      <label>Name of Organization *</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <label>Short Name *</label>
      <input
        type="text"
        value={formData.shortname}
        onChange={(e) => setFormData({ ...formData, shortname: e.target.value })}
        required
      />

      <label>Short Description</label>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />

      <label>Office Address *</label>
      <input
        type="text"
        value={formData.address}
        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        required
      />

      <label>CBO Representation *</label>
      <select
        value={formData.representation}
        onChange={(e) => setFormData({ ...formData, representation: e.target.value })}
        required
      >
        <option value="">Select...</option>
        <option value="Main">Main</option>
        <option value="Branch">Branch</option>
      </select>

    </div>
  );
};

export default BasicInfoStep;
