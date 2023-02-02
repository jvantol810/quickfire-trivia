import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useEffect, useState } from 'react';
import './index.css';
import TriviaQuestion from './components/TriviaQuestions/TriviaQuestion.js';
import Popup from './components/Popups/Popup.js';
import TimerBar from './components/TimerBar/TimerBar.js';
import CategoryButton from './components/CategoryButton/CategoryButton.js';
import {getTriviaQuestion, getRandomTriviaCategory} from './trivia.js';
import GameOver from './components/GameOver/GameOver.js';

/* React Components */

const Board = (props) => {
    const handleCategoryButtonClick = (triviaCategory) => {
        props.handleClick(triviaCategory)
    }

    // //Render
    return props.triviaCategories ? (
        <div className="categories-container">
            <CategoryButton handleClick={handleCategoryButtonClick} triviaCategory={props.triviaCategories[0]}></CategoryButton>
            <CategoryButton handleClick={handleCategoryButtonClick} triviaCategory={props.triviaCategories[1]}></CategoryButton>
            <CategoryButton handleClick={handleCategoryButtonClick} triviaCategory={props.triviaCategories[2]}></CategoryButton>
            <CategoryButton handleClick={handleCategoryButtonClick} triviaCategory={props.triviaCategories[3]}></CategoryButton>
        </div>
    ) : <div></div>
}

const Game = () => {
    const [questionPopup, setQuestionPopup] = useState(false);
    const [currentTriviaQuestion, setCurrentTriviaQuestion] = useState("");
    const [currentTriviaAnswers, setCurrentTriviaAnswers] = useState("");
    const [currentTriviaCategories, setCurrentTriviaCategories] = useState();
    const [triggerCategoryRefresh, setTriggerCategoryRefresh] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const [timerSettings, setTimerSettings] = useState({
        startingSeconds: 60,
        isRunning: true,
        addTime: 0,
        handleTimeAdded: () => handleTimeAdded(),
        handleTimerEnded: () => handleTimerEnded()
    });

    const handleTimeAdded = () => {
        setTimerSettings({...timerSettings, addTime: 0});
    }

    /* Handle the click of a category button to fetch a question */
    const handleCategoryButtonClick = (triviaCategory) => {
        /* Fetch trivia question based on the category selected */
        getTriviaQuestion(triviaCategory.id).then(
            question => {
                setCurrentTriviaQuestion(question["question"]);
                setCurrentTriviaAnswers(question["answers"]);
                setQuestionPopup(true);
            }
        )
    }

    const handleTriviaAnswerClick = (answerSelected) => {
        /* If the answer was correct, add 5 seconds to the timer */
        if(answerSelected.isCorrect) {
            setTimerSettings({...timerSettings, addTime: 5})
        }
        /* Refresh the categories and disable the popup */
        setTriggerCategoryRefresh(true);
        setQuestionPopup(false);        
    }

    const handleTimerEnded = () => {
        setTimerSettings({...timerSettings, isTimerRunning: false});
        setGameOver(true);
    }

    const restartGame = () => {
        setTimerSettings({...timerSettings, isTimerRunning: true, addTime: timerSettings.startingSeconds});
        setTriggerCategoryRefresh(true);
        setGameOver(false);
    }

    useEffect(() => {
        if(triggerCategoryRefresh){
            getRandomTriviaCategory(4).then(
                randCategories => setCurrentTriviaCategories(randCategories)
            );
            setTriggerCategoryRefresh(false);
        }
    }, [triggerCategoryRefresh])

    //Assign each button on the board with a different, random category
    return (
        <div className="game">
            <TimerBar startingSeconds={timerSettings?.startingSeconds} isRunning={timerSettings?.isRunning} addTime={timerSettings?.addTime} 
            handleTimeAdded={timerSettings?.handleTimeAdded} handleTimerEnded={timerSettings?.handleTimerEnded}/>
            <Board handleClick={handleCategoryButtonClick} triviaCategories={currentTriviaCategories}/>
            <Popup trigger={questionPopup} 
                   setTrigger={setQuestionPopup} 
                   children={
                        <TriviaQuestion question={currentTriviaQuestion} answers={currentTriviaAnswers} handleClick={handleTriviaAnswerClick}/>
                    }>
            </Popup>
            <Popup  trigger={gameOver} 
                    setTrigger={setGameOver}
                    children={
                        <GameOver handlePlayAgain={restartGame}/>
                    }>
            </Popup>
        </div>
    )
}

/* Create the root of the DOM and render the game component to it */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <div className="root">
        <link rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Bangers
        "></link>
        <Game />
    </div>
)