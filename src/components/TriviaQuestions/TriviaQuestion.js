import React, { useState, useEffect } from 'react'
import './triviaQuestion.css'

function TriviaQuestion(props) {
  const [answerIndexSubmitted, setAnswerIndexSubmitted] = useState(-1);
  const [buttonClasses, setButtonClasses] = useState(['','','','']);
  const [buttonClassesInitialized, setButtonClassesInitialized] = useState(false);
  const [answerButtons, setAnswerButtons] = useState(null)
  const [answerSubmitted, setAnswerSubmitted] = useState(false)

  const handleClick = (answerSelected, answerIndex) => {
    setAnswerIndexSubmitted(answerIndex);

    /* If the correct answer was not chosen, submit it after 100 ms */
    if(!answerSelected.isCorrect) {
      setTimeout(() => {
        props.answers.find((answer, index) => {
          if(answer.isCorrect) {
            updateButtonClasses(index, 'submitted');
            return index;
          }
        })
      }, 400)
    }
    
    setTimeout(() => {
      props.handleClick(answerSelected);
    }, 1500)
  }
  
  useEffect(
    () => {
      
      if(answerIndexSubmitted !== -1 && !answerSubmitted) {
        console.log("answer index submitted.")
        updateButtonClasses(answerIndexSubmitted, 'submitted');
        setAnswerSubmitted(true);
        return;
      }

      intializeButtonClasses();
      initializeAnswerButtons();
  }, [buttonClasses, answerIndexSubmitted])

  const refreshAnswers = () => {
    console.log("REFRESHING ANSWERS.")
    setAnswerButtons(
      [
        <button className = {buttonClasses[0]} onClick={() => handleClick(props.answers[0], 0)}> {props.answers[0].text} </button>,
        <button className = {buttonClasses[1]} onClick={() => handleClick(props.answers[1], 1)}> {props.answers[1].text} </button>,
        <button className = {buttonClasses[2]} onClick={() => handleClick(props.answers[2], 2)}> {props.answers[2].text} </button>,
        <button className = {buttonClasses[3]} onClick={() => handleClick(props.answers[3], 3)}> {props.answers[3].text} </button>,  
      ]
    )
  }

  const initializeAnswerButtons = async () => {
    if(!buttonClassesInitialized || props.answers === undefined) {return}
    setAnswerButtons(
      [
        <button className = {buttonClasses[0]} onClick={() => handleClick(props.answers[0], 0)}> {props.answers[0].text} </button>,
        <button className = {buttonClasses[1]} onClick={() => handleClick(props.answers[1], 1)}> {props.answers[1].text} </button>,
        <button className = {buttonClasses[2]} onClick={() => handleClick(props.answers[2], 2)}> {props.answers[2].text} </button>,
        <button className = {buttonClasses[3]} onClick={() => handleClick(props.answers[3], 3)}> {props.answers[3].text} </button>,  
      ]
    )
  }

  const intializeButtonClasses = async () => {
    if(buttonClassesInitialized) {return;}
    let newButtonClasses = ['', '', '', '']
    for(let i=0; i<newButtonClasses.length; i++) {
      let value = `answer ${props.answers[i].isCorrect ? 'correct' : 'incorrect'}`;
      newButtonClasses[i] = value;
    }
    // console.log("New button classes: " + newButtonClasses);
    setButtonClasses(newButtonClasses);
    setButtonClasses((state) => {
      setButtonClassesInitialized(true);
      return newButtonClasses;
    });
  }

  const updateButtonClasses = (index, value) => {
    let newButtonClasses = buttonClasses;
    newButtonClasses[index] = `${newButtonClasses[index]} ${value}`;
    setButtonClasses(newButtonClasses);
    setButtonClasses((state) => {
      refreshAnswers();
      return newButtonClasses;
    });
  }
  

  return props.answers && answerButtons ? (
    <div>
      <h2 className='question'>{props.question}</h2>
      <ul className='answer-list'>
        <li>{answerButtons[0]}</li>
        <li>{answerButtons[1]}</li>
        <li>{answerButtons[2]}</li>
        <li>{answerButtons[3]}</li>
      </ul>
    </div>
  ) : <div></div>
}

export default TriviaQuestion