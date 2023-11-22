import React from "react";
import {Link} from "react-router-dom";
import Button from "../basic/Button";
import Login from "./Login";


const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-light p-1 m-2">
            <div className="container-fluid flex-row justify-content-between">
                <a className="navbar-brand" href="#">Filman</a>
                <form className="d-flex w-50" role="search">
                    <input className="form-control rounded-pill me-3" type="search" placeholder="Podaj nazwę filmu lub gatunek..."
                           aria-label="Search"/>
                    <Button className="btn btn-outline-secondary" type="submit"
                            title={"Szukaj"}/>
                </form>
                <Button className="btn btn-danger"   title={<Login/>}/>

            </div>
        </nav>
    );
};

export default NavBar;
