import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../basic/Button";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import RandomMovieButton from "./RandomMovieButton";

const NavBar = () => {
    return (
        <nav className="  bg-light" >
            <div className="container-fluid d-flex justify-content-between align-items-center" style={{backgroundColor: "lightblue", padding: 10}}>
                <Link className="navbar-brand" to="/" role="button" style={{fontSize: 30}}>
                    Filman
                </Link>

                    <RandomMovieButton/>


                <div className="d-flex">
                    {localStorage.getItem('token') !== null ?
                        <Link
                        className="btn btn-danger me-2"
                        to="/add"
                        role="button">
                        Dodaj nowy film
                    </Link>
                    :
                        <span></span>
                    }

                    { localStorage.getItem('token') === null ? (
                        <Link
                            className="btn btn-danger"
                            to="/login"
                            role="button">
                            <LoginButton/>
                        </Link>
                    ) : (
                            <LogoutButton/>
                    )}


                </div>
            </div>
        </nav>
    );
};

export default NavBar;
