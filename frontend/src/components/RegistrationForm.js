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
  const [errors, setErrors] = useState({});
  const { dispatch } = useCBOContext();

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
      annual_production: [
        { product: "", type: "", quantity: 0, unit: "", market_value: 0 }
      ],
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
    philGeps: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
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
  let newErrors = {};

  if (step === 1) {
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.shortname.trim()) newErrors.shortname = "Short name is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.representation) {
      newErrors.representation = "Representation is required";
    } else if (!["Main", "Branch"].includes(formData.representation)) {
      newErrors.representation = "Invalid representation type";
    }
  }

  if (step === 2) {
    if (!formData.operationDetails.organization_registration) {
      newErrors.organization_registration = "Organization registration is required";
    } else if (
      !["Cooperative", "Stock Corporation", "Non-stock Corporation", "Unregistered", "Others"].includes(
        formData.operationDetails.organization_registration
      )
    ) {
      newErrors.organization_registration = "Invalid organization registration type";
    }

    if (
      formData.operationDetails.organization_registration === "Others" &&
      !formData.operationDetails.other_organization_registration.trim()
    ) {
      newErrors.other_organization_registration = "You must specify an organization type when 'Others' is selected";
    }

    if (!formData.operationDetails.date_established) {
      newErrors.date_established = "Date established is required";
    } else if (new Date(formData.operationDetails.date_established) > new Date()) {
      newErrors.date_established = "Date established cannot be in the future";
    }

    if (formData.operationDetails.number_of_members.male < 0) {
      newErrors.number_of_members_male = "Number of male members cannot be negative";
    }
    if (formData.operationDetails.number_of_members.female < 0) {
      newErrors.number_of_members_female = "Number of female members cannot be negative";
    }
  }

  if (step === 3) {
    if (!formData.primaryContact || typeof formData.primaryContact !== "object") {
      newErrors.primaryContact = "Primary contact details are required";
    } else {
      if (!formData.primaryContact.name.trim()) {
        newErrors.primaryContactName = "Primary contact name is required";
      }
      if (!formData.primaryContact.designation.trim()) {
        newErrors.primaryContactDesignation = "Primary contact designation is required";
      }
      if (!formData.primaryContact.email.trim()) {
        newErrors.primaryContactEmail = "Primary contact email is required";
      }
      if (!formData.primaryContact.mobile.trim()) {
        newErrors.primaryContactMobile = "Primary contact mobile is required";
      }
    }
  }

  if (step === 4) {
    if (!formData.files.rctResolution) newErrors.rctResolution = "RCT Resolution is required";

    const requiredFileFields = ["dti", "sec", "cda", "csoNpoNgoPo", "doleRule1020", "businessPermit"];
    requiredFileFields.forEach((key) => {
      if (!formData.files[key]?.file) {
        newErrors[key] = `${key} file is required`;
      }
    });
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

    console.log("Final Data Being Sent:", JSON.stringify(formData, null, 2)); // Log data before sending
  
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
          philGeps: { file: null, registryNo: "", dateOfIssuance: "", dateOfValidity: "" },
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
      {step === 1 && <BasicInfoStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} />}
      {step === 2 && <OperationStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <ContactStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <FileUploadStep formData={formData} setFormData={setFormData} errors={errors} prevStep={prevStep} handleSubmit={handleSubmit} loading={loading} />}
    </form>
  );
};


export default RegistrationForm;