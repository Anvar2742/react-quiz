import QuizStart from './components/QuizStart';
import Preloader from './components/Preloader';
import Question from './components/Question';
import Buttons from './components/Buttons';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import blobOne from './img/blob-1.png';
import blobTwo from './img/blob-2.png';

export default function App() {
	const [questionsArr, setQuestionsArr] = useState([]);
	const [isQuiz, setIsQuiz] = useState(false);
	const [isCheck, setIsCheck] = useState(false);
	const [isLoad, setIsLoad] = useState(false);
	const [questionElements, setQuestionElements] = useState("");

	function getData() {
		fetch('https://opentdb.com/api.php?amount=5&type=multiple&category=9')
				.then(res => res.json())
				.then(data => {
					setTimeout(() => {
						setQuestionsArr(() => {
							return data.results.map(result => {
								return {
									...result,
									id: nanoid(),
									selectedValue: ""
								}
							})
						})
						setIsLoad(prevIsLoad => !prevIsLoad)
					}, 1000);
				})
				.catch(error => console.error(error))
	}

	function startQuiz() {
		setQuestionElements(<Preloader />)
		setIsLoad(prevIsLoad => !prevIsLoad)
		getData()
		setIsQuiz(prevIsQuiz => !prevIsQuiz)
	}

	useEffect(() => {
		setQuestionElements(questionsArr.map(item => (
			<Question 
				key={item.id}
				id={item.id}
				question={item.question}
				correct_answer={item.correct_answer}
				incorrect_answers={item.incorrect_answers}
				selectedValue={item.selectedValue}
				selectOption={selectOption}
				isCheck={isCheck}
			/>
		)))
	}, [questionsArr, isCheck])

	function restartQuiz() {
		setIsQuiz(prevIsQuiz => !prevIsQuiz)
		setIsCheck(prevIsCheck => !prevIsCheck)
	}

	function selectOption(event, optionId) {
		const optionValue = event.target.value
		setQuestionsArr(prevQuestionArr => (
			prevQuestionArr.map(question => (
				question.id === optionId ? {
					...question,
					selectedValue: optionValue
				} : question
			))
		))
	}
	
	return ( 
		<main className={!isQuiz || isLoad ? "full-main" : ""}>
			<div className={`quiz--body ${isCheck ? "quiz--check" : ""}`}>
				{
					isQuiz ?
						<div className='quiz--questions'>
							{questionElements}
						</div> :
						<QuizStart
							startQuiz={startQuiz}
							isQuiz={isQuiz}
						/>
				}
				
				{
					isQuiz &&
						<Buttons 
							checkAnswers={() => setIsCheck(true)}
							restartQuiz={restartQuiz}
							isCheck={isCheck}
							isLoad={isLoad}
							questionsArr={questionsArr}
						/>
				}

			</div>
				<img src={blobOne} className="blob blob-1" />
				<img src={blobTwo} className="blob blob-2" />
		</main>
	);
}