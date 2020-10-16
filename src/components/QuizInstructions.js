import React ,{Fragment} from 'react'
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Container from 'react-bootstrap/Container'
import Row from'react-bootstrap/Row'
import { FiChevronsRight } from "react-icons/fi";
import { BsFillClockFill } from "react-icons/bs";
import Correct from '../assets/sounds/correct.mp3'
import Wrong from '../assets/sounds/wrong.mp3'
import {BsPlayFill} from 'react-icons/bs'
import back from '../assets/images/back.jpg'
import { Button } from 'react-bootstrap'



const QuizInstructions=()=>(
    <Container className='quiz-container border mt-3 '>
        <Helmet>
            <title>Quiz Instructions</title>
            <style>{`body { background-image: url(${back}); background-size:cover; }`}</style>
        </Helmet>
        <Fragment>
            <audio id='correct-sound' src={Correct}></audio>
            <audio id='wrong-sound' src={Wrong}></audio>
        </Fragment>
        <Row className='display-4 justify-content-center'>
        How to Play the Game 
        </Row>
        <div className='instruction m-4'>Read the guide</div>
        <div className='instruction-detail border-bottom m-3'><FiChevronsRight/>The game has a time limit of 15 minutes</div>
        <div className='instruction-detail border-bottom m-3'><FiChevronsRight/>There are 15 Questions</div>
        <div className='instruction-detail border-bottom m-3'><FiChevronsRight/>There are 4 Options</div>
        <div className='instruction-detail border-bottom m-3'><FiChevronsRight/>Select the answer by clicking</div>
        <div className='instruction-detail m-4'><FiChevronsRight/>There are 2 helps:
            <div className='m-3'>
                 <div className='border-bottom m-3'>50-50: removes 2 wrong answers (total number:2)</div>
                 <div className='border-bottom m-3'>Hint: removes 1 wrong answer (total hints:5)</div>
            </div>
        </div>
        <div className='instruction-detail border-bottom m-4'><FiChevronsRight/>
            If your answer is <span className='text-success'>Correct</span> you will hear: 
            <span onClick={()=>document.getElementById('correct-sound').play()}><BsPlayFill className='correct-icon'/></span>
        </div>
        <div className='instruction-detail border-bottom m-4'><FiChevronsRight/> 
            If your answer is <span className='text-danger'>Wrong</span> you will hear: 
            <span onClick={()=>document.getElementById('wrong-sound').play()}><BsPlayFill className='wrong-icon'/></span>
        </div>

        <div className='text-info m-4'><BsFillClockFill/>The timer starts as soon as the game loads</div>
        <div className ='p-4'>
            <span className='float-left'>
                <Link className='text-danger' to='/'>
                    <Button variant='danger'>Take me Back</Button>
                </Link>
            </span>
            <span className='float-right'>
                <Link className='text-success' to='/play/quiz'>
                <Button variant='success'>Let's Do IT</Button>
                </Link>
            </span>
        </div>
        
    </Container>
)
export default QuizInstructions