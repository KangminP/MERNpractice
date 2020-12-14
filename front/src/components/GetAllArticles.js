import React, { Component } from "react";

// axios
import axios from "axios";

// component
import Card from "../subcomp/card/Card";

class GetAllArticles extends Component {
    state = {
        loading: false,
        articleList: [{ title: "", content: "", articleimg: "" }],
    };

    componentDidMount() {
        this.getArticles();
    }

    getArticles = async () => {
        axios
            .get("http://localhost:5000/api/article")
            .then(({ data }) => {
                this.setState({
                    loading: true,
                    articleList: data,
                });
                // console.log(this.state.articleList);
            })
            .catch((e) => {
                console.error(e);
                this.setState({
                    loading: false,
                });
            });
    };

    render() {
        const articles = this.state.articleList.map((article, index) => {
            return (
                <div
                    key={index}
                    className="card-col col-lg-3 col-md-4 col-sm-6 col-xs-12 px-3"
                >
                    <Card
                        articleimg={article.articleimg}
                        title={article.title}
                        content={article.content}
                    />
                </div>
            );
        });

        return (
            // <div className="row">{articles}</div>
            <div className="container-fluid d-flex justify-content-center">
                <div className="row p-0">{articles}</div>
            </div>
        );
    }
}

export default GetAllArticles;
