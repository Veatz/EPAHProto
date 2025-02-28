import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CBOdetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cbo, setCBO] = useState(null);

  useEffect(() => {
    const fetchCBO = async () => {
      const response = await fetch(`/api/cbos/${id}`);
      const json = await response.json();

      if (response.ok) {
        setCBO(json);
      }
    };

    fetchCBO();
  }, [id]);

  return (
    <div className="cbo-details-page">
      {cbo ? (
        <div className="cbo-document">
          <h1 className="cbo-title">{cbo.name}</h1>
          <p><strong>Shortname:</strong> {cbo.shortname}</p>
          <p><strong>Address:</strong> {cbo.address}</p>
          <p><strong>CBO Representation:</strong> {cbo.representation}</p> {/* ✅ NEW */}
          <p><strong>Number of Members:</strong> {cbo.number_of_members}</p>
          <p><strong>Contact:</strong> {cbo.contact}</p>
          <p><strong>Registered at:</strong> {new Date(cbo.createdAt).toLocaleString()}</p>
          <button className="back-button" onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      ) : (
        <p className="loading-text">Loading CBO details...</p>
      )}
    </div>
  );
};

export default CBOdetailsPage;
