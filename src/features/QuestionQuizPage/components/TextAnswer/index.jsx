import React, { useEffect, useState } from 'react';
import check from '../../../../assets/image/check.png';
import './styles.scss';
import classNames from 'classnames';

TextAnswer.propTypes = {

};

function TextAnswer({ arrayAnswer, correctAnswer, totalCorrectAnswer, onCheckToShowButtonNext }) {
    const [highlightedIndex, setHighlightedIndex] = useState(null);
    const [checked, setChecked] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [click, setClick] = useState(false)

    const handleClick = (index, item) => {
        setHighlightedIndex(index);
        setDisabled(true)
        setChecked(false)
        setClick(true)
        onCheckToShowButtonNext(true)
        if (item.value === correctAnswer) {
            setChecked(true)
            totalCorrectAnswer()
        }


    };

    useEffect(() => {
        setHighlightedIndex(null);
        setDisabled(false)
        setChecked(false)
        setClick(false)
    }, [arrayAnswer])
    return (
        <div className='wrap-answer'>
            {arrayAnswer && arrayAnswer.map((item, index) => {
                return (
                    <div
                        key={index}
                        onClick={() => handleClick(index, item)}
                        // className={highlightedIndex === index ? 'answer-checked' : 'answer'} 
                        // className={highlightedIndex === index && checked === true ? 'correct' : 'answer'}
                        className={
                            classNames(
                                highlightedIndex === index && checked === true ? 'correct ' : 'incorrect ',
                                highlightedIndex === index ? 'answer-checked ' : 'answer ',
                                disabled === true ? 'disabled-button' : '',
                            )

                        }
                    >
                        <span>{item.value}</span>
                        <div className='check-box'>
                            {highlightedIndex === index ? <img src={check} alt="" /> : ''}

                        </div>
                    </div>
                )
            })}
            {click && click === true &&
                <div className='wrap-text-answer-correct' >
                    <span style={{ color: "white" }}>AnswerCorrect is : {correctAnswer}</span>
                </div>
            }

        </div>
    );
}

export default TextAnswer;