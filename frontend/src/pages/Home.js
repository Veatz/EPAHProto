import { useEffect } from "react";
import { useCBOContext } from "../hooks/useCBOcontext";
import { Link } from "react-router-dom";

const Home = () => {
  const { cbos, dispatch } = useCBOContext();

  useEffect(() => {
    const fetchCBOs = async () => {
      const response = await fetch("/api/cbos");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_CBOS", payload: json });
      }
    };

    fetchCBOs();
  }, [dispatch]);

  return (
    <div className="home">
      {/* Header Section */}
      <div className="header">
        <h1>Community-Based Organizations</h1>
        <Link to="/register" className="register-button">REGISTER</Link>
      </div>

      {/* CBO Cards Grid */}
      <div className="cbo-cards-container">
        {cbos &&
          cbos.map((cbo) => (
            <div key={cbo._id} className="cbo-card">
              <h3>
                <Link to={`/cbos/${cbo._id}`} className="cbo-title-link">
                  {cbo.name}
                </Link>
              </h3>
              <p><strong>Shortname:</strong> {cbo.shortname}</p>
              <p><strong>Address:</strong> {cbo.address}</p>
              <p><strong>Short Description:</strong> {cbo.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
