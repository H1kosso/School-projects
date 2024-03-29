import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeholderPoster from '../../../assets/placeholderPoster.jpg';
import {deleteMovie, getMovieDetails} from '../../../api/ApiManager';
import {useNavigate} from "react-router-dom";
import {isExpired} from "react-jwt";

const MovieDetails = (props) => {
    const [movie, setMovie] = useState({});
    const currentUrl = window.location.href;
    const [Id, setId] = useState("")
    let navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const movieId = getMovieIdFromUrl(currentUrl);
                setId(movieId);
                const data = await getMovieDetails(movieId);
                if (data) {
                    setMovie(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then();
    }, [currentUrl]);

    const handleDelete = () => {
        console.log(Id)
        deleteMovie(Id).then( () =>  {
            navigate('/');
            window.location.reload()
        });
    }

    const getMovieIdFromUrl = (url) => {
        const lastSlashIndex = url.lastIndexOf('/');
        return url.substring(lastSlashIndex + 1);
    };

    const imageStyle = {
        width: '500px',
        height: '800px',
        objectFit: 'cover',
        margin: '50px',
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img
                        src={movie.image === undefined ? placeholderPoster : movie.image}
                        alt="Obraz"
                        className="img-fluid"
                        style={imageStyle}
                    />

                </div>
                <div className="col-md-6">
                    <h1 style={{marginTop: '50px'}}>
                        {movie.title === undefined ? 'Brak' : movie.title}
                    </h1>
                    <p>{movie.content === undefined ? currentUrl : movie.content}</p>
                    <div className="d-flex justify-content-center">
                        {isExpired(localStorage.getItem('token')) ? <span></span> :
                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                Usuń ten film
                            </button>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
