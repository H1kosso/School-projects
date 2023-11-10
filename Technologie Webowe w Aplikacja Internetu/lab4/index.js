const express = require('express');
const config = require('./config');
const app = express();
const charts = require('./charts');

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

let products = [];

app.use(express.json());

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html',
        {subject: 'TWwAI',
         chart1: charts.chart1,
         chart2: charts.chart2,
         products: products})
});

app.post('/products', (request, response) =>{
    console.log(request.body.products);
    products = request.body.products;
    response.status(200).json({message: "Dane pobrane"});

})

app.listen(config.port, function () {
    console.info(`Server is running at port 3000`);
});




