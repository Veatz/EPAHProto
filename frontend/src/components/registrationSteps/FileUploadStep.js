import React from "react";

const FileUploadStep = ({ formData, setFormData, errors }) => {
  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        files: {
          ...prevData.files,
          [field]: { ...prevData.files[field], file },
        },
      }));
    }
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

  const sections = {
    "Legal Requirements": ["rctResolution", "dti", "sec", "cda", "csoNpoNgoPo", "doleRule1020"],
    "Financial Requirements": ["bankBook", "auditedFinancialStatement", "latestITR", "salesInvoice"],
    "Additional Registration/Accreditations": ["businessPermit", "ffeDis", "birRegistration", "rsbsa", "fishAr", "fda", "agrarianReformBeneficiaries", "farmersAssociation", "irrigatorsAssociation", "laborUnionsWorkersAssoc"],
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
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, field)}
                  className="file-input"
                />
                </div>
                                {formData.files[field]?.file && (
                    <div className="form-field">
                      {Object.keys(formData.files[field]).map((subField) => {
                        if (subField === "file") return null; // Skip file field

                        let inputType = "text"; // Default input type
                        if (subField.includes("date")) inputType = "date"; // Date fields
                        else if (subField.includes("year") || subField.includes("registryNo")) inputType = "number"; // Number fields

                        return (
                          <div key={subField} className="subfield-container">
                            <label className="subfield-label">
                              {subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <input
                              type={inputType}
                              className="subfield-input"
                              placeholder={subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                              value={formData.files[field][subField]}
                              onChange={(e) => handleInputChange(e, field, subField)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FileUploadStep;
