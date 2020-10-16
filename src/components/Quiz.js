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
import back from '../assets/images/back.jpg'



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
            previousRandomNumbers:[],
            time:{}
        }
        this.interval=null
    }

    componentDidMount(){
        const {questions, currentQuestion, nextQuestion, previousQuestion}=this.state
        this.displayQuestions(questions,currentQuestion,nextQuestion, previousQuestion)
        this.startTimer()
    }
    componentWillUnmount(){
        clearInterval(this.interval)
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
                answer:answer,
                previousRandomNumbers:[]
            },()=>{
                this.showOptions()
            });
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
            score:prevState.score+1,
            correctAnswers:prevState.correctAnswers+1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1
        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endGame()
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            }
        })
    }

    wrongAnswer=()=>{
        this.setState(prevState=>({
            wrongAnswers:prevState.wrongAnswers + 1,
            currentQuestionIndex:prevState.currentQuestionIndex+1,
            numberOfAnsweredQuestions:prevState.numberOfAnsweredQuestions+1,
        }),()=>{
            if(this.state.nextQuestion===undefined){
                this.endGame()
            }else{
                this.displayQuestions(this.state.questions,this.state.currentQuestion,this.state.nextQuestion,this.state.previousQuestion)
            }
        })
    }

    showOptions= ()=>{
        const options=Array.from(document.querySelectorAll('.quiz-button'))
        options.forEach(option=>{
            option.style.visibility='visible'
        });
        this.setState({
            usedFiftyFifty:false
        })
    }

    handleHints=()=>{
        if (this.state.hints>0){
            const options=Array.from(document.querySelectorAll('.quiz-button'))
            let indexOfAnswer

            options.forEach((option,index)=>{
                if(option.innerHTML.toLowerCase()===this.state.answer.toLowerCase()){
                    indexOfAnswer=index
                }
            });
            while(true){
                const randomNumber=Math.round(Math.random()*3)
                if(randomNumber!==indexOfAnswer && !this.state.previousRandomNumbers.includes(randomNumber)){
                    options.forEach((option,index)=>{
                        if(index===randomNumber){
                            option.style.visibility='hidden';
                            this.setState((prevState)=>({
                                hints: prevState.hints-1,
                                previousRandomNumbers:prevState.previousRandomNumbers.concat(randomNumber)
                        }));
                        }
                    });
                    break;
                }
                if (this.state.previousRandomNumbers.length >=3) break;
            }
        }
    }

    handleFiftyFifty=()=>{
        if(this.state.fiftyFifty>0 && this.state.usedFiftyFifty===false){
            const options =document.querySelectorAll('.quiz-button')
            const randomNumbers= []
            let indexOfAnswer

            options.forEach((option,index)=>{
                if(option.innerHTML.toLowerCase()===this.state.answer.toLocaleLowerCase()){
                    indexOfAnswer=index
                }
            });
            let count=0
            do {
                let randomNumber = Math.round(Math.random() *3);
                if(randomNumber !== indexOfAnswer) {
                    if (randomNumbers.length<2 && !randomNumbers.includes(randomNumber) && !randomNumbers.includes(indexOfAnswer)){
                        randomNumbers.push(randomNumber);
                        count++;
                    }
            }
            } while(count<2);
            options.forEach((option,index)=>{
                if (randomNumbers.includes(index)){
                    option.style.visibility='hidden'
                }
            })
            this.setState(prevState=>({
                fiftyFifty:prevState.fiftyFifty-1,
                usedFiftyFifty:true,
            }))
        }
    }

    startTimer=()=>{
        const countDownTime=Date.now()+ 903000
        this.interval=setInterval(()=>{
            const now =new Date()

            const distance=countDownTime-now
            const minutes=Math.floor((distance%(1000*60*60)) / (1000*60))
            const seconds=Math.floor((distance%(1000*60)) / 1000)

            if (distance<0){
                clearInterval(this.interval)
                this.setState({
                    time:{
                    minutes:0,
                    seconds:0
                    }
                },()=>{
                    this.endGame()
                })
            }else{
                this.setState({
                    time:{
                        minutes:minutes,
                        seconds:seconds
                    }
                })
            }
        },1000)
    }

    endGame=()=>{
        const {state}=this;
        const playerStats={
            score:state.score,
            numberOfQuestions:state.numberOfAnsweredQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            fiftyFiftyUsed: 2 - state.fiftyFifty,
            hintsUsed: 5 - state.hints,
        }
        setTimeout(()=>{
            this.props.history.push('/play/quizsummary',playerStats)
        },1000)
    }

    render(){
        const {
            currentQuestion, 
            currentQuestionIndex,
            numberOfQuestions,
            hints,fiftyFifty,
            time
            }=this.state

        return(
            <Container  className='quiz-box justify-content-center'>
                <Helmet>
                    <title>Quiz Page</title>
                    <style>{`body { background-image: url(${back}); background-size:cover; }`}</style>
                </Helmet>
                <Fragment>
                <audio id='correct-sound' src={Correct}></audio>
                <audio id='wrong-sound' src={Wrong}></audio>
                </Fragment>

                <div>
                    <Row className='text-center justify-content-center h4'>{currentQuestion.question}</Row>
                    {/* helpers */}
                    <Row>
                    <Col className=''>
                        <BsSquareHalf onClick={this.handleFiftyFifty} className='float-left m-4 helps'/>
                        <span  className='float-left display-4'>{fiftyFifty}</span>
                        <FaRegLightbulb onClick={this.handleHints} className='float-right m-4 helps'/>
                        <span className='float-right display-4'>{hints}</span>
                    </Col>
                    </Row>

                    {/* nr question and time */}
                    <Row className='mb-2'>
                    <Col className ='float-left'><span className='float-left'>{currentQuestionIndex+1} of {numberOfQuestions}</span></Col>
                        <Col className ='float-right'>
                            <span className='float-right'>{time.minutes}:{time.seconds}</span>
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
   
