import React from 'react';
import './styles.scss';

TextQuestion.propTypes = {

};

function TextQuestion({ dataQuestion, numberQuestion }) {
    const question = dataQuestion && dataQuestion.question
    return (
        <div className='wrap-text'>
            <span className='count-question'>Question {numberQuestion + 1}/10</span>
            {question !== 0 &&
                <span className='title-question'>{question}</span>
            }

        </div>
    );
}

export default TextQuestion;