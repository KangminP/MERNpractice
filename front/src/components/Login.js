import React, { Component } from "react";

// router-dom
import { Link } from "react-router-dom";

class Login extends Component {
    render() {
        return (
            <div>
                <Link to="/Signup">
                    <button>회원가입</button>
                </Link>
            </div>
        );
    }
}

export default Login;
