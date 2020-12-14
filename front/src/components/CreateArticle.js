import React, { Component } from "react";

// axios
import axios from "axios";

class CreateArticle extends Component {
    state = {
        title: "",
        content: "",
        filename: "",
        submitted: false,
    };
    // const [title, setTitle] = useState("");
    // const [content, setContent] = useState("");
    // const [message, setMessage] = useState("");
    // const [filename, setFilename] = useState("");

    onChangeTitle = (e) => {
        this.setState({ title: e.target.value });
    };

    onChangeContent = (e) => {
        this.setState({ content: e.target.value });
    };

    onChangeFile = (e) => {
        this.setState({ filename: e.target.files[0] });
    };
    // const onChangeFile = (e) => {
    //     setFilename(e.target.files[0]);
    // };

    changeOnClick = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("content", this.state.content);
        formData.append("articleimg", this.state.filename);

        axios
            .post("http://localhost:5000/api/article/create", formData)
            .then((res) => this.setState({ submitted: true }))
            .catch((err) => console.log(err));
    };
    // const changeOnClick = (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("title", title);
    //     formData.append("content", content);
    //     formData.append("articleimg", filename);

    //     setTitle("");
    //     setContent("");

    //     axios
    //         .post("http://localhost:5000/api/article/create", formData)
    //         .then((res) => setMessage(res.data))
    //         .catch((err) => console.log(err));
    // };

    componentDidMount() {
        this.newArticle();
    }

    newArticle = () => {
        this.setState({
            title: "",
            content: "",
            filename: "",
            submitted: false,
        });
    };

    render() {
        return (
            <div className="container">
                <h1>Create Article</h1>
                {this.state.submitted === true ? (
                    <>
                        {/* <span className="message">{message}</span> */}
                        <button
                            className="btn btn-success"
                            onClick={this.newArticle}
                        >
                            Creat Article
                        </button>
                    </>
                ) : (
                    <>
                        <form
                            onSubmit={this.changeOnClick}
                            encType="multipart/form-data"
                        >
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    // value={title}
                                    onChange={(e) => {
                                        this.onChangeTitle(e);
                                    }}
                                    // onChange={(e) => setTitle(e.target.value)}
                                    className="form-control"
                                    placeholder="Title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <textarea
                                    // value={content}
                                    onChange={(e) => {
                                        this.onChangeContent(e);
                                    }}
                                    // onChange={(e) => setContent(e.target.value)}
                                    className="form-control"
                                    rows="3"
                                    placeholder="Content"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="file">Choose Thumnail</label>
                                <input
                                    type="file"
                                    filename="articleimg"
                                    className="form-control-file"
                                    onChange={(e) => {
                                        this.onChangeFile(e);
                                    }}
                                    // onChange={onChangeFile}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </form>
                    </>
                )}
            </div>
        );
    }
}

export default CreateArticle;
