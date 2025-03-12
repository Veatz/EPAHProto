import React, { useState } from "react";
import BasicInfoStep from "./registrationSteps/BasicInfoStep"; //  Step 1
import OperationStep from "./registrationSteps/OperationStep"; //  Step 2
import ContactStep from "./registrationSteps/ContactStep"; //  Step 3
import FileUploadStep from "./registrationSteps/FileUploadStep"; //  Step 4
import { registerCBO } from "../utils/api";
import { useCBOContext } from "../context/CBOcontext";

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Track validation errors
  const { dispatch } = useCBOContext(); // Use context to update CBO list

  const [formData, setFormData] = useState({
    name: "",
    shortname: "",
    description: "",
    address: "",
    representation: "",
    operationDetails: {
      organization_registration: "",
      other_organization_registration: "",
      date_established: "",
      psic: "",
      target_members: "",
      number_of_members: { male: 0, female: 0 },
      annual_production: [],
      production_scope: "",
      sales_scope: "",
      total_assets: 0,
      total_liabilities: 0,
      annual_gross_income: 0,
      procurement_experience: [],
      sponsor_agency: "",
      other_sponsor_agency: "",
    },
  // Step 3: Contact Persons
  primaryContact: {
    name: "",
    designation: "",
    email: "",
    telephone: "",
    mobile: "",
  },
  secondaryContact: {
    name: "",
    designation: "",
    email: "",
    telephone: "",
    mobile: "",
  },
  // Step 4: File Upload
  files: {
    rctResolution: null,
    dti: { file: null, territorialScope: "", dateOfIssuance: "", dateOfValidity: "" },
    sec: { file: null, typeOfRegistration: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    cda: { file: null, typeOfCooperative: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    csoNpoNgoPo: { file: null, agencyIssuer: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    doleRule1020: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    bankBook: null,
    auditedFinancialStatement: { file: null, year: "" },
    latestITR: { file: null, year: "" },
    salesInvoice: null,
    businessPermit: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    ffeDis: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    birRegistration: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    rsbsa: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    fishAr: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    fda: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    agrarianReformBeneficiaries: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    farmersAssociation: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    irrigatorsAssociation: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    laborUnionsWorkersAssoc: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    slpa: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
  },
});

const validateStep = () => {
  const newErrors = {};
  if (step === 1) {
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.shortname) newErrors.shortname = "Short name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.representation) newErrors.representation = "Representation is required";
  }
  if (step === 2) {
    if (!formData.operationDetails.organization_registration) {
      newErrors.organization_registration = "Organization registration is required";
    }
  }
  if (step === 3) {
    if (!formData.primaryContact.name) newErrors.primaryContactName = "Primary contact name is required";
    if (!formData.primaryContact.email) newErrors.primaryContactEmail = "Primary contact email is required";
  }
  if (step === 4) {
    if (!formData.files.rctResolution) newErrors.rctResolution = "RCT Resolution is required";
    if (!formData.files.businessPermit) newErrors.businessPermit = "Business Permit is required";
    if (!formData.files.doleCertificate) newErrors.doleCertificate = "DOLE Certificate is required";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const nextStep = () => {
  if (validateStep()) setStep(step + 1);
};

const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    try {
      const response = await registerCBO(formData);
      dispatch({ type: "CREATE_CBO", payload: response });
      alert("Registration Successful!");
      setStep(1);
      setFormData({
        name: "",
        shortname: "",
        description: "",
        address: "",
        representation: "",
        operationDetails: {
          organization_registration: "",
          other_organization_registration: "",
          date_established: "",
          psic: "",
          target_members: "",
          number_of_members: { male: 0, female: 0 },
          annual_production: [],
          production_scope: "",
          sales_scope: "",
          total_assets: 0,
          total_liabilities: 0,
          annual_gross_income: 0,
          procurement_experience: [],
          sponsor_agency: "",
          other_sponsor_agency: "",
        },
          // Step 3: Contact Persons
  primaryContact: {
    name: "",
    designation: "",
    email: "",
    telephone: "",
    mobile: "",
  },
  secondaryContact: {
    name: "",
    designation: "",
    email: "",
    telephone: "",
    mobile: "",
  },
  // Step 4: File Upload
  files: {
    rctResolution: null,
    dti: { file: null, territorialScope: "", dateOfIssuance: "", dateOfValidity: "" },
    sec: { file: null, typeOfRegistration: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    cda: { file: null, typeOfCooperative: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    csoNpoNgoPo: { file: null, agencyIssuer: "", registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    doleRule1020: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    bankBook: null,
    auditedFinancialStatement: { file: null, year: "" },
    latestITR: { file: null, year: "" },
    salesInvoice: null,
    businessPermit: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    ffeDis: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    birRegistration: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    rsbsa: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    fishAr: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    fda: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    agrarianReformBeneficiaries: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    farmersAssociation: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    irrigatorsAssociation: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    laborUnionsWorkersAssoc: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
    slpa: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
  },
});
    } catch (error) {
      console.error("Error registering CBO:", error);
      alert("Registration Failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && <BasicInfoStep formData={formData} setFormData={setFormData} errors={errors} />}
      {step === 2 && <OperationStep formData={formData} setFormData={setFormData} errors={errors} />}
      {step === 3 && <ContactStep formData={formData} setFormData={setFormData} errors={errors} />}
      {step === 4 && <FileUploadStep formData={formData} setFormData={setFormData} errors={errors} />}

      <div className="step-nav">
        {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
        {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
        {step === 4 && <button type="submit" disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>}
      </div>
    </form>
  );
};


export default RegistrationForm;