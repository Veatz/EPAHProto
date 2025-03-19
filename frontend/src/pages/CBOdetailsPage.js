import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CBOdetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cbo, setCBO] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCBO = async () => {
      try {
        const response = await fetch(`/api/cbos/${id}`);
        if (!response.ok) throw new Error("Failed to fetch CBO");
        const json = await response.json();
        setCBO(json);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCBO();
  }, [id]);

  if (error) return <p className="error-text">Error: {error}</p>;
  if (!cbo) return <p className="loading-text">Loading CBO details...</p>;

  const numberOfMembers = cbo.operationDetails?.number_of_members || { male: 0, female: 0 };
  const totalMembers = (numberOfMembers.male || 0) + (numberOfMembers.female || 0);

  return (
    <div className="cbo-details-page">
      <div className="cbo-document">
        <h1 className="cbo-title">{cbo.name}</h1>
        <p><strong>Name:</strong> {cbo.name}</p>
        <p><strong>Shortname:</strong> {cbo.shortname}</p>
        <p><strong>Address:</strong> {cbo.address}</p>
        <p><strong>CBO Representation:</strong> {cbo.representation}</p>
        <p><strong>Short Description:</strong> {cbo.description || "N/A"}</p>

        <h2>Operations</h2>
        <p><strong>Organization Registration:</strong> 
          {cbo.operationDetails?.organization_registration === "Others"
            ? cbo.operationDetails?.other_organization_registration || "N/A"
            : cbo.operationDetails?.organization_registration || "N/A"}
        </p>
        <p><strong>Date Established:</strong> {cbo.operationDetails?.date_established || "N/A"}</p>
        <p><strong>Target Members:</strong> {cbo.operationDetails?.target_members || "N/A"}</p>
        <p><strong>Number of Male Members:</strong> {numberOfMembers.male}</p>
        <p><strong>Number of Female Members:</strong> {numberOfMembers.female}</p>
        <p><strong>Total Members:</strong> {totalMembers}</p>

        <h2>Annual Production</h2>
        {cbo.operationDetails?.annual_production?.length > 0 ? (
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Unit</th>
                  <th>Market Value (PHP)</th>
                </tr>
              </thead>
              <tbody>
                {cbo.operationDetails.annual_production.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product}</td>
                    <td>{item.type}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.market_value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No production data available.</p>
        )}

        <h2>Procurement Experience</h2>
        {cbo.operationDetails?.procurement_experience?.length > 0 ? (
          <div className="table-container">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>Method</th>
                  <th>Participation</th>
                  <th>Contracts Won</th>
                  <th>Successful Implementations</th>
                </tr>
              </thead>
              <tbody>
                {cbo.operationDetails.procurement_experience.map((exp, index) => (
                  <tr key={index}>
                    <td>{exp.method}</td>
                    <td>{exp.participation_count}</td>
                    <td>{exp.contracts_won}</td>
                    <td>{exp.successful_implementations}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No procurement experience data available.</p>
        )}

        <h2>Contact Information</h2>
        <p><strong>Primary Contact Name:</strong> {cbo.primaryContact?.name || "N/A"}</p>
        <p><strong>Designation:</strong> {cbo.primaryContact?.designation || "N/A"}</p>
        <p><strong>Email:</strong> {cbo.primaryContact?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {cbo.primaryContact?.telephone || cbo.primaryContact?.mobile || "N/A"}</p>

        <h2>Legal Documents</h2>
        {cbo.files && Object.keys(cbo.files).length > 0 ? (
          <ul>
            {Object.keys(cbo.files).map((fileKey) => (
              <li key={fileKey}>
                <strong>{fileKey}:</strong> <a href={cbo.files[fileKey]?.url} target="_blank" rel="noopener noreferrer">View File</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No legal documents uploaded.</p>
        )}

        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CBOdetailsPage;
