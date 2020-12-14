import React, { Component } from "react";

// router-dom
import { Link } from "react-router-dom";

// css
import "./Home.css";
import MainImg from "../assets/images/mainheader.jpg";
import MainImgSm from "../assets/images/mainheadersm.png";

// component
import GetAllArticles from "./GetAllArticles";

class Home extends Component {
    render() {
        return (
            <div className="homelayout">
                <div className="header-container">
                    <div className="header-image">
                        <img src={MainImg} alt="..." className="main-image" />
                        <img
                            src={MainImgSm}
                            alt="..."
                            className="main-image-sm"
                        />
                    </div>
                    <div className="header-search-create">
                        <div>
                            <Link to="/CreateArticle">
                                <button>작성</button>
                            </Link>
                        </div>
                        <div>
                            <input type="text" />
                            <button>검색</button>
                        </div>
                    </div>
                </div>
                <div className="articles-container">
                    <GetAllArticles />
                </div>
            </div>
        );
    }
}

export default Home;
