import React, { Component } from "react";

// router-dom
import { Link, Redirect } from "react-router-dom";

// css
// import "./SignUp.css";

// axios
import axios from "axios";

// 유효성 정규식
const regId = /^[a-z0-9]{4,12}$/;
const regName = /^[가-힣A-Za-z0-9]{2,12}$/;

// 유효성 검사
// 에러가 있으면 발생
const formValid = (isError) => {
    let isValid = true;
    Object.values(isError).forEach(
        (val) => val.length > 0 && (isValid = false)
    );
    return isValid;
};
// 빈칸이 있으면 발생
const blankValid = ({ isError, ...rest }) => {
    let isValid = true;
    Object.values(rest).forEach((val) => val === "" && (isValid = false));
    return isValid;
};

class Signup extends Component {
    state = {
        name: "",
        email: "",
        userid: "",
        password: "",
        password2: "",

        // formValid: false,
        // errorCount: null,
        isError: {
            name: "",
            email: "",
            userid: "",
            password: "",
            password2: "",
        },
    };

    onSubmit = (e) => {
        e.preventDefault();
    };

    formValChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };

        switch (name) {
            case "name":
                isError.name = regName.test(value)
                    ? ""
                    : "이름은 2~12자의 한글, 영문, 숫자 조합입니다.";
                break;
            case "userid":
                // isError.id = value.length < 4 ? '아이디는 4자 이상 입력해주세요.' : '';
                isError.userid = regId.test(value)
                    ? ""
                    : "아이디는 4~12자의 영문과 숫자로만 입력 가능합니다.";
                break;
            case "password":
                isError.password =
                    value.length < 8 ? "비밀번호는 8자 이상이어야 합니다." : "";
                if (value.length >= 8) {
                    this.setState({ password: value });
                    //   console.log(this.state.password);
                }
                isError.password2 =
                    value !== this.state.password2
                        ? "비밀번호가 일치하지 않습니다."
                        : "";
                break;
            case "password2":
                isError.password2 =
                    value !== this.state.password
                        ? "비밀번호가 일치하지 않습니다."
                        : "";
                // if (value === this.state.password) {
                this.setState({ password2: value });
                // }
                break;
            default:
                break;
        }

        this.setState({
            isError,
            [name]: value,
        });
    };

    goBack = () => {
        this.props.history.goBack();
    };

    render() {
        const { isError } = this.state;

        return (
            <div className="regibox my-5">
                {/* <div className="d-flex justify-content-center">
          <h3>회원가입 화면입니다.</h3>
        </div> */}
                <form onSubmit={this.onSubmit} noValidate>
                    <div className="form-group">
                        <label>아이디</label>
                        <input
                            type="text"
                            className={
                                isError.userid.length > 0
                                    ? "is-invalid form-control"
                                    : "form-control"
                            }
                            name="userid"
                            onChange={this.formValChange}
                        />
                        {isError.userid.length > 0 && (
                            <span className="invalid-feedback">
                                {isError.userid}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            className={
                                isError.password.length > 0
                                    ? "is-invalid form-control"
                                    : "form-control"
                            }
                            name="password"
                            onChange={this.formValChange}
                        />
                        {isError.password.length > 0 && (
                            <span className="invalid-feedback">
                                {isError.password}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>비밀번호 확인</label>
                        <input
                            type="password"
                            className={
                                isError.password2.length > 0
                                    ? "is-invalid form-control"
                                    : "form-control"
                            }
                            name="password2"
                            onChange={this.formValChange}
                        />
                        {isError.password2.length > 0 && (
                            <span className="invalid-feedback">
                                {isError.password2}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>이름</label>
                        <input
                            type="text"
                            className={
                                isError.name.length > 0
                                    ? "is-invalid form-control"
                                    : "form-control"
                            }
                            name="name"
                            onChange={this.formValChange}
                        />
                        {isError.name.length > 0 && (
                            <span className="invalid-feedback">
                                {isError.name}
                            </span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="create-btn"
                        onClick={(e) => {
                            this.onSubmit(e);
                        }}
                    >
                        작성 완료
                    </button>
                    <Link
                        to="/Login"
                        style={{
                            textDecoration: "none",
                            color: "white",
                            width: "100%",
                        }}
                    >
                        <button
                            className="regiback-btn"
                            onClick={(e) => {
                                this.goBack();
                            }}
                        >
                            뒤로
                        </button>
                    </Link>
                </form>
            </div>
        );
    }
}

export default Signup;
