import NavBar from "./components/common/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';
import Footer from "./components/common/Footer";
import Movies from "./components/Layouts/MoviesLayout/Movies";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Layouts/LoginLayout/Login";
import Register from "./components/Layouts/LoginLayout/Register";
import MovieDetails from "./components/Layouts/DetailsLayout/MovieDetails";
import AddMovie from "./components/Layouts/AddLayout/AddMovie";
import {isExpired} from "react-jwt";

function App() {


    return (
        <>
            <div style={{backgroundColor: "bisque"}}>
                <BrowserRouter>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Movies/>}/>
                        <Route path="login" element={<Login/>}/>
                        <Route path="register" element={<Register/>}/>
                        <Route path="details/:id" element={<MovieDetails/>}/>
                        <Route path="add"
                               element={isExpired(localStorage.getItem('token')) ? <Navigate replace to="/"/> : <AddMovie/>}/>

                        <Route
                            path="*"
                            element={
                                <Movies/>
                            }
                        />
                    </Routes>
                    <Footer/>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
