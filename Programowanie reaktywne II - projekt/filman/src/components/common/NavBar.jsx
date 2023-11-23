import React from "react";
import {Link} from "react-router-dom";
import Button from "../basic/Button";
import LoginButton from "./LoginButton";


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light p-1 m-2">
            <div className="container-fluid flex-row justify-content-between">
                <Link className="navbar-brand" to="/" role="button">Filman</Link>
                <form className="d-flex w-50" role="search">
                    <input className="form-control rounded-pill me-3" type="search" placeholder="Podaj nazwę filmu lub gatunek..."
                           aria-label="Search"/>

                    <Button className="btn btn-outline-secondary" type="submit"
                            title={"Szukaj"}/>
                </form>
                <Link className="btn btn-danger" to="/login" role="button"><LoginButton/></Link>
            </div>
        </nav>
    );
};

export default NavBar;