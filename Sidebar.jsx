import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faImage, faVideo, faCode, faMusic, faCog } from "@fortawesome/free-solid-svg-icons";
import "./sidebar.css"; // Sidebar styles

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🚀 Genius</h2>
      <ul className="nav flex-column">
        <li className="nav-item"><Link to="/" className="nav-link"><FontAwesomeIcon icon={faComments} /> Dashboard</Link></li>
        <li className="nav-item"><Link to="/conversation" className="nav-link"><FontAwesomeIcon icon={faComments} /> Conversation</Link></li>
        <li className="nav-item"><Link to="/image-generation" className="nav-link"><FontAwesomeIcon icon={faImage} /> Image Generation</Link></li>
        <li className="nav-item"><Link to="/video-generation" className="nav-link"><FontAwesomeIcon icon={faVideo} /> Video Generation</Link></li>
        <li className="nav-item"><Link to="/music-generation" className="nav-link"><FontAwesomeIcon icon={faMusic} /> Music Generation</Link></li>
        <li className="nav-item"><Link to="/code-generation" className="nav-link"><FontAwesomeIcon icon={faCode} /> Code Generation</Link></li>
        <li className="nav-item"><Link to="/signup" className="nav-link"><FontAwesomeIcon icon={faCode} /> Signup</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
