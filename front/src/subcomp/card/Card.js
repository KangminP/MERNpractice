import React from "react";

// router-dom
import { Link } from "react-router-dom";

// css
import "./Card.css";

const Card = (props) => {
    return (
        <div className="card text-center shadow">
            <Link to="/About">
                <div className="overflow">
                    <img
                        src={"../../../uploads/" + props.articleimg}
                        alt="..."
                        className="card-img-top"
                    />
                </div>
            </Link>
            <div className="card-body text-dark">
                <h4 className="card-title">{props.title}</h4>
                <p className="card-text text-secondary">{props.title}</p>
            </div>
        </div>
    );
};

export default Card;
