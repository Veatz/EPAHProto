import React, { useState } from "react";
import BasicInfoStep from "./registrationSteps/BasicInfoStep";
import OperationStep from "./registrationSteps/OperationStep";
import { registerCBO } from "../utils/api"; // Import API function

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false); // Loading state
  const [formData, setFormData] = useState({
    name: "",
    shortname: "",
    description: "",
    address: "",
    representation: "",
    operationDetails: {  // Update key to camelCase to match backend
      organization_registration: "",
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
    }
  });

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.shortname || !formData.address || !formData.representation) {
        alert("Please fill in all required fields");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    console.log("Submitting CBO Data:", JSON.stringify(formData, null, 2)); // Debugging
  
    try {
      const response = await registerCBO(formData); // API call
      console.log("Server Response:", response);
  
      alert("Registration Successful!");
      setFormData({
        name: "",
        shortname: "",
        description: "",
        address: "",
        representation: "",
        operationDetails: {
           organization_registration: "",
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
     });
     
  
      setStep(1);
    } catch (error) {
      console.error("Error registering CBO:", error);
      alert("Registration Failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {step === 1 && <BasicInfoStep formData={formData} setFormData={setFormData} />}
      {step === 2 && (
  <OperationStep
  formData={formData.operationDetails}
  setFormData={(newOperationData) =>
    setFormData({ ...formData, operationDetails: newOperationData })
  }
/>
)}
      <div>
        {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
        {step < 2 && <button type="button" onClick={nextStep}>Next</button>}
        {step === 2 && (
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </form>
  );
};

export default RegistrationForm;
