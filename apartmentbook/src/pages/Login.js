import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthActions from '../actions/auth';

function Login({
    postSignin,
    signinResponse
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errText, setErrText] = useState("");

    useEffect(() => {
        setErrText(signinResponse && signinResponse.message);
    }, [signinResponse])
    const handleEmailChange = (e) => {
        setErrText("");
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setErrText("");
        setPassword(e.target.value);
    }
    const validateEmail = (email) => {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const login = () => {
        if (email && password) {
            if (validateEmail(email)) {
                const payload = {
                    email: email,
                    password: password
                };
                postSignin(payload);
            } else {
                setErrText("Email is not valid!")
            }
        } else {
            setErrText("All fields are required!")
        }
    }

    return (
        <div className="login-page">
            <div className="form">
                <div className="login-form">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span className="error-message">{errText}</span>
                    <button
                        className="btn-primary login-btn"
                        onClick={login}
                    >Login</button>
                    <p>Don't you have an account yet? If yes, click <Link to={"/signup"} >here</Link></p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    signinResponse: state.auth.data
})

const mapDispatchToProps = dispatch => ({
    postSignin: payload => dispatch(AuthActions.signinRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);