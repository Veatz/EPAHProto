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

  // Ensure operationDetails exists before accessing it
  const numberOfMembers = cbo.operationDetails?.number_of_members || { male: 0, female: 0 };
  const totalMembers = numberOfMembers.male + numberOfMembers.female;

  return (
    <div className="cbo-details-page">
      <div className="cbo-document">
        <h1 className="cbo-title">{cbo.name}</h1>
        <p><strong>Shortname:</strong> {cbo.shortname}</p>
        <p><strong>Address:</strong> {cbo.address}</p>
        <p><strong>CBO Representation:</strong> {cbo.representation}</p>
        <p><strong>Number of Members:</strong> {totalMembers}</p>
        
        <h2>Contact Information</h2>
        <p><strong>Primary Contact Name:</strong> {cbo.primaryContact?.name || "N/A"}</p>
        <p><strong>Designation:</strong> {cbo.primaryContact?.designation || "N/A"}</p>
        <p><strong>Email:</strong> {cbo.primaryContact?.email || "N/A"}</p>
        <p><strong>Phone:</strong> {cbo.primaryContact?.telephone || cbo.primaryContact?.mobile || "N/A"}</p>

        <p><strong>Registered at:</strong> {cbo.createdAt ? new Date(cbo.createdAt).toLocaleString() : "N/A"}</p>
        
        <button className="back-button" onClick={() => navigate("/")}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default CBOdetailsPage;
