const express = require('express');
const config = require('./config');
const path = require('path');
const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);



app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (request, response) => {
    response.render(__dirname + '/index.html',
        {subject: 'TWwA I'})
});

app.get('/template/:variant/:a/:b', (request, response) => {

    let variant = request.params.variant;
    const a = parseFloat(request.params.a);
    const b = parseFloat(request.params.b);

    if (isNaN(a) || isNaN(b)) {
        return response.status(400).json({ error: 'Podane wartości nie są liczbami' });
    }


    let result;
    switch (variant) {
        case 'sum':
            result = a + b;
            variant = '+';
            break;
        case 'sub':
            result = a - b;
            variant = '-';
            break;
        case 'mul':
            result = a * b;
            variant = '*';
            break;
        case 'div':
            if (b === 0) {
                return response.status(400).json({ error: 'Nie można dzielić przez zero' });
            }
            result = a / b;
            variant = '/';
            break;
        default:
            return response.status(400).json({ error: 'Nieprawidłowy wariant. Dozwolone wartości: sum, sub, mul, div' });
    }



    response.render(__dirname + '/result.html',
        {a: a, b: b, variant: variant, result: result})
})


app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
});



