import placeholderPoster from '../../../assets/placeholderPoster.jpg'
import {Link} from "react-router-dom";
import React from "react";

const MovieCard = (props) => {
    const MAX_DESCRIPTION_LENGTH = 150;

    const trimDescription = (description) => {
        if (description.length > MAX_DESCRIPTION_LENGTH) {
            return description.substring(0, MAX_DESCRIPTION_LENGTH) + '...';
        }
        return description;
    };

    return (
        <div className="card" style={{width: "18rem", margin: "5px"}}>
            <Link to={`/details/${props.id}`} role="button" id={props.id}>
                <img className="card-img-top" src={props.poster === undefined ? placeholderPoster : props.poster}
                     style={{width: '100%', height: '400px', objectFit: 'cover'}} alt="Plakat filmu"></img>
            </Link>
            <div className="card-body" style={{textAlign: "center"}}>
                <h5 className="card-title">{props.title === undefined ? "Brak" : props.title}</h5>
                <p className="card-text">
                    {props.description === undefined ? "Brak" : trimDescription(props.description)}
                </p>
            </div>
        </div>
    )
};

export default MovieCard;
