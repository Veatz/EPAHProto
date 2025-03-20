import React from "react";

const FileUploadStep = ({ formData, setFormData, prevStep, handleSubmit, loading }) => {
  const subFieldsByFile = {
    rct: [],
    dti: ["territorialScope","registryNo", "dateOfIssuance", "dateOfValidity"],
    sec: ["typeOfRegistration","registryNo", "dateOfIssuance", "dateOfValidity"],
    cda: ["typeOfCooperative","registryNo", "dateOfIssuance", "dateOfValidity"],
    csoNpoNgoPo: ["agencyIssuer","registryNo", "dateOfIssuance", "dateOfValidity" ],
    doleRule1020: ["registryNo","dateOfIssuance", "dateOfValidity"],
    bankBook: [],
    auditedFinancialStatement: ["year"],
    latestITR: ["year"],
    salesInvoice: [],
    businessPermit: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    ffeDis: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    birRegistration: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    rsbsa: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    fishAr: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    fda: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    agrarianReformBeneficiaries: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    farmersAssociation: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    irrigatorsAssociation: ["registryNo", "dateOfIssuance", "dateOfValidity"],
    laborUnionsWorkersAssoc: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  };
  
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (!file) return; // ✅ Prevent unnecessary updates

    setFormData((prevData) => ({
        ...prevData,
        files: {
            ...prevData.files,
            [field]: {
                file,
                ...Object.fromEntries((subFieldsByFile[field] || []).map((key) => [key, ""])), // Initialize subfields
            },
        },
    }));
};
  
  const handleInputChange = (e, field, subField) => {
    setFormData((prevData) => ({
      ...prevData,
      files: {
        ...prevData.files,
        [field]: { ...prevData.files[field], [subField]: e.target.value },
      },
    }));
  };

  const handleRemoveFile = (field) => {
    // Clear the file input manually by selecting it via ref
    const fileInput = document.getElementById(`file-input-${field}`);
    if (fileInput) fileInput.value = ""; // Reset file input
  
    // Remove file and subfields from state
    setFormData((prevData) => ({
      ...prevData,
      files: {
        ...prevData.files,
        [field]: undefined, // Completely remove the file and subfields
      },
    }));
  };

  
  const sections = {
    "Legal Requirements": ["rctResolution", "dti", "sec", "cda", "csoNpoNgoPo", "doleRule1020"],
    "Financial Requirements": ["bankBook", "auditedFinancialStatement", "latestITR", "salesInvoice"],
    "Additional Registration/Accreditations": [
      "businessPermit",
      "ffeDis",
      "birRegistration",
      "rsbsa",
      "fishAr",
      "fda",
      "agrarianReformBeneficiaries",
      "farmersAssociation",
      "irrigatorsAssociation",
      "laborUnionsWorkersAssoc",
    ],
  };

  const labels = {
    rctResolution: "RCT Resolution",
    dti: "Department of Trade and Industry (DTI)",
    sec: "Securities and Exchange Commission (SEC)",
    cda: "Cooperative Development Authority (CDA)",
    csoNpoNgoPo: (
      <>
        Civil Society Organization (CSO) <br />
        Non-Government Organization (NGO) <br />
        People's Organization (PO)
      </>
    ),
    doleRule1020: "Department of Labor and Employment (DOLE) Registration under Rule 1020",
    bankBook: "Bank Book/Books of Account",
    auditedFinancialStatement: "Updated / Audited Financial Statement",
    latestITR: "Latest Income Tax Return (ITR)",
    salesInvoice: "Sales Invoice",
    businessPermit: "Business Permit (Mayor's Permit)",
    ffeDis: "Farmers and Fisherfolk Enterprise Development Information System (FFEDIS)",
    birRegistration: "BIR Registration",
    philGeps: "Philippine Government Electronic Procurement (PhilGEPS)",
    rsbsa: "Registry System for Basic Sectors in Agriculture (RSBSA)",
    fishAr: "Fisherfolk Registration (FISH-AR)",
    fda: "Food and Drug Administration (FDA)",
    agrarianReformBeneficiaries: "Agrarian Reform Beneficiaries Organizations",
    farmersAssociation: "Farmer's Association",
    irrigatorsAssociation: "Irrigators Association",
    laborUnionsWorkersAssoc: "Labor Unions and Workers' Association",
    slpa: "Sustainable Livelihood Program Associations",
  };

  const subFieldLabels = {
    territorialScope: "Territorial Scope",
    dateOfIssuance: "Date of Issuance",
    dateOfValidity: "Date of Validity",
    typeOfRegistration: "Type of Registration",
    registryNo: "Registry Number",
    typeOfCooperative: "Type of Cooperative",
    agencyIssuer: "Agency Issuer",
    year: "Year",
  };

   return (
    <div className="step-container">
      <h2>Step 4: Legal Documents</h2>
      {Object.keys(sections).map((section) => (
        <div key={section} className="form-section">
          <h3 className="section-title">{section}</h3>
          <div className="form-table">
            {sections[section].map((field) => (
              <div key={field} className="form-row">
                <div className="form-title-row">{labels[field]}</div>
                <div className="form-inputs">
                <div className="file-upload-container">
                <input
                  id={`file-input-${field}`} // Unique ID for resetting
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, field)}
                  className="file-input"
                />

                {/* Show Remove Button only if a file is selected */}
                {formData.files[field]?.file && (
                  <button type="button" className="remove-file-btn" onClick={() => handleRemoveFile(field)}>
                  ✖
                </button>
                )}
              </div>

                  {/* Render subfields only if a file is selected and if the field has subfields */}
                  {formData.files[field]?.file && subFieldsByFile[field]?.length > 0 && (
                    <div className="form-field">
                      {subFieldsByFile[field].map((subField) => (
                        <div key={subField} className="subfield-container">
                          <label className="subfield-label">
                            {subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                          </label>
                          <input
                            type={
                              subField.includes("date")
                                ? "date"
                                : subField.includes("year") || subField.includes("registryNo")
                                ? "number"
                                : "text"
                            }
                            className="subfield-input"
                            placeholder={subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                            value={formData.files[field][subField]}
                            onChange={(e) => handleInputChange(e, field, subField)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="step-nav">
        <button type="button" className="back-btn" onClick={prevStep}>
          Back
        </button>
        <button type="button" className="next-btn" onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default FileUploadStep;