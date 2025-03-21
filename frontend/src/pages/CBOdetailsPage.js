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
        console.log("🔹 CBO Data:", json); // ✅ Check full response
        console.log("🔹 CBO Files:", json.files || "No files found");
  
        setCBO(json);
      } catch (error) {
        console.error("❌ Error fetching CBO:", error.message);
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
        <h2>Basic Information</h2>
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
        <p>
          <strong>Date Established:</strong> {cbo.operationDetails?.date_established 
            ? new Date(cbo.operationDetails.date_established).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }) 
            : "N/A"}
        </p>
        <p><strong>Philippine Statistical Industry Classification:</strong> {cbo.operationDetails?.psic || "N/A"}</p>
        <p><strong>Target Members:</strong> {cbo.operationDetails?.target_members || "N/A"}</p>
        <p><strong>Area / Scope of Production:</strong> {cbo.operationDetails?.production_scope || "N/A"}</p>
        <p><strong>Area / Scope of Sales:</strong> {cbo.operationDetails?.sales_scope || "N/A"}</p>
        <p><strong>Sponsor Agency:</strong> {cbo.operationDetails?.sponsor_agency || "N/A"}</p>
        <p><strong>Other Sponsor Agency:</strong> {cbo.operationDetails?.other_sponsor_agency || "N/A"}</p>
        
        <div className="table-container">
        <table className="styled-table">
          <thead>
            <tr>
              <th colSpan="2" style={{ textAlign: "center", padding: "5px" }}>
                Number of Members
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}><strong style={{ marginLeft: "10px"}}>Male:</strong></td>
              <td>{numberOfMembers.male}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}><strong style={{ marginLeft: "10px"}}>Female:</strong></td>
              <td >{numberOfMembers.female}</td>
            </tr>
            <tr>
              <td style={{ textAlign: "left", padding: "5px" }}><strong style={{ marginLeft: "10px"}}>Total Members:</strong></td>
              <td>{totalMembers}</td>
            </tr>
          </tbody>
        </table>
      </div>
        
        <h3 style={{textAlign: "center"}}>Annual Production</h3>
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

        <div className="table-container">
          <table className="styled-table">
            <thead>
              <tr>
                <th colSpan="2" style={{ textAlign: "center", padding: "5px" }}>
                  Financial Overview
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }}><strong>Total Assets:</strong></td>
                <td style={{ textAlign: "left", padding: "5px" }}>
                  {cbo.operationDetails?.total_assets || "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }}><strong>Total Liabilities:</strong></td>
                <td style={{ textAlign: "left", padding: "5px" }}>
                  {cbo.operationDetails?.total_liabilities || "N/A"}
                </td>
              </tr>
              <tr>
                <td style={{ textAlign: "left", padding: "5px" }}><strong>Annual Gross Income:</strong></td>
                <td style={{ textAlign: "left", padding: "5px" }}>
                  {cbo.operationDetails?.annual_gross_income || "N/A"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      <h3 style={{ textAlign: "center", margin: "5px auto" }}>Procurement Experience</h3>
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
        <h3>Primary Contact Person</h3>
        <p><strong>Complete Name:</strong> {cbo.primaryContact?.name || "N/A"}</p>
        <p><strong>Designation:</strong> {cbo.primaryContact?.designation || "N/A"}</p>
        <p><strong>Email:</strong> {cbo.primaryContact?.email || "N/A"}</p>
        <p><strong>Telephone Number:</strong> {cbo.primaryContact?.telephone || "N/A"}</p>
        <p><strong>Mobile Number:</strong> {cbo.primaryContact?.mobile || "N/A"}</p>

        <h3>Secondary Contact Person</h3>
        <p><strong>Complete Name:</strong> {cbo.secondaryContact?.name || "N/A"}</p>
        <p><strong>Designation:</strong> {cbo.secondaryContact?.designation || "N/A"}</p>
        <p><strong>Email:</strong> {cbo.secondaryContact?.email || "N/A"}</p>
        <p><strong>Telephone Number:</strong> {cbo.secondaryContact?.telephone || "N/A"}</p>
        <p><strong>Mobile Number:</strong> {cbo.secondaryContact?.mobile || "N/A"}</p>

        <h2>Legal Documents</h2>
        {cbo.files && Object.keys(cbo.files).length > 0 ? (
          <ul>
            {Object.entries(cbo.files).map(([fileKey, fileData]) =>
              fileData?.file ? (
                <li key={fileKey}>
                  <strong>{fileKey.replace(/([A-Z])/g, " $1").trim()}:</strong>  
                  <a
                    href={`http://localhost:4000/uploads/${fileData.file}`}  
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View File
                  </a>

                  {/* ✅ Display subfields if they exist */}
                  {Object.keys(fileData).length > 1 && (
                    <ul>
                      {Object.entries(fileData).map(([subField, value]) =>
                        subField !== "file" && value ? ( // Exclude "file" field
                          <li key={subField}>
                            <strong>{subField.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
                          </li>
                        ) : null
                      )}
                    </ul>
                  )}
                </li>
              ) : null
            )}
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
