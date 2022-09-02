export default function QuizStart(props) {
	return ( 
		<div className="quiz--start">
            <h1>Quizzical</h1>
            <p>Take a quiz on a random subject!</p>
            <button onClick={props.startQuiz} className="btn">Start Quiz</button>
        </div>
	);
}