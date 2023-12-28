import axios from "axios";

const apiUrl = 'https://at.usermd.net/';

const getAllMovies = async () => {
    try {
        const response = await axios.get(`${apiUrl}api/movies`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}
const getMovieDetails = async (id) => {
    try {
        console.log(id)
        const response = await axios.get(`${apiUrl}api/movies/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export {getAllMovies, getMovieDetails}
