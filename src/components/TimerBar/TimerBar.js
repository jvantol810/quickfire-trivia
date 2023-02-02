import React, {useState, useEffect, useRef} from 'react'
import './TimerBar.css'

export default function TimerBar(props) {
	const ref = useRef();
    const [secondsRemaining, setSecondsRemaining] = useState(props.startingSeconds);
	const [currentWidth, setCurrentWidth] = useState(null);
	const [startingWidth, setStartingWidth] = useState(null);
	const [widthPerSecond, setWidthPerSecond] = useState(null);
	const [delay, setDelay] = useState(0);
	const [animationSpeed] = useState(1);
	
    const decrementTimer = () => {
		if(currentWidth - (widthPerSecond) <= 0) {
			setCurrentWidth(0);
			setSecondsRemaining(0);
			props.handleTimerEnded();
			return;
		}
		if(widthPerSecond <= 0) {return;}
		setCurrentWidth(currentWidth - widthPerSecond);
		setSecondsRemaining(secondsRemaining - 1);
    }

	const incrementTimer = (amount) => {
		setSecondsRemaining(secondsRemaining + amount);
		setCurrentWidth(currentWidth + widthPerSecond * amount);
		props.handleTimeAdded();
	}

	useEffect(() => {
		if(startingWidth === null || startingWidth === 0) {setStartingWidth(ref.current.offsetWidth);}
		if(widthPerSecond === null || widthPerSecond === 0 || startingWidth === 0) {setWidthPerSecond(startingWidth / props.startingSeconds);}
		if(currentWidth === null) {setCurrentWidth(ref.current.offsetWidth);};
		if(startingWidth === null || currentWidth === null || widthPerSecond === null || widthPerSecond === 0) {setDelay(delay+1); return;}
		if (props.isRunning && secondsRemaining > 0 && props.addTime <= 0) {
    		setTimeout(() => decrementTimer(), 1000);
		}
		else if(props.isRunning && props.addTime > 0){
			incrementTimer(props.addTime);
		}
	}, [secondsRemaining, currentWidth, delay, props.isRunning])


  return (
		<div className="timer-bar-container">
			<div ref={ref} className="timer-bar" style={
				{
					borderRadius: '5px',
					backgroundColor: 'steelblue',
					height: '100%',
					position: 'relative',
					color: 'black',
					transition: `width ${animationSpeed}s linear 0s`,
					width: `${currentWidth}px`
				}
			}>
			</div>
				<span className="time-remaining">{ secondsRemaining } seconds remaining</span>
		</div>
  )
}



