import {useEffect, useState} from "react";
import enterIcon from '../../assets/icons/enter.png'
import {useNavigate} from "react-router-dom";
import {getRandomMovie} from "../../api/ApiManager";

const RandomMovieButton = (props) => {
    let navigate = useNavigate()

    const handleRandom = async () => {
        const randomMovieId = await getRandomMovie();
        console.log(randomMovieId);
        navigate(`/details/${randomMovieId}`);
    }

    return (
        <div style={{display: "flex", alignItems: "center"}}
             className="btn btn-danger"
             onClick={handleRandom}>
            <span>Zaskocz mnie</span>
        </div>
    )
}
export default RandomMovieButton;
