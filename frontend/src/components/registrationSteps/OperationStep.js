import React from "react";

const OperationStep = ({ formData, setFormData, errors, nextStep, prevStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        [name]: value,
      },
    });
  };

  const handleOrgChange = (e) => {
    const { value } = e.target;
    if (value === "Others") {
      setFormData({
        ...formData,
        operationDetails: {
          ...formData.operationDetails,
          organization_registration: "Others",
          other_organization_registration: "",
        },
      });
    } else {
      setFormData({
        ...formData,
        operationDetails: {
          ...formData.operationDetails,
          organization_registration: value,
          other_organization_registration: undefined,
        },
      });
    }
  };

  const handleCustomOrgChange = (e) => {
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        other_organization_registration: e.target.value,
      },
    });
  };

  const addProductionEntry = () => {
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        annual_production: [
          ...formData.operationDetails.annual_production,
          { product: "", type: "", quantity: 0, unit: "", market_value: 0 },
        ],
      },
    });
  };

  const handleProductionChange = (index, field, value) => {
    const updatedProduction = [...formData.operationDetails.annual_production];
    updatedProduction[index][field] =
      field === "quantity" || field === "market_value" ? parseFloat(value) || 0 : value;
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        annual_production: updatedProduction,
      },
    });
  };

  const removeProductionEntry = (index) => {
    const updatedProduction = formData.operationDetails.annual_production.filter(
      (_, i) => i !== index
    );
    if (updatedProduction.length === 0) {
      updatedProduction.push({ product: "", type: "", quantity: 0, unit: "", market_value: 0 });
    }
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        annual_production: updatedProduction,
      },
    });
  };


  const handleMemberCountChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        number_of_members: {
          ...formData.operationDetails.number_of_members,
          [name]: parseInt(value, 10) || 0,
        },
      },
    });
  };

  const handleProcurementChange = (e) => {
    const { value, checked } = e.target;
    const updatedExperience = [...formData.operationDetails.procurement_experience];
    const index = updatedExperience.findIndex((exp) => exp.method === value);
    if (checked && index === -1) {
      updatedExperience.push({ method: value, participation_count: 0, contracts_won: 0, successful_implementations: 0 });
    } else if (!checked && index !== -1) {
      updatedExperience.splice(index, 1);
    }
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        procurement_experience: updatedExperience,
      },
    });
  };

  const handleProcurementNumbers = (index, field, value) => {
    const updatedExperience = [...formData.operationDetails.procurement_experience];
    updatedExperience[index][field] = parseInt(value, 10) || 0;
    setFormData({
      ...formData,
      operationDetails: {
        ...formData.operationDetails,
        procurement_experience: updatedExperience,
      },
    });
  };


  return (
    <div className="step-container">
      <h2>Step 2: Operations</h2>

      <div className="form-field">
        <label>Organization Registration:</label>
        <select
          name="organization_registration"
          value={formData.operationDetails.organization_registration}
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
        {errors.organization_registration && (
          <span className="error">{errors.organization_registration}</span>
        )}

        {formData.operationDetails.organization_registration === "Others" && (
          <input
            type="text"
            name="other_organization_registration"
            value={formData.operationDetails.other_organization_registration || ""}
            onChange={handleCustomOrgChange}
            placeholder="Others Please Specify"
            required
          />
        )}
      </div>

      <div className="form-field">
        <label>Date Established:</label>
        <input
          type="date"
          name="date_established"
          value={formData.operationDetails.date_established}
          onChange={handleInputChange}
          max={new Date().toISOString().split("T")[0]}
          required
        />
        {errors.date_established && <span className="error">{errors.date_established}</span>}
      </div>

      <div className="form-field">
        <label>Philippine Statistical Industry Classification (PSIC):</label>
        <input
          type="text"
          name="psic"
          value={formData.operationDetails.psic}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Target Members:</label>
        <input
          type="text"
          name="target_members"
          value={formData.operationDetails.target_members}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Number of Members:</label>
        <div>
          <label>Male:</label>
          <input
            type="number"
            name="male"
            value={formData.operationDetails.number_of_members?.male || 0}
            onChange={handleMemberCountChange}
          />
          <label>Female:</label>
          <input
            type="number"
            name="female"
            value={formData.operationDetails.number_of_members?.female || 0}
            onChange={handleMemberCountChange}
          />
          <label>Total:</label>
          <input
            type="number"
            value={
              (formData.operationDetails.number_of_members?.male || 0) +
              (formData.operationDetails.number_of_members?.female || 0)
            }
            readOnly
          />
        </div>
      </div>

      {/*Annual Production*/}
     <div className="annual-production-container">
        <label>Annual Production:</label>
        <div className="table-wrapper">
          <table className="annual-production-table">
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
              {formData.operationDetails.annual_production.map((item, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={item.product}
                      onChange={(e) => handleProductionChange(index, "product", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.type}
                      onChange={(e) => handleProductionChange(index, "type", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleProductionChange(index, "quantity", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={(e) => handleProductionChange(index, "unit", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={item.market_value}
                      onChange={(e) => handleProductionChange(index, "market_value", e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <button type="button" className="remove-product-btn" onClick={() => removeProductionEntry(index)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className="add-product-btn" onClick={addProductionEntry}>
            Add Product
          </button>
        </div>
      </div>
      {/* Area / Scope of Production */}
      <div className="form-field">
        <label>Area/Scope of Production:</label>
        <input
          type="text"
          name="production_scope"
          value={formData.operationDetails.production_scope}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Area/Scope of Sales:</label>
        <input
          type="text"
          name="sales_scope"
          value={formData.operationDetails.sales_scope}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Total Assets:</label>
        <input
          type="number"
          name="total_assets"
          value={formData.operationDetails.total_assets}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Total Liabilities:</label>
        <input
          type="number"
          name="total_liabilities"
          value={formData.operationDetails.total_liabilities}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-field">
        <label>Annual Gross Income:</label>
        <input
          type="number"
          name="annual_gross_income"
          value={formData.operationDetails.annual_gross_income}
          onChange={handleInputChange}
        />
      </div>

      {/*Experience in Procurement*/}
      <div className="form-field">
        <label>Experience in Procurement:</label>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", tableLayout: "auto", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Method</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Number of Participation</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Contracts Won</th>
                <th style={{ border: "1px solid #000", padding: "8px" }}>Successful Implementations</th>
              </tr>
            </thead>
            <tbody>
              {[
                "Competitive Bidding",
                "Negotiated Procurement",
                "Shopping",
                "Small Value Procurement",
                "No Experience",
              ].map((method, index) => {
                const isChecked = !!formData.operationDetails.procurement_experience.find(
                  (exp) => exp.method === method
                );
                const experience = formData.operationDetails.procurement_experience.find(
                  (exp) => exp.method === method
                ) || { method, participation_count: "", contracts_won: "", successful_implementations: "" };
                return (
                  <tr key={method}>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <input
                        type="checkbox"
                        value={method}
                        onChange={handleProcurementChange}
                        checked={isChecked}
                      />
                      {method}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <input
                        type="number"
                        value={experience.participation_count}
                        onChange={(e) =>
                          handleProcurementNumbers(
                            index,
                            "participation_count",
                            e.target.value
                          )
                        }
                        style={{ width: "100%" }}
                        disabled={!isChecked}
                      />
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <input
                        type="number"
                        value={experience.contracts_won}
                        onChange={(e) =>
                          handleProcurementNumbers(
                            index,
                            "contracts_won",
                            e.target.value
                          )
                        }
                        style={{ width: "100%" }}
                        disabled={!isChecked}
                      />
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      <input
                        type="number"
                        value={experience.successful_implementations}
                        onChange={(e) =>
                          handleProcurementNumbers(
                            index,
                            "successful_implementations",
                            e.target.value
                          )
                        }
                        style={{ width: "100%" }}
                        disabled={!isChecked}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Sponsor Agency */}
      <div className="form-field">
        <label>Sponsor Agency:</label>
        <input
          type="text"
          name="sponsor_agency"
          value={formData.operationDetails.sponsor_agency}
          onChange={handleInputChange}
          required
        />
        {errors.sponsor_agency && <span className="error">{errors.sponsor_agency}</span>}
      </div>

      <div className="form-field">
        <label>Other Sponsor Agency (Optional):</label>
        <input
          type="text"
          name="other_sponsor_agency"
          value={formData.operationDetails.other_sponsor_agency}
          onChange={handleInputChange}
        />
      </div>
      <div className="step-nav">
        <button type="button" className="back-btn" onClick={prevStep}>Back</button>
        <button type="button" className="next-btn" onClick={nextStep}>Next</button>
      </div>
    </div>
  );
};

export default OperationStep;