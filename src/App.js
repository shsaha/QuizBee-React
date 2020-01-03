import React, { Component } from 'react';
import quizService from './quizService'
import QuestionBox from './components/QuestionBox'
import './App.css';

class App extends Component {
  state = {
    questionBank: [],
    score: 0,
    responses: 0
  }

  getQuestion = () => {
    quizService().then(question => {
      this.setState({
        questionBank: question
      })
    })
  }

  computeAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      this.setState({
        score: this.state.score + 1
      })
    }
    this.setState({
      responses: this.state.responses < 5 ? this.state.responses + 1 : 5
    })
  }
  componentDidMount() {
    this.getQuestion()
  }
  render() {
    const { questionBank, responses, score } = this.state
    return (
      <div className="container">
        <div className="title"></div>
        {questionBank.length > 0 && responses < 5 && questionBank.map(({ question, answers, correct, questionId }) => (
          <QuestionBox question={question} options={answers} key={questionId} selected={answer => this.computeAnswer(answer, correct)} />
        ))}
        {responses === 5 ? (<h2>{score}</h2>) : null}
      </div>

    );
  }
}

export default App;
