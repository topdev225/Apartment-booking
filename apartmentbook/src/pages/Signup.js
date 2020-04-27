import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AuthActions from '../actions/auth';

function Signup({
    postSignup,
    signupResponse
}) {
    const [name, setName] = useState("");
    const [selectRole, setSelectRole] = useState(1);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [errText, setErrText] = useState("");

    useEffect(()=> {
        setErrText(signupResponse && signupResponse.message)
    }, [signupResponse])
    const handleNameChange = (e) => {
        setErrText("");
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setErrText("");
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setErrText("");
        setPassword(e.target.value);
    }
    const handleRePasswordChange = (e) => {
        setErrText("");
        setRePassword(e.target.value);
    }
    const handleSelectRoleChange = (e) => {
        setErrText("");
        setSelectRole(parseInt(e.target.value));
    }
    const validateEmail = (email) => {
        // eslint-disable-next-line
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const signup = () => {
        if(email && name && password && repassword) {
            if(validateEmail(email)) {
                if(password !== repassword) {
                    setErrText("Password is not matched.")
                } else {
                    const payload = {
                        userName: name,
                        email: email,
                        password: password,
                        role: selectRole
                    };
                    postSignup(payload);
                }
            } else {
                setErrText("Email is not valid!")
            }
        } else {
            setErrText("All fields are required!")
        }
        
    }
    return(
        <div className="signup-page">
            <div className="form">
                <div className="register-form">
                    <input 
                        type="text" 
                        placeholder="name *"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <select 
                        value={selectRole}
                        onChange={handleSelectRoleChange}
                    >
                        <option value={1}>Realtor</option>
                        <option value={2}>User</option>
                    </select>
                    <input 
                        type="email" 
                        placeholder="email address *"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <input 
                        type="password" 
                        placeholder="password *"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <input 
                        type="password" 
                        placeholder="confirm password *"
                        value={repassword}
                        onChange={handleRePasswordChange}
                    />
                    <span className="error-message">{errText}</span>
                    <button
                        className="btn-primary Signup-btn"
                        onClick={signup}
                    >Signup</button>
                    <p>Do you have already an account? If yes, Login <Link to={"/"} >here</Link></p>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    signupResponse: state.auth.data
})

const mapDispatchToProps = dispatch => ({
    postSignup: payload => dispatch(AuthActions.signupRequest(payload))
})
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Signup));