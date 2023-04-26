import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import Counter from "./components/counter";
import reportWebVitals from "./reportWebVitals";


    ReactDOM.render(
        <React.StrictMode>
            <Counter/>
        </React.StrictMode>,
        document.getElementById('root')
    );

reportWebVitals();