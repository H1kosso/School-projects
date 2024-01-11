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

const addMovie = async (title, image, content) => {
    try {
        const response = await axios.post(`${apiUrl}api/movies`, {
            title: title,
            image: image,
            content: content,
        });

        console.log('Dodano film:', response.data);
    } catch (error) {
        console.error('Błąd podczas dodawania filmu:', error.message);
    }
};

const deleteMovie = async (id) => {
    try {
        const token = localStorage.getItem('token');
        console.log(token)
        const response = await axios.delete(`${apiUrl}api/movie/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });
        console.log('Usunięto film:', response.data);
    } catch (error) {
        console.error('Błąd podczas usuwania filmu:', error.message);
    }
};

const createUser = async (name, email, password) => {
    try {
        const response = await axios.post(`${apiUrl}api/user/create`, {
            name: name,
            email: email,
            password: password,
        });
        console.log('Utworzono użytkownika :', response.data);
        return response.data;

    } catch (error) {
        console.error('Błąd podczas dodawania użytkownika:', error.message);
    }
};

const authUser = async (name, password) => {
    try {
        const response = await axios.post(`${apiUrl}api/user/auth`, {
            login: name,
            password: password,
        });

        console.log('Zweryfikowano użytkownika :', response.data);
        return response.data;
    } catch (error) {
        console.error('Błąd podczas weryfikacji użytkownika:', error.message);
        return null;
    }
};
export {getAllMovies, getMovieDetails, addMovie, deleteMovie, createUser, authUser}
