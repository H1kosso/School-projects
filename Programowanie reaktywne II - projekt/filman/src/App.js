import NavBar from "./components/common/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';
import Footer from "./components/common/Footer";
import Movies from "./components/Layouts/MoviesLayout/Movies";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./components/Layouts/LoginLayout/Login";
import Register from "./components/Layouts/LoginLayout/Register";

function App() {
    return (
        <>

            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Movies/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                    <Route
                        path="*"
                        element={
                            <Movies/>
                        }
                    />
                </Routes>
                <Footer/>
            </BrowserRouter>

        </>
    );
}

export default App;
