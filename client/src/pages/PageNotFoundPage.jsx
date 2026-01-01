import { NavLink } from "react-router-dom";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const PageNotFoundPage = () => {
  return (
    <div className="not-found-container">
      <FaExclamationTriangle className="not-found-icon" />
      <h1>Page Not Found</h1>
      <p>This page does not exist</p>
      <p>
        Go back to the <br /><NavLink to="/">Home <FaHome /></NavLink>
      </p>
    </div>
  );
};

export default PageNotFoundPage;
