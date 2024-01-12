import React, {useEffect, useState} from 'react';
import {Line} from "react-chartjs-2";
import {options} from "./Charts";

const LastData: React.FC = () => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3100/api/data/last');
                const result = await response.json();

                console.log(result)
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Błąd podczas pobierania danych:', error);
                setLoading(false);
            }
        };



        fetchData();
    }, []);
    return(
        <div>
            {data && !loading ? (
                <table>
                    <tr>
                        <td>Temperatura</td>
                        <td>{data.temperature}</td>
                    </tr>
                    <tr>
                        <td>Ciśnienie</td>
                        <td>{data.pressure}</td>
                    </tr>
                    <tr>
                        <td>Wilgotność</td>
                        <td>{data.humidity}</td>
                    </tr>
                    <tr>
                        <td>Data</td>
                        <td>{data.date}</td>
                    </tr>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
export default LastData;