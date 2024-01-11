import {useEffect, useState} from "react";
import enterIcon from '../../assets/icons/enter.png'
import {useNavigate} from "react-router-dom";

const LoginButton = (props) => {
    let navigate = useNavigate()
    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        window.location.reload();

    }
    return (
        <div style={{display: "flex", alignItems: "center"}}
             className="btn btn-danger"
            onClick={handleLogout}>
            <span className="me-3">Wyloguj się</span>
            <img className="m-0" style={{width: "15px"}} src={enterIcon} alt='x'></img>
        </div>
    )
}

export default LoginButton;
