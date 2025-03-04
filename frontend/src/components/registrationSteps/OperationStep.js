const OperationStep = ({ formData, setFormData }) => {
  if (!formData.annual_production) {
    setFormData({ ...formData, annual_production: [] });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrgChange = (e) => {
    const { value } = e.target;
    if (value === "Others") {
      setFormData({ ...formData, organization_registration: "Others", other_organization_registration: "" });
    } else {
      setFormData({ ...formData, organization_registration: value, other_organization_registration: undefined });
    }
    };
    const handleCustomOrgChange = (e) => {
      setFormData({ ...formData, other_organization_registration: e.target.value });
    };
  
  
  const addProductionEntry = () => {
    setFormData({
      ...formData,
      annual_production: [
        ...formData.annual_production,
        { product: "", type: "", quantity: 0, unit: "", market_value: 0 },
      ],
    });
  };

  const handleProductionChange = (index, field, value) => {
    const updatedProduction = [...formData.annual_production];
    updatedProduction[index][field] = field === "quantity" || field === "market_value" ? parseFloat(value) || 0 : value;
    setFormData({ ...formData, annual_production: updatedProduction });
  };

  const removeProductionEntry = (index) => {
    const updatedProduction = formData.annual_production.filter((_, i) => i !== index);
    setFormData({ ...formData, annual_production: updatedProduction });
  };

  const handleMemberCountChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      number_of_members: {
        ...formData.number_of_members,
        [name]: parseInt(value, 10) || 0,
      },
    });
  };

  const handleProcurementChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        procurement_experience: [
          ...formData.procurement_experience,
          { method: value, participation_count: 0, contracts_won: 0, successful_implementations: 0 },
        ],
      });
    } else {
      setFormData({
        ...formData,
        procurement_experience: formData.procurement_experience.filter((item) => item.method !== value),
      });
    }
  };

  const handleProcurementNumbers = (index, field, value) => {
    const updatedExperience = [...formData.procurement_experience];
    updatedExperience[index][field] = parseInt(value, 10) || 0;
    setFormData({ ...formData, procurement_experience: updatedExperience });
  };

  return (
    <div className="step-container">
      <h2>Step 2: Operations</h2>
      <div className="form-field">
          <label>Organization Registration:</label>
        <select
          name="organization_registration"
          value={formData.organization_registration}
          onChange={handleOrgChange}
          required
        >
          <option value="">Select One</option>
          <option value="Cooperative">Cooperative</option>
          <option value="Stock Corporation">Stock Corporation</option>
          <option value="Non-stock Corporation">Non-stock Corporation</option>
          <option value="Unregistered">Unregistered</option>
          <option value="Others">Others</option>
        </select>

        {/* Show input only when "Others" is selected */}
        {formData.organization_registration === "Others" && (
            <input
              type="text"
              name="other_organization_registration"
              value={formData.other_organization_registration || ""}
              onChange={handleCustomOrgChange}
              placeholder="Others Please Specify"
              required
            />
          )}
      </div>
  
      <div className="form-field">
      {/* Date Established */}
      <label>Date Established:</label>
      <input type="date" name="date_established" value={formData.date_established} onChange={handleInputChange} required />
      </div>

      <div className="form-field">
 {/* PSIC */}
      <label>Philippine Statistical Industry Classification (PSIC):</label>
      <input type="text" name="psic" value={formData.psic} onChange={handleInputChange} />
      </div>
     
      <div className="form-field">
      {/* Target Members */}
            <label>Target Members:</label>
            <input type="text" name="target_members" value={formData.target_members} onChange={handleInputChange} />

            {/* Number of Members */}
            <label>Number of Members:</label>
            <div>
              <label>Male:</label>
              <input type="number" name="male" value={formData.number_of_members?.male || 0} onChange={handleMemberCountChange} />
              <label>Female:</label>
              <input type="number" name="female" value={formData.number_of_members?.female || 0} onChange={handleMemberCountChange} />
              <label>Total:</label>
              <input type="number" value={(formData.number_of_members?.male || 0) + (formData.number_of_members?.female || 0)} readOnly />
            </div>

        
      </div>    
      
      <div className="form-field">
      {/* Annual Production */}
      <label>Annual Production:</label>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Market Value</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formData.annual_production.map((item, index) => (
            <tr key={index}>
              <td><input type="text" value={item.product} onChange={(e) => handleProductionChange(index, "product", e.target.value)} required /></td>
              <td><input type="text" value={item.type} onChange={(e) => handleProductionChange(index, "type", e.target.value)} required /></td>
              <td><input type="number" value={item.quantity} onChange={(e) => handleProductionChange(index, "quantity", e.target.value)} required /></td>
              <td><input type="text" value={item.unit} onChange={(e) => handleProductionChange(index, "unit", e.target.value)} required /></td>
              <td><input type="number" value={item.market_value} onChange={(e) => handleProductionChange(index, "market_value", e.target.value)} required /></td>
              <td><button type="button" onClick={() => removeProductionEntry(index)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className = "remove-button" type="button" onClick={addProductionEntry}>Add Product</button>
      </div>

      <div className="form-field">
      {/* Area/Scope of Production */}
      <label>Area/Scope of Production:</label>
      <input type="text" name="production_scope" value={formData.production_scope} onChange={handleInputChange} />
      </div>
      <div className="form-field">
      {/* Area/Scope of Sales */}
      <label>Area/Scope of Sales:</label>
      <input type="text" name="sales_scope" value={formData.sales_scope} onChange={handleInputChange} />
      <div className="form-field"></div>
      {/* Total Assets */}
      <label>Total Assets:</label>
      <input type="number" name="total_assets" value={formData.total_assets} onChange={handleInputChange} />
      </div>
      <div className="form-field">
      {/* Total Liabilities */}
      <label>Total Liabilities:</label>
      <input type="number" name="total_liabilities" value={formData.total_liabilities} onChange={handleInputChange} />
      </div>
      <div className="form-field">
      {/* Annual Gross Income */}
      <label>Annual Gross Income:</label>
      <input type="number" name="annual_gross_income" value={formData.annual_gross_income} onChange={handleInputChange} />
      </div>
      <div className="form-field">
      {/* Experience in Procurement */}
      <label>Experience in Procurement:</label>
      <div>
        {["Competitive Bidding", "Negotiated Procurement", "Shopping", "Small Value Procurement", "No Experience"].map((method) => (
          <div key={method}>
            <input type="checkbox" value={method} onChange={handleProcurementChange} />
            <label>{method}</label>
          </div>
        ))}
      </div>

      {formData.procurement_experience.map((exp, index) => (
        <div key={index}>
          <h4>{exp.method}</h4>
          <label>Number of Participation:</label>
          <input type="number" value={exp.participation_count} onChange={(e) => handleProcurementNumbers(index, "participation_count", e.target.value)} />
          <label>Number of Contracts Won:</label>
          <input type="number" value={exp.contracts_won} onChange={(e) => handleProcurementNumbers(index, "contracts_won", e.target.value)} />
          <label>Number of Successful Implementations:</label>
          <input type="number" value={exp.successful_implementations} onChange={(e) => handleProcurementNumbers(index, "successful_implementations", e.target.value)} />
        </div>
      ))}
      </div>
      <div className="form-field">
      {/* Sponsor Agency */}
      <label>Sponsor Agency:</label>
      <input type="text" name="sponsor_agency" value={formData.sponsor_agency} onChange={handleInputChange} required />
      </div>
      <div className="form-field">
      <label>Other Sponsor Agency (Optional):</label>
      <input type="text" name="other_sponsor_agency" value={formData.other_sponsor_agency} onChange={handleInputChange} />
      </div>
    </div>
  );
};

export default OperationStep;
