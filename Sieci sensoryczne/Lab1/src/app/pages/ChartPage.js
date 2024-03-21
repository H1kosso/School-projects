import styles from "./pages.css";
import {getSingleParameterFromDevice} from "@/app/api/ApiManager";
import { useState } from "react";
import {MyChart} from "@/app/components/plot";


export default function ChartPage() {
    const [eui, setEui] = useState('2CF7F1C0443002D2');
    const [loading, setLoading] = useState(true);
    const [chartData, setChartData] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await getSingleParameterFromDevice(eui, 4097);
        console.log("response", response)
        const formattedChartData = generateChartData(response);
        setChartData(formattedChartData);
        setLoading(false);
    };

    function generateChartData(data) {
        const entries = data.data.list[1];
        console.log("entries", entries)
        console.log("entry", entries[0][40][0]) // trzeci parametr 0 - temp, 1 -data
        console.log(entries[0].length)
        const temps = [];
        const dates = [];



        for( let i = 0 ; i < entries[0].length ; i++){
            temps.push(entries[0][i][0]);
            dates.push(entries[0][i][1]);
        }

        console.log(dates)
        console.log(temps)

        const labels = dates.map(entry => new Date(entry).toLocaleTimeString());
        const temperatureData = temps.map(entry => parseFloat(entry));

        return {
            labels,
            datasets: [
                {
                    label: 'Temperature',
                    data: temperatureData,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                }
            ],
        };
    }



    return (
        <div>
            {chartData && !loading ? <MyChart chartData={chartData} /> : <span>brak danych</span>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="EUI"
                    className="textInput"
                    value={eui}
                    onChange={(e) => setEui(e.target.value)}
                />
                <button type="submit" className="submit">Fetch data</button>
            </form>
        </div>
    );
}
