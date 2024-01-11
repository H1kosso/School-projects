import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Button from "../basic/Button";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light p-1 m-2">
            <div className="container-fluid d-flex justify-content-between align-items-center">
                <Link className="navbar-brand" to="/" role="button">
                    Filman
                </Link>
                <form className="d-flex w-50" role="search">
                    <input
                        className="form-control rounded-pill me-3"
                        type="search"
                        placeholder="Podaj nazwę filmu lub gatunek..."
                        aria-label="Search"
                    />
                    <Button
                        className="btn btn-outline-secondary"
                        type="submit"
                        title={"Szukaj"}

                    />
                </form>

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
