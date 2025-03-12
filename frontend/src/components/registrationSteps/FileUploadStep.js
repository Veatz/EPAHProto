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
    dti: "DTI Registration",
    sec: "SEC Registration",
    cda: "CDA Registration",
    csoNpoNgoPo: "CSO/NPO/NGO/PO Registration",
    doleRule1020: "DOLE Rule 1020 Registration",
    bankBook: "Bank Book",
    auditedFinancialStatement: "Audited Financial Statement",
    latestITR: "Latest ITR",
    salesInvoice: "Sales Invoice",
    businessPermit: "Business Permit",
    ffeDis: "FFEDIS Registration",
    birRegistration: "BIR Registration",
    rsbsa: "RSBSA Registration",
    fishAr: "FISH-AR Registration",
    fda: "FDA Registration",
    agrarianReformBeneficiaries: "Agrarian Reform Beneficiaries",
    farmersAssociation: "Farmer's Association",
    irrigatorsAssociation: "Irrigators Association",
    laborUnionsWorkersAssoc: "Labor Unions and Workers' Association",
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
      <h2>Step 4: File Upload</h2>
      {Object.keys(sections).map((section) => (
        <div key={section} className="form-section">
          <h3 className="section-title">{section}</h3>
          <div className="form-table">
            {sections[section].map((field) => (
              <div key={field} className="form-row">
                <div className="form-title-row">{labels[field]}</div>
                <div className="form-inputs">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileChange(e, field)}
                    className="file-input"
                  />
                  {formData.files[field]?.file && (
                    <div className="form-field">
                      {Object.keys(formData.files[field]).map(
                        (subField) =>
                          subField !== "file" && (
                            <div key={subField} className="subfield-container">
                              <label className="subfield-label">
                                {subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                              </label>
                              <input
                                type="text"
                                className="subfield-input"
                                placeholder={subFieldLabels[subField] || subField.replace(/([A-Z])/g, " $1").trim()}
                                value={formData.files[field][subField]}
                                onChange={(e) => handleInputChange(e, field, subField)}
                              />
                            </div>
                          )
                      )}
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
