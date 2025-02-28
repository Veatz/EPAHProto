import { Link } from "react-router-dom";

const CBODetails = ({ cbo }) => {
  return (
    <div className="cbo-details">
      <h4>
        <Link to={`/cbo/${cbo._id}`}>{cbo.name}</Link>
      </h4>
      <p><strong>Shortname:</strong> {cbo.shortname}</p>
      <p><strong>Address:</strong> {cbo.address}</p>
      <p><strong>Number of Members:</strong> {cbo.number_of_members}</p>
    </div>
  );
};

export default CBODetails;
