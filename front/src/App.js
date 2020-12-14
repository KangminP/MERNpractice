import React, { Component } from "react";

// css
import "./App.css";

// router-dom
import { Route } from "react-router-dom";

// component
import Navbar from "./subcomp/navbar/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateArticle from "./components/CreateArticle";

class App extends Component {
    render() {
        return (
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Home}></Route>
                <Route path="/About" component={About}></Route>
                <Route path="/Login" component={Login}></Route>
                <Route path="/Signup" component={Signup}></Route>
                <Route path="/CreateArticle" component={CreateArticle}></Route>
            </div>
        );
    }
}

export default App;
