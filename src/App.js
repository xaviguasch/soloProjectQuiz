import React, { Component } from 'react';
import quizQuestions from './api/quizQuestions';
import Quiz from './components/Quiz';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            counter: 0,
            questionId: 1,
            question: '',
            answerOptions: [],
            answer: '',
            answersCount: {
                Resp1: 0,
                Resp2: 0,
                Resp3: 0
            },
            result: ''
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentWillMount() {
        const AnswerOptions = quizQuestions.map((question) => (question.answers));
        this.setState({
            question: quizQuestions[0].question,
            answerOptions: AnswerOptions[0]
        });
    }


    handleAnswerSelected(event) {
        this.setUserAnswer(event.currentTarget.value);

        setTimeout(() => this.setNextQuestion(), 1000);
       
    }

    setUserAnswer(answer) {
        this.setState({
            answer: answer
        });
    }

    setNextQuestion() {
        const counter = this.state.counter + 1;
        const questionId = this.state.questionId + 1;

        this.setState({
            counter: counter,
            questionId: questionId,
            question: quizQuestions[counter].question,
            answerOptions: quizQuestions[counter].answers,
            answer: ''
        });
    }

   

    renderQuiz() {
        return (
            <Quiz
                answer={this.state.answer}
                answerOptions={this.state.answerOptions}
                questionId={this.state.questionId}
                question={this.state.question}
                questionTotal={quizQuestions.length}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }


    render() {
        return (
            <div className="App">
                {this.renderQuiz()}
            </div>
        );
    }

}

export default App;
