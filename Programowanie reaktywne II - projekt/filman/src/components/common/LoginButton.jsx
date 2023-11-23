import {useState} from "react";
import enterIcon from  '../../assets/icons/enter.png'
const LoginButton = (props) => {
    const [logged, setLogged] = useState(props.logged);

    return(
        <div style={{ display: "flex", alignItems: "center" }}>
            <img className="m-0" style={{width: "15px" }} src={enterIcon}></img>
            <span className="me-3">Marcin</span>
        </div>
    )
}

export default LoginButton;
