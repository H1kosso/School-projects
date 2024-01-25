import {Link, useNavigate} from "react-router-dom";
import Button from "../../basic/Button";
import React, {useEffect, useState} from "react";
import {addMovie} from "../../../api/ApiManager"

const AddMovie = (props) => {
    const [title, setTitle] = useState("")
    const [poster, setPoster] = useState("")
    const [content, setContent] = useState("")
    const navigate = useNavigate()
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handlePosterChange = (e) => {
        setPoster(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };
    const handleSubmit = () => {
       addMovie(title, poster, content).then( () => {
           navigate('/');
           window.location.reload();
       });
    };

    return(
        <div className="loginContainer">
        <div className="container">
            <form>
                <div className="form-group">
                    <label htmlFor="title">Tytuł</label>
                    <input type="text"
                           className="form-control"
                           id="title"
                           value={title}
                           onChange={handleTitleChange}
                           placeholder="Tytuł"/>
                </div>
                <div className="form-group">
                    <label htmlFor="poster">Plakat</label>
                    <input type="text"
                           className="form-control"
                           id="poster"
                           value={poster}
                           onChange={handlePosterChange}
                           placeholder="Link do plakatu"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Opis</label>
                    <textarea className={"form-control"}
                              placeholder={"Opis"}
                              value={content}
                              onChange={handleContentChange}
                              id="description"
                              style={{height: 450}}
                    ></textarea>
                </div>

                <div style={{textAlign: "center", display: "flex", justifyContent: "space-evenly", marginTop: "30px"}}>
                    <button type="button" className="btn btn-danger" onClick={handleSubmit}
                            style={{width: "25%"}}>Dodaj
                    </button>
                    <button type="reset" className="btn btn-danger" style={{width: "25%"}}>Wyczyść</button>
                </div>
            </form>

        </div>
        </div>
    )
}

export default AddMovie;
