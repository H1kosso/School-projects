import placeholderPoster from  '../../assets/placeholderPoster.jpg'

const MovieCard = (props) => {

    return(
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={props.poster === undefined ? placeholderPoster : props.poster} alt="Plakat filmu"></img>
                <div className="card-body" style={{textAlign: "center"}}>
                    <h5 className="card-title">{props.title === undefined ? "Brak" : props.title}</h5>
                    <p className="card-text">{props.description === undefined ? "Brak" : props.description}</p>
                </div>
        </div>
    )

}
export default MovieCard;
