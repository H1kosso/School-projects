import ExampleMovies from "./ExampleMovies";
import MovieCard from "./MovieCard";

const Movies = (props) => {
    return(
        <div>
            <div className="d-flex flex-row flex-wrap justify-content-center" >
                {ExampleMovies.map((movie) => <MovieCard  title={movie.title} description={movie.desc} />)}
            </div>
        </div>
    )
}

export default  Movies;
