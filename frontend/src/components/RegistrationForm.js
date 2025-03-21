import React, { useState } from "react";
import BasicInfoStep from "./registrationSteps/BasicInfoStep"; // Step 1
import OperationStep from "./registrationSteps/OperationStep"; // Step 2
import ContactStep from "./registrationSteps/ContactStep"; // Step 3
import FileUploadStep from "./registrationSteps/FileUploadStep"; // Step 4

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // 🔹 Initial Form Data (including files)
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
      annual_production: [{
        product: "", type: "", quantity: 0, unit: "", market_value: 0
      }],
      production_scope: "",
      sales_scope: "",
      total_assets: 0,
      total_liabilities: 0,
      annual_gross_income: 0,
      procurement_experience: [],
      sponsor_agency: "",
      other_sponsor_agency: "",
    },
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
    files: {}, // 🔹 Now properly handled in FormData
  });

  // 🔹 Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);

    try {
        const formDataToSend = new FormData();

        // ✅ Ensure all fields are appended properly
        Object.keys(formData).forEach((key) => {
            if (key !== "files") {
                formDataToSend.append(key, JSON.stringify(formData[key])); // ✅ Convert objects to JSON
            }
        });

        // ✅ Append all files
        Object.keys(formData.files).forEach((fileKey) => {
            const fileData = formData.files[fileKey];
            if (fileData?.file) {
                formDataToSend.append(fileKey, fileData.file);
            }
        });

        console.log("🟢 Final FormData being sent:", [...formDataToSend.entries()]); // ✅ Debugging Output

        // ✅ Send Request
        const response = await fetch("http://localhost:4000/api/cbos", {
            method: "POST",
            body: formDataToSend,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to register CBO");
        }

        const data = await response.json();
        console.log("✅ Success:", data);
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
          files: {}, // Reset file uploads
        });  // Reset form after submission
    } catch (error) {
        console.error("❌ Error registering CBO:", error);
        alert("Registration Failed: " + error.message);
    } finally {
        setLoading(false);
    }
};

  
  // 🔹 Navigation Between Steps
  const nextStep = () => {
    if (validateStep()) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  // 🔹 Validation for Each Step
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

    if (step === 3) {
      if (!formData.primaryContact?.name.trim()) {
        newErrors.primaryContactName = "Primary contact name is required";
      }
      if (!formData.primaryContact?.designation.trim()) {
        newErrors.primaryContactDesignation = "Primary contact designation is required";
      }
      if (!formData.primaryContact?.email.trim()) {
        newErrors.primaryContactEmail = "Primary contact email is required";
      }
    }

    if (step === 4) {
      Object.keys(formData.files).forEach((fileKey) => {
        if (formData.files[fileKey]?.file) {
          console.log(`File ${fileKey} exists`);
        } else {
          newErrors[fileKey] = `Please upload a ${fileKey}`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {step === 1 && <BasicInfoStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} />}
      {step === 2 && <OperationStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} prevStep={prevStep} />}
      {step === 3 && <ContactStep formData={formData} setFormData={setFormData} errors={errors} nextStep={nextStep} prevStep={prevStep} />}
      {step === 4 && <FileUploadStep formData={formData} setFormData={setFormData} errors={errors} prevStep={prevStep} handleSubmit={handleSubmit} loading={loading} />}
    </form>
  );
};

export default RegistrationForm;
