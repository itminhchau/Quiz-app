import React from 'react';
import Modal from 'react-modal';
import imgCongratulation from '../../assets/image/congratulation.png';
import medal from '../../assets/image/medal.png';
import './styles.scss';
ModalCongratulation.propTypes = {

};
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');
function ModalCongratulation({ isOpen, onCloseModal, total, totalTime }) {

    const closeModal = () => {
        onCloseModal()
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                {total > 5 &&
                    <div className='modal-congratulation'>
                        <img src={medal} alt="" className='img-congratulation' />
                        <span className='congratulation'>Congratulation</span>
                        <span className='mazing'>you are mazing!</span>
                        <span className='title-correct-answer'>{total}/10 correct answer in {totalTime}s</span>
                        <button className='btn-play-again' onClick={closeModal}>Play again</button>
                    </div>

                }
                {total <= 5 &&
                    <div className='modal-congratulation'>
                        <img src={imgCongratulation} alt="" className='img-congratulation' />
                        <span className='congratulation'>Completed</span>
                        <span className='mazing'>Better luck next time!</span>
                        <span className='title-correct-answer'>{total}/10 correct answer in {totalTime}s</span>
                        <button className='btn-play-again' onClick={closeModal}>Play again</button>
                    </div>
                }

            </Modal>
        </div>
    );
}

export default ModalCongratulation;