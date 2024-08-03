import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginStyles from "./index.css";
import { useDispatch } from 'react-redux';
import { signin } from "../../../redux/actions/auth";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role,setRole] = useState('superAmin');
    const navigate = useNavigate();
    const dispatch = useDispatch();
useEffect(()=>{
    setRole('superAdmin');
},[])
    function handleSubmit(e) {
        e.preventDefault();
        if (email !== "" && password !== "") {
            dispatch(signin({ email, password }, navigate));
        }
    }

    return (
        <div className={LoginStyles.loginContainer}>
            <div className={LoginStyles.loginContainerv2}>
                <h1>Welcome back</h1>

                <div className={LoginStyles.inputContainer}>
                    <label>EMAIL</label>
                    <input onChange={e => setEmail(e.target.value)} placeholder="enter your email" type="email" />
                </div>

                <div className={LoginStyles.inputContainer}>
                    <label>PASSWORD</label>
                    <input onChange={e => setPassword(e.target.value)} placeholder="enter your password" type="password" />
                </div>

                <div className={LoginStyles.forgetmeContainer}>
                    <div>
                        Remember Me <input type="checkbox" />
                    </div>
                    <div>
                        <Link to="/admin/forgotpassword">Forgot password?</Link>
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn btn-primary mt-5">LOGIN</button>
            </div>
        </div>
    );
}

export default AdminLogin;
