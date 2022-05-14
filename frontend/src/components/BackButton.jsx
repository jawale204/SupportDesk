import { Link } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
function BackButton({ url }) {
  return (
    <Link to={url}>
      <div className="btn btn-reverse btn-back">
        <FaArrowCircleLeft /> Go Back
      </div>
    </Link>
  );
}

export default BackButton;
