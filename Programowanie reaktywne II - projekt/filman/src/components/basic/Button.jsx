const Button = (props) => {
    return(
        <button
            type="button"
            className={"btn btn-outline-danger"}
            onClick={props.onClick}
            >
            {props.title}
        </button>
)
}
export default Button;
