import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import '../../../styles/Login.css'
import LoginButton from "../../common/LoginButton";
import '../../../api/ApiManager'
import {createUser} from "../../../api/ApiManager";

const Register = () => {
    let navigate = useNavigate()

    const [account, setAccount] = useState({
        username: '',
        password: '',
        email: ''
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
        if (account.email.trim() === '') {
            validationErrors.password = 'Email is required!';
        }

        return Object.keys(validationErrors).length === 0 ? null : validationErrors;
    };

    const handleChangeRoute = () => {
        navigate('/login');
        window.location.reload()
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate();
        setErrors(validationErrors || {});
        if (validationErrors) return;

        createUser(account.username, account.email, account.password)
            .then((response) => {
                handleChangeRoute();
            })
            .catch((error) => {
                const errorMessages = {};
                errorMessages.password =
                    "Błąd podczas tworzenia użytkownika";
                setErrors(errorMessages || {});
                console.log(error);
            });
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value
        }));
    };

    return (
        <div>
        <div className="loginContainer">
            <h1>Rejestracja</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Email: </label>
                    <input
                        value={account.email}
                        name="email"
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div className="alert alert-danger">{errors.email}</div>
                    )}
                </div>
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
                        placeholder="Hasło"
                    />
                    {errors.password && (
                        <div className="alert alert-danger">{errors.password}</div>
                    )}
                </div>
                <div style={{textAlign: "center", display: "flex", justifyContent: "space-evenly", marginTop: "30px"}}>
                    <button type="submit" className="btn btn-danger" style={{width: "25%"}}>Zarejestruj</button>
                    <Link className="btn btn-danger" style={{width: "25%"}} to="/login" role="button">Zaloguj się</Link>
                </div>
            </form>

        </div>
    <div style={{height: '40vh', display: "block"}}></div>
    </div>
    );
};

export default Register;
