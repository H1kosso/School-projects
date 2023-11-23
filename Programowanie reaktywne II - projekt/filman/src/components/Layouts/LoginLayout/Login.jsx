import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../../styles/Login.css'
import LoginButton from "../../common/LoginButton";

const Login = () => {
    let navigate = useNavigate()

    const [account, setAccount] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});


    const validate = () => {
        const validationErrors = {};

        if (account.username.trim() === '') {
            validationErrors.username = 'Username is required!';
        }
        if (account.password.trim() === '') {
            validationErrors.password = 'Password is required!';
        }

        return Object.keys(validationErrors).length === 0 ? null : validationErrors;
    };

    const handleChangeRoute = () => {
        navigate('/');
        window.location.reload()
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;

        axios
            .post('http://localhost:3001/api/user/auth', {
                login: account.username,
                password: account.password
            })
            .then((response) => {
                localStorage.setItem('token', response.data.token);
                handleChangeRoute();
            })
            .catch((error) => {
                const errorMessages = {};
                errorMessages.password =
                    "Given username doesn't exist or the password is wrong!";
                setErrors(errorMessages || {});
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    return (
        <div className="loginContainer">
            <h1>Logowanie</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nazwa użytkownika: </label>
                    <input
                        value={account.username}
                        name="username"
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        id="username"
                        aria-describedby="emailHelp"
                        placeholder="Nazwa użytkownika"
                    />
                    {errors.username && (
                        <div className="alert alert-danger">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Hasło: </label>
                    <input
                        value={account.password}
                        name="password"
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="hasło"
                    />
                    {errors.password && (
                        <div className="alert alert-danger">{errors.password}</div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary" style={{marginTop:"20px"}}>
                    Zaloguj
                </button>
                <Link className="btn btn-danger" to="/register" role="button">Zarejestruj się</Link>
            </form>
        </div>
    );
};

export default Login;
