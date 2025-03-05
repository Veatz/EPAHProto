import { useState } from "react";

const RegistrationDocumentsStep = ({ onNext, onBack, setDocumentsData }) => {
    const [documents, setDocuments] = useState({
        board_resolution: null,
        registration_certificate: null,
        business_permit: null,
        bank_account_certificate: null,
        bir_certificate: null,
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setDocuments((prev) => ({ ...prev, [name]: files.length > 0 ? files[0] : null }));
    };

    const handleSubmit = () => {
        setDocumentsData(documents);
        onNext();
    };

    return (
        <div className="step-container">
            <h2>Step 3: Upload Registration Documents </h2>
            
            <div className="form-field">
            <label>Board Resolution</label>
            <input type="file" name="board_resolution" onChange={handleFileChange} />
            </div>
            <div className="form-field">
            <label>Registration Certificate</label>
            <input type="file" name="registration_certificate" onChange={handleFileChange} />
            </div>

            <div className="form-field">
            <label>Business Permit</label>
            <input type="file" name="business_permit" onChange={handleFileChange} />
            {documents.business_permit && <p>Selected: {documents.business_permit.name}</p>}
            </div>
            <div className="form-field">
            <label>Bank Account Certificate</label>
            <input type="file" name="bank_account_certificate" onChange={handleFileChange} />
            {documents.bank_account_certificate && <p>Selected: {documents.bank_account_certificate.name}</p>}
            </div>
            <div className="form-field">
            <label>BIR Certificate</label>
            <input type="file" name="bir_certificate" onChange={handleFileChange} />
            {documents.bir_certificate && <p>Selected: {documents.bir_certificate.name}</p>}
            </div>
            <button onClick={onBack}>Back</button>
        </div>
    );
};

export default RegistrationDocumentsStep;
