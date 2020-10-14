import React,{Fragment} from 'react'
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
import Correct from '../assets/sounds/correct.mp3'
import Wrong from '../assets/sounds/wrong.mp3'


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
            correctAnswers:0,
            wrongAnswers:0,
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
                numberOfQuestions:questions.length,
                answer:answer
            })
        }
    }

    handleOptionClick=(e)=>{
        if (e.target.innerHTML.toLowerCase()==this.state.answer.toLowerCase()){
            setTimeout(()=>{
                document.getElementById('correct-sound').play()
            },100)
            this.correctAnswer()
        }else{
            this.wrongAnswer()
            setTimeout(()=>{
                document.getElementById('wrong-sound').play()
            },100)
        }
    }

    handleButtonClick=(e)=>{
        switch(e.target.id){
            case 'next-button':
                this.handleNextButtonClick();
                break;
            case 'previous-button':
                this.handlePreviousButtonClick();
                break;
            case 'quit-button':
                this.handleQuitButtonClick();
                break;
            default:
                break;
        }
    }

    handleNextButtonClick=()=>{
        if(this.state.nextQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex+1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            })
        }
    }

    handleQuitButtonClick=()=>{
        if(window.confirm('Are you sure?')){
            this.props.history.push('/')
        }
    }

    handlePreviousButtonClick=()=>{
        if(this.state.previousQuestion !== undefined){
            this.setState(prevState=>({
                currentQuestionIndex: prevState.currentQuestionIndex-1
            }),()=>{
                this.displayQuestions(this.state.state,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            })
        }
    }

    correctAnswer=()=>{
        this.setState(prevState=>({
            score:prevState+1,
            correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1
        }),()=>{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
        })
    }

    wrongAnswer=()=>{
        this.setState(prevState=>({
            wrongAnswers:prevState.wrongAnswers + 1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1,
        }),()=>{
            this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
        })
    }

    render(){
        const {currentQuestion, currentQuestionIndex,numberOfQuestions}=this.state

        return(
            <Container  className='quiz-box justify-content-center'>
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                <audio id='correct-sound' src={Correct}></audio>
                <audio id='wrong-sound' src={Wrong}></audio>
                </Fragment>

                <div>
                    <div className='h2 text-center'>{currentQuestion.question}</div>
                    {/* helpers */}
                    <Row>
                    <Col className=''>
                    <BsSquareHalf className='float-left m-1'/><span className='float-left'>2</span>
                    <FaRegLightbulb className='float-right m-1'/><span className='float-right'>5</span>
                    </Col>
                    </Row>

                    {/* nr question and time */}
                    <Row className='mb-2'>
                    <Col className ='float-left'><span className='float-left'>{currentQuestionIndex+1} of {numberOfQuestions}</span></Col>
                        <Col className ='float-right'>
                            <span className='float-right'>15:00</span>
                            <BsFillClockFill className='float-right m-1'/>
                        </Col>
                    </Row>

                    <div className='justify-content-center'>
                        <Row className='m-3'>
                            <Col onClick={this.handleOptionClick} className='quiz-button'>{currentQuestion.optionA}</Col>
                            <Col onClick={this.handleOptionClick} className='quiz-button'>{currentQuestion.optionB}</Col>
                        </Row>
                        <Row className='m-3'>
                            <Col onClick={this.handleOptionClick} className='quiz-button'>{currentQuestion.optionC}</Col>
                            <Col onClick={this.handleOptionClick} className='quiz-button'>{currentQuestion.optionD}</Col>
                        </Row>
                    </div>
                </div>

                <div className=''>
                    <Button id='previous-button' variant='primary' onClick={this.handleButtonClick} className='m-2'>Previous</Button>
                    <Button id='next-button' variant='success' onClick={this.handleButtonClick} className='m-2'>Next</Button>
                    <Button id='quit-button' variant='danger' onClick={this.handleButtonClick} className='m-2'>Quit</Button>
                </div>
            </Container>
        )
    }
}

export default Quiz
   
