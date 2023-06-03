import React from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/image/logo.png';
import './styles.scss';

HomeQuizPage.propTypes = {

};
function HomeQuizPage(props) {
    const history = useHistory()
    const handleOnclick = () => {
        history.push("/question")
    }
    return (
        <div className='wrap-home'>
            <div className='container'>
                <img src={logo} alt="" srcset="" className='logo' />
                <button className='btn-start' onClick={handleOnclick}>Start Quiz</button>
            </div>
        </div>
    );
}

export default HomeQuizPage;