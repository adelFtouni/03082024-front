import React, { useEffect, useState } from "react";
import SignUp from "./Signup.module.css";
import { Link, useNavigate } from "react-router-dom";

import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from "../../../redux/actions/auth";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../assets/css/app.scss';

const InitState = {
    firstName: "",
    lastName: "",
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user' // Default role is set to 'user'
};


function Signup() {

    
useEffect(() => {
    document.querySelector('.btn-cart').classList.add('hidden');
    return () => {
        document.querySelector('.btn-cart').classList.remove('hidden');
    };
}, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [sForm, setsForm] = useState(InitState);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        // For checkbox input, update the role based on the checked state
        const updatedValue = type === 'checkbox' ? (checked ? 'admin' : 'user') : value;
        setsForm({
            ...sForm,
            [name]: updatedValue
        });
    };

    function handleGoogleLoginSuccess(tokenResponse) {
        const accessToken = tokenResponse.access_token;
        dispatch(signupGoogle(accessToken, navigate));
    }

    function handleOnSubmit(e) {
        e.preventDefault();
        
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.password !== "" && sForm.confirmPassword !== "" && sForm.email !== "" && sForm.phoneNumber !== null
            && sForm.password === sForm.confirmPassword && sForm.password.length >= 4) {
            dispatch(signup(sForm, navigate));
        }
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    return (
        <div className={SignUp.loginContainer}>
            <div className={SignUp.loginContainerv2}>
                <h1>Create your account</h1>

                <div className={SignUp.inputContainer}>
                    <label>FRIST NAME</label>
                    <input className="form-control" onChange={handleChange} name="firstName" placeholder="enter your first name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>LAST NAME</label>
                    <input className="form-control" name="lastName" onChange={handleChange} placeholder="enter your last name" type="text"/>
                </div>
                <div className={SignUp.inputContainer}>
                    <label>EMAIL</label>
                    <input className="form-control" name="email" onChange={handleChange} placeholder="enter your email" type="email"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>PASSWORD</label>
                    <input className="form-control" name="password" onChange={handleChange} placeholder="enter your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>CONFIRM PASSWORD</label>
                    <input className="form-control" name="confirmPassword" onChange={handleChange} placeholder="retype your password" type="password"/>
                </div>

                <div className={SignUp.inputContainer}>
                    <label>phone Number</label>
                    <input className="form-control" name="phoneNumber" onChange={handleChange} placeholder="enter you phone number" type="number"/>
                </div>

                <div style={{display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem"}} className={SignUp.inputContainer}>
                    <input id="checkRole"
                      className="form-check-input"
                        name="role"
                        type="checkbox"
                        onChange={handleChange}
                    />    
                    <label for="checkRole" className="form-check-label m-0">Role</label>
                </div>

                <button onClick={handleOnSubmit} className={SignUp.loginBTN}>REGISTER</button>
                <span className={SignUp.or}>or</span>
                <button  onClick={() => login()}  className={SignUp.googleBTN}>
                    <i className="fa-brands fa-google"></i>  Sign up with Google</button>
                <div className={SignUp.footerContainer}>
                    <div>
                        Already Signed Up? <Link to="/account/login">Login</Link>
                    </div>
                </div>
            </div>
           {/*<button onClick={() => console.log(sForm)}>Log Form</button>*/}
        </div>
    );
}

export default Signup;
