import React, { Component } from "react";

// router-dom
import { Link } from "react-router-dom";

// css
import "./Navbar.css";
import Logo from "../../assets/images/snowballlogo.png";

class Navbar extends Component {
    render() {
        return (
            <div className="nav-container">
                <div className="nav-logo">
                    <img src={Logo} alt="" />
                </div>

                <div className="nav-link-group">
                    <Link to="/About" className="nav-link-item">
                        About
                    </Link>
                    <Link to="/" className="nav-link-item">
                        Contribute
                    </Link>
                    <Link to="/Login" className="nav-link-item">
                        Login
                    </Link>
                </div>
            </div>
        );
    }
}

export default Navbar;
