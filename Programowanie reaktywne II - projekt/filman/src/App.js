import NavBar from "./components/common/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/App.css';
import Footer from "./components/common/Footer";
import Movies from "./components/MoviesLayout/Movies";

function App() {
    return (
        <>
            <NavBar/>
            <Movies/>
            <Footer/>
        </>
    );
}

export default App;
