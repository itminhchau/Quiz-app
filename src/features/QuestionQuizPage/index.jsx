/* eslint-disable no-self-assign */
import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import questionApi from '../../api/questionApi';
import back from '../../assets/image/remove.png';
import ModalCongratulation from '../ModalCongratulation';
import TextAnswer from './components/TextAnswer';
import TextQuestion from './components/TextQuestion';
import './styles.scss';
QuestionQuizPage.propTypes = {

};

function QuestionQuizPage(props) {
    const [listQuestion, setListQuestion] = useState([0])
    const [numberQuestion, setNumberQuestion] = useState(0)
    const history = useHistory()
    const [isOpen, setIsOpen] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalTime, setTotalTime] = useState(0)
    const [openButtonNext, setOpenButtonNext] = useState(false)

    let timeOutRef = useRef(0)

    useEffect(() => {
        (async () => {
            const res = await questionApi.getAll({ amount: 10 })
            const { data: { results } } = res
            setListQuestion(results)
        })()
    }, [])

    const handleNext = () => {
        if (numberQuestion >= listQuestion.length - 1) {
            openModal()
            handleClearTimeOut()
            return
        }
        const number = numberQuestion + 1
        setNumberQuestion(number)

    }

    const shuffleArray = (arr) => {
        if (!arr) return
        for (let i = arr.length - 1; i > 0; i--) {
            // Generate a random index between 0 and i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap the current element with the randomly selected element
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr;
    }

    const totalCorrectAnswer = () => {
        setTotal(total + 1)
    }

    const mergeAnswer = (item) => {
        const answer = item && [...item.incorrect_answers, item.correct_answer]
        const arrayAnswerObj = answer && answer.map(item => {
            const id = item
            return {
                id: id,
                value: item
            }
        })

        return arrayAnswerObj
    }

    const arrayAnswer = useMemo(() => {
        return shuffleArray(mergeAnswer(listQuestion && listQuestion[numberQuestion]))
    }, [numberQuestion, listQuestion])

    const handleToHome = () => {
        history.push('/')
    }

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
        history.push('/question')
        setTotal(0)
        setNumberQuestion(0)
        setTotalTime(0)

    }

    useEffect(() => {
        timeOutRef.current = setTimeout(() => {
            setTotalTime(prevTotalTime => prevTotalTime + 1)

        }, 1000);
    }, [totalTime])

    const handleClearTimeOut = () => {

        clearTimeout(timeOutRef.current)
    }


    const handleCheckToShowButtonNext = (value) => {
        setOpenButtonNext(value)
    }

    useEffect(() => {
        setOpenButtonNext(false)
    }, [numberQuestion])

    const correctAnswer = listQuestion && listQuestion[numberQuestion].correct_answer;

    console.log("check total time", totalTime);

    return (
        <div className='wrap-question'>
            <div className='container'>
                <img src={back} alt="back to home" className="btn-back" onClick={handleToHome} />
                <TextQuestion numberQuestion={numberQuestion} dataQuestion={listQuestion[numberQuestion]} />
                <div className="wrapper-answer">

                    <TextAnswer onCheckToShowButtonNext={handleCheckToShowButtonNext} arrayAnswer={arrayAnswer} totalCorrectAnswer={totalCorrectAnswer} correctAnswer={correctAnswer} numberQuestion={numberQuestion} />

                </div>

                <button className={
                    classNames(
                        openButtonNext === true ? 'btn-next' : 'btn-next disabled-button'
                    )
                } onClick={handleNext}>{
                        numberQuestion === listQuestion.length - 1 ? "Done" : "next"
                    }</button>
                <ModalCongratulation total={total} totalTime={totalTime} isOpen={isOpen} onCloseModal={closeModal} />
            </div>


        </div>
    );
}

export default QuestionQuizPage;