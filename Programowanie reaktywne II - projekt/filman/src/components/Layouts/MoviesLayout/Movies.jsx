import ExampleMovies from "./ExampleMovies";
import MovieCard from "./MovieCard";
import { getAllMovies } from "../../../api/ApiManager";
import { useEffect, useState } from "react";

const Movies = (props) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllMovies();
                if (data) {
                    setMovies(data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData().then();
    }, []);

    return (
        <div>
            <div className="d-flex flex-row flex-wrap justify-content-center">
                {movies.map((movie) => (
                    <MovieCard id={movie.id} title={movie.title} description={movie.content} poster={movie.image}/>
                ))}
            </div>
        </div>
    );
};

export default Movies;
