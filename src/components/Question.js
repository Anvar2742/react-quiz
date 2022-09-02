export default function Question(props) {
    const {isCheck, correct_answer: correctAnswer, incorrect_answers: wrongAnswers} = props
    const correctIndex = Math.floor(Math.random() * wrongAnswers.length + 1)
    !wrongAnswers.includes(correctAnswer) && wrongAnswers.splice(correctIndex, 0, correctAnswer)
    const he = require('he');
    const decodeHtmlCharCodes = str => he.decode(str)
    const question = decodeHtmlCharCodes(props.question)
    
    // const decodeHtmlCharCodes = str => str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    //                                         String.fromCharCode(charCode)
    //                                     );                              
    // const question = decodeHtmlCharCodes(props.question).replace(/&quot;/g, '\"').replace(/&(\d+);/g, '\"')
    // const displayAnswer = decodeHtmlCharCodes(answer).replace(/&quot;/g, '\"').replace(/(&(\d+);)/g, '\"')
    // console.log(he.decode(str));
    const optionElements = wrongAnswers.map(answer => {
        const displayAnswer = decodeHtmlCharCodes(answer)
        const optionClasses = ["option"]

        if (isCheck) {
            if (answer === correctAnswer) {
                optionClasses.push("correct")
            }

            if (props.selectedValue !== correctAnswer && props.selectedValue === answer) {
                optionClasses.push("wrong")
            }
        } else {
            if (props.selectedValue === answer) {
                optionClasses.push("selected")
            }
        }


        return <label 
                    key={answer}
                    className={optionClasses.join(" ")}
                >
                    {displayAnswer}
                    <input 
                        type="radio"
                        value={answer}
                        name={question}
                        onClick={event => props.selectOption(event, props.id)}
                        disabled={isCheck}
                    />
                </label>
    })

	return ( 
		<div className="quiz--item">
            <h4>{question}</h4>
            <div className="quiz--options">
                {optionElements}
            </div>
        </div>
	);
}