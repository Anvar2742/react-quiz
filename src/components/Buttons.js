export default function Buttons(props) {
    const {checkAnswers, isCheck, restartQuiz, questionsArr, isLoad} = props
    let correctCount = 0
    questionsArr.forEach(el => {
        el.selectedValue === el.correct_answer && correctCount++
    })
    return (
        <>
            {
                isCheck ?
                        <div className="quiz--score">
                            <span>{`You scored ${correctCount}/${questionsArr.length} correct answers`}</span>
                            <button onClick={restartQuiz} className="btn">Play Again</button>
                        </div> :
                        !isLoad &&
                        <button onClick={checkAnswers} className="btn">Check Answers</button>
            }
        </>
    )
}