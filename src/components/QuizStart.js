export default function QuizStart(props) {
	return ( 
		<div className="quiz--start">
            <h1>Quizzical</h1>
            <p>Test your general knowledge!</p>
            <button onClick={props.startQuiz} className="btn">Start Quiz</button>
        </div>
	);
}