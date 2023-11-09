function postOfId(questions, id){
    if(id > questions.length){
        return "Question of chosen id does not exist"
    }
    return questions[id]
}

function addQuestion(questions, newQuestion) {
    const { category, type, difficulty, question, correct_answer, answers } = newQuestion;

    questions.push({
        category,
        type,
        difficulty,
        question,
        correct_answer,
        answers
    });
}

module.exports = {
    postOfId,
    addQuestion
}
