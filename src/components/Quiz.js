import React from 'react'
import questions from '../questions.json'
import Container from 'react-bootstrap/Container'
import Helmet from 'react-helmet'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { BsSquareHalf } from 'react-icons/bs';
import { FaRegLightbulb } from 'react-icons/fa';
import { BsFillClockFill } from "react-icons/bs";
import isEmpty from '../isEmpty'


class Quiz extends React.Component{
    constructor(props){
        super(props)
        
        this.state={
            questions:questions,
            currentQuestion:{},
            nextQuestion:{},
            previousQuestion:[],
            answer:'',
            numberOfQuestions:0,
            numberOfAnsweredQuestions:0,
            currentQuestionIndex:0,
            score:0,
            correncAnswers:0,
            wrongAnswer:0,
            hints:5,
            fiftyFifty:2,
            usedFiftyFifty:false,
            time:{}
        }
    }

    componentDidMount(){
        const {questions, currentQuestion, nextQuestion, previousQuestion}=this.state
        this.displayQuestions(questions,currentQuestion,nextQuestion, previousQuestion)
    }

    displayQuestions=(questions=this.state.questions, currentQuestion,nextQuestion,previousQuestion)=>{
        let {currentQuestionIndex}=this.state
        if(!isEmpty(this.state.questions)){
            questions=this.state.questions
            currentQuestion=questions[currentQuestionIndex]
            nextQuestion=questions[currentQuestionIndex+1]
            previousQuestion=questions[currentQuestionIndex-1]
            const answer=currentQuestion.answer
            this.setState({
                currentQuestion: currentQuestion,
                nextQuestion: nextQuestion,
                previousQuestion:previousQuestion,
                answer:answer
            })
        }
    }

    render(){
        const {currentQuestion}=this.state

        return(
            <Container  className='quiz-box justify-content-center'>
                <Helmet><title>Quiz Page</title></Helmet>
                <div>
                    <div className='display-4 text-center'>{currentQuestion.question}</div>
                    {/* helpers */}
                    <Row>
                    <Col className=''>
                    <BsSquareHalf className='float-left m-1'/><span className='float-left'>2</span>
                    <FaRegLightbulb className='float-right m-1'/><span className='float-right'>5</span>
                    </Col>
                    </Row>

                    {/* nr question and time */}
                    <Row className='mb-2'>
                        <Col className ='float-left'><span className='float-left'>1 of 15</span></Col>
                        <Col className ='float-right'>
                            <span className='float-right'>15:00</span>
                            <BsFillClockFill className='float-right m-1'/>
                        </Col>
                    </Row>

                    <div className='justify-content-center'>
                        <Row className='m-3'>
                            <Col className='quiz-button'>{currentQuestion.optionA}</Col>
                            <Col className='quiz-button'>{currentQuestion.optionB}</Col>
                        </Row>
                        <Row className='m-3'>
                            <Col className='quiz-button'>{currentQuestion.optionC}</Col>
                            <Col className='quiz-button'>{currentQuestion.optionD}</Col>
                        </Row>
                    </div>
                </div>

                <div className=''>
                    <Button variant='primary' className='m-2'>Previous</Button>
                    <Button variant='success' className='m-2'>Next</Button>
                    <Button variant='danger' className='m-2'>Quit</Button>
                </div>
            </Container>
        )
    }
}

export default Quiz
   
