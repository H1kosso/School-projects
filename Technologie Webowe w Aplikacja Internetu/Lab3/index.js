const express = require('express');
let questions = require('./questions').preQuestions;
const config = require('./config');
const service = require('./service');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/api/questions', (request, response) => {
    response.send(questions);
});

app.get('/api/questions/:id', (request, response) => {
    const questionId = request.params.id
    response.send(service.postOfId(questions,questionId));
});

app.post('/api/addQuestion/', (request, response) => {
    const newQuestion = request.query;
    service.addQuestion(questions, newQuestion)
    response.status(200).json({message: "Pytanie zostalo dodane"});
})

app.listen(config.port, function () {
    console.info(`Server is running at port ${config.port}`);
});
