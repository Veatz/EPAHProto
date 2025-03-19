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

const subFieldsByFile = {
  dti: ["territorialScope", "dateOfIssuance", "dateOfValidity"],
  sec: ["typeOfRegistration", "registryNo", "dateOfIssuance", "dateOfValidity"],
  cda: ["typeOfCooperative", "registryNo", "dateOfIssuance", "dateOfValidity"],
  csoNpoNgoPo: ["agencyIssuer", "registryNo", "dateOfIssuance", "dateOfValidity"],
  doleRule1020: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  auditedFinancialStatement: ["year"],
  latestITR: ["year"],
  businessPermit: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  ffeDis: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  birRegistration: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  philGeps: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  rsbsa: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  fishAr: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  fda: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  agrarianReformBeneficiaries: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  farmersAssociation: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  irrigatorsAssociation: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  laborUnionsWorkersAssoc: ["registryNo", "dateOfIssuance", "dateOfValidity"],
  slpa: ["registryNo", "dateOfIssuance", "dateOfValidity"],
};

const subFieldLabels = {
  territorialScope: "Territorial Scope",
  typeOfRegistration: "Type of Registration",
  typeOfCooperative: "Type of Cooperative",
  agencyIssuer: "Agency Issuer",
  registryNo: "Registry Number",
  dateOfIssuance: "Date of Issuance",
  dateOfValidity: "Date of Validity",
  year: "Year",
};

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
    } else if (!["Cooperative", "Stock Corporation", "Non-stock Corporation", "Unregistered", "Others"].includes(
      formData.operationDetails.organization_registration
    )) {
      newErrors.organization_registration = "Invalid organization registration type";
    }

    if (formData.operationDetails.organization_registration === "Others" &&
        !formData.operationDetails.other_organization_registration.trim()) {
      newErrors.other_organization_registration = "You must specify an organization type when 'Others' is selected";
    }

    if (!formData.operationDetails.date_established) {
      newErrors.date_established = "Date established is required";
    } else if (new Date(formData.operationDetails.date_established) > new Date()) {
      newErrors.date_established = "Date established cannot be in the future";
    }

    // ✅ Ensure Target Members is required
    if (!formData.operationDetails.target_members.trim()) {
      newErrors.target_members = "Target members field is required";
    }

    // ✅ Ensure Total Number of Members aren't 0
    if (
      formData.operationDetails.number_of_members.male === 0 &&
      formData.operationDetails.number_of_members.female === 0
      ) {
          newErrors.number_of_members = "Number of members cannot be zero";
      }

    // ✅ Ensure Annual Production has at least one product
    if (formData.operationDetails.annual_production.length === 0) {
      newErrors.annual_production = "At least one product is required in Annual Production";
    } else {
      formData.operationDetails.annual_production.forEach((product, index) => {
        if (!product.product.trim()) {
          newErrors[`annual_production_product_${index}`] = `Product name is required for item ${index + 1}`;
        }
        if (!product.type.trim()) {
          newErrors[`annual_production_type_${index}`] = `Product type is required for item ${index + 1}`;
        }
        if (product.quantity <= 0) {
          newErrors[`annual_production_quantity_${index}`] = `Quantity must be greater than 0 for item ${index + 1}`;
        }
        if (!product.unit.trim()) {
          newErrors[`annual_production_unit_${index}`] = `Unit is required for item ${index + 1}`;
        }
        if (product.market_value < 0) {
          newErrors[`annual_production_market_value_${index}`] = `Market value cannot be negative for item ${index + 1}`;
        }
      });
    }

    // ✅ Ensure Area/Scope of Production is required
    if (!formData.operationDetails.production_scope.trim()) {
      newErrors.production_scope = "Area/Scope of Production field is required";
    }

    // ✅ Ensure Area/Scope of Sales is required
    if (!formData.operationDetails.sales_scope.trim()) {
      newErrors.sales_scope = "Area/Scope of Sales field is required";
    }


    // ✅ Ensure Procurement Experience has at least one method (unless "No Experience" is selected)
    const noExperienceSelected = formData.operationDetails.procurement_experience.some(
      (exp) => exp.method === "No Experience"
    );

    if (!noExperienceSelected && formData.operationDetails.procurement_experience.length === 0) {
      newErrors.procurement_experience = "At least one procurement method is required";
    } else {
      formData.operationDetails.procurement_experience.forEach((entry, index) => {
        if (!entry.method.trim()) {
          newErrors[`procurement_experience_method_${index}`] = `Procurement method is required for entry ${index + 1}`;
        }
        if (entry.participation_count < 0) {
          newErrors[`procurement_experience_participation_${index}`] = `Participation count cannot be negative for item ${index + 1}`;
        }
        if (entry.contracts_won < 0) {
          newErrors[`procurement_experience_contracts_${index}`] = `Contracts won cannot be negative for item ${index + 1}`;
        }
        if (entry.successful_implementations < 0) {
          newErrors[`procurement_experience_success_${index}`] = `Successful implementations cannot be negative for item ${index + 1}`;
        }
      });
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
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.primaryContact.email)) {
          newErrors.primaryContactEmail = "Invalid email format";
        }
      }
      if (!formData.primaryContact.mobile.trim()) {
        newErrors.primaryContactMobile = "Primary contact mobile is required";
      } else {
        const mobileRegex = /^[0-9]{10,15}$/;
        if (!mobileRegex.test(formData.primaryContact.mobile)) {
          newErrors.primaryContactMobile = "Invalid mobile number format";
        }
      }
    }
  }
  
  if (step === 4) {
    Object.keys(formData.files).forEach((fileKey) => {
      const fileData = formData.files[fileKey];
  
      if (fileData?.file) {
        const requiredSubFields = subFieldsByFile[fileKey] || [];
  
        requiredSubFields.forEach((subField) => {
          const value = fileData[subField];
  
          if (!value || (typeof value === "string" && !value.trim())) {
            newErrors[`${fileKey}_${subField}`] = `${subFieldLabels[subField] || subField} is required`;
          }
  
          if (subField === "dateOfIssuance" && new Date(value) > new Date()) {
            newErrors[`${fileKey}_dateOfIssuance`] = "Date of Issuance cannot be in the future";
          }
  
          if (subField === "dateOfValidity" && new Date(value) < new Date()) {
            newErrors[`${fileKey}_dateOfValidity`] = "Date of Validity must be in the future";
          }
        });
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

    console.log("Submitting form data:", formData); // Debugging

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