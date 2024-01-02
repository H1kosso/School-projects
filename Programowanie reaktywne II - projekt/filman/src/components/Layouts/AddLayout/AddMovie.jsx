import {Link} from "react-router-dom";
import Button from "../../basic/Button";
import React, {useEffect, useState} from "react";
import {addMovie} from "../../../api/ApiManager"

const AddMovie = (props) => {
    const [title, setTitle] = useState("")
    const [poster, setPoster] = useState("")
    const [content, setContent] = useState("")

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
       addMovie(title, poster, content).then();
    };

    return(
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
                    ></textarea>
                </div>


                    <button type="button" className="btn btn-danger" onClick={handleSubmit}>Dodaj</button>
                    <button type="reset" className="btn btn-danger">Wyczyść</button>

            </form>
        </div>
    )
}

export default  AddMovie;
