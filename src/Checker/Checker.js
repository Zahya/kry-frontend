import React, { Component } from 'react';
import './Checker.css';
import Questions from '../heartburn.json';
import SelectButton from '../SelectButton/SelectButton.js';
import ActionButton from '../ActionButton/ActionButton.js';

var history = [];

class Checker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAnswer: null,
      question: Questions.questions[0],
      answers: Questions.questions[0].answers,
      score: 0,
      outcome: null,
      progress: 0
    };
  };

  onBook = () => {
    // Book a meeting
  }
  
  onSelect = (id) => {
    var answer = this.state.answers.find((ans) => ans.id === id);
  
    if (answer) {
      this.setState({selectedAnswer: answer});
    }
  }

  onBack = () => {
    this.setState(history.pop())
  }

  onNext = () => {
    var index = Questions.questions.findIndex((q) => (q.id === this.state.question.id)) + 1;
    var nextQuestion = this.state.question.next.find((q) => this.state.selectedAnswer.id === q.answered);
    var newQuestion;
    var outcomeId;

    history.push(this.state);

    if (nextQuestion) {
      newQuestion = Questions.questions.find((q) => q.id === nextQuestion.next_question);
    } else {
      newQuestion = Questions.questions.find((q) => q.id === this.state.question.next[0].next_question);
    }

    if (newQuestion) {      
      this.setState({
        question: newQuestion,
        answers: newQuestion.answers,
        selectedAnswer: null,
        score: this.state.score + this.state.selectedAnswer.score,
        progress: (index / Questions.questions.length) * 100 + "%"         
      });
    } else {
      var next = this.state.question.next.find((q) => this.state.score <= q.max_score);
      if (next) {
        outcomeId = next.outcome;
      } else {
        next = this.state.question.next.find((q) =>  !q.max_score);
        outcomeId = next.outcome;
      }

      var outcome = Questions.outcomes.find((o) => o.id === outcomeId);
      this.setState({
        outcome: outcome,
        progress: "100%"        
      });
    }
  }

  render() {
    return (
      <div className="Checker">
        <button className="checker__header" onClick={this.onBack} disabled={!history.length}>
          <img src="images/arrow-right.svg" className="icon__arrow-left" alt="back" />
          <span className="checker__title">Heartburn checker</span>
        </button>
        <div className="checker__progressbar"><div style={{width: this.state.progress}} className="checker__progressbar--progress"></div></div>
        <div className="checker__content">
          <div className="checker__question">{this.state.outcome ? "Thank you for answering the questions!" : this.state.question.question_text}</div>
          <div className="checker__divider"></div>

          {this.state.outcome ? 
          <div>
            <div className="checker__outcome">{this.state.outcome.text}</div>
            <div className={"checker__book-button " + (this.state.outcome.show_booking_button ? "" : "hidden")}>
              <ActionButton label="Book a meeting" active={true} onAction={this.onBook} />
            </div>
            <a className="checker__back-start" href=".">Back to the start screen</a> 
          </div> : 
          <div>
            <div className="checker__buttons">
              <SelectButton value={this.state.answers[0].label} selected={this.state.selectedAnswer === this.state.answers[0]} onSelect={this.onSelect} id={this.state.answers[0].id} />
              <SelectButton value={this.state.answers[1].label} selected={this.state.selectedAnswer === this.state.answers[1]} onSelect={this.onSelect} id={this.state.answers[1].id} />
            </div>
            <div className="checker__next-button">
              <ActionButton label="Next" active={this.state.selectedAnswer} onAction={this.onNext} disable={!this.state.selectedAnswer}/>
            </div>
          </div>
          }
        </div>
      </div>
    );  
  }
}

export default Checker;
