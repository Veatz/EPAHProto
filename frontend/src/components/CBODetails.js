import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CBODetails = ({ cbo }) => {
  if (!cbo) return <div>No CBO data available</div>;

  const totalMembers = cbo.number_of_members?.male + cbo.number_of_members?.female;

  return (
    <div className="cbo-details">
      <h4>
        <Link to={`/cbo/${cbo._id}`} aria-label={`View details of ${cbo.name}`}>
          {cbo.name}
        </Link>
      </h4>
      <p><strong>Shortname:</strong> {cbo.shortname}</p>
      <p><strong>Address:</strong> {cbo.address}</p>
      <p><strong>Number of Members:</strong> {totalMembers}</p>
    </div>
  );
};

CBODetails.propTypes = {
  cbo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    shortname: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    number_of_members: PropTypes.shape({
      male: PropTypes.number.isRequired,
      female: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default CBODetails;