import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import placeHolderPoster from '../../../assets/placeholderPoster.jpg';

const MovieDetails = (props) => {
    const imageStyle = {
        width: '500px',
        height: '800px',
        objectFit: 'cover', // This property ensures that the image maintains its aspect ratio while filling the specified size
        margin: '50px'
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={placeHolderPoster} alt="Obraz" className="img-fluid" style={imageStyle} />
                </div>
                <div className="col-md-6">
                    <h1 style={{marginTop: "50px"}}>The Dark Knight</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus hic illo maxime necessitatibus neque
                        numquam sed temporibus tenetur voluptatem voluptates. Cum earum itaque modi voluptates voluptatibus!
                        Doloribus repudiandae sed voluptatem!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
