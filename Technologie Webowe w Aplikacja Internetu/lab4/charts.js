const service = require('./service')

const chart1 = JSON.stringify(
    {"type":"line","data":{"labels":["January","February","March","April","May","June"],"datasets":[{"label":"My First dataset",
                "backgroundColor":"rgb(255, 99, 132)","borderColor":"rgb(255, 99, 132)","data":[0,10,5,2,20,30,45]}]},
        "options":{}});

const temp = `Czas,Temperatura
2023-11-09 10:00:00,10
2023-11-09 11:00:00,13
2023-11-09 12:00:00,16
2023-11-09 13:00:00,18
2023-11-09 14:00:00,19
2023-11-09 15:00:00,19
2023-11-09 16:00:00,17`;

const dataChart2 = service.convertData(temp);
const chart2 = JSON.stringify(dataChart2);

module.exports = {
    chart1,
    chart2
}