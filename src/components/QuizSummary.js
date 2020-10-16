import React, { Fragment } from 'react'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
import back from '../assets/images/back.jpg'
import Button from 'react-bootstrap/Button'
import { HiCheck } from "react-icons/hi";

class QuizzSummary extends React.Component{
    constructor(props){
        super(props)
        this.state={
            score:0,
            numberOfQuestions:0,
            numberOfAnsweredQuestion:0,
            correctAnswers:0,
            wrongAnswers:0,
            hintsUsed:0,
            fiftyFiftyUsed:0,
        }
    }
    componentDidMount(){
        const {state}=this.props.location
        this.setState({
            score:(state.score / state.numberOfQuestions)*100,
            numberOfQuestions:state.numberOfQuestions,
            numberOfAnsweredQuestions:state.numberOfAnsweredQuestions,
            correctAnswers:state.correctAnswers,
            wrongAnswers:state.wrongAnswers,
            hintsUsed:state.hintsUsed,
            fiftyFiftyUsed:state.fiftyFiftyUsed,
        })
    }
    render(){
        const {state}=this.props.location
        let stats
        let remark
        const userScore=this.state.score

        if (userScore<=30){
            remark='Watch more movies'
        }else if (userScore>30 && userScore<=50){
            remark='Watch some more movies'
        }else if (userScore>50 && userScore<=70){
            remark='You have a decent knowledge'
        }else if(userScore>70 && userScore<=85){
            remark='You did great'
        }else if(userScore>85 && userScore<=100){
            remark='You know it all'
        }

        if (state!==undefined){
            stats= (
                <Container className='text-center mt-5'>
                    <div><HiCheck className='display-1 text-success'/></div>
                    <div className='display-1'>Quiz End</div>
                    <div className='display-4'>My oppinion: {remark}</div>
                    <div className='display-4'>Correct percentege: {this.state.score.toFixed(0)}%</div>
                    <div className='display-4'>Nr. of correct answers: {this.state.correctAnswers}</div>
                    <div className='display-4'>Nr. of questions: {this.state.numberOfQuestions}</div>
                    <div className='display-4'>Nr. of questions answered:{this.state.numberOfAnsweredQuestions}</div>
                    <section className='m-3'>
                    <Link to= '/'> 
                            <Button className='m-3' variant='success'>Take me Back</Button>
                        </Link>
                        <Link to= '/play/quiz'> 
                            <Button className='m-3' variant='info'>Play Again</Button>
                        </Link>
                    </section>
                </Container>

            )
        }else{
            stats=(
                <Fragment>
                    <div>No stats available</div>
                    <section>
                        <Link to= '/'> 
                            <Button variant='danger'>Take me Back</Button>
                        </Link>
                        <Link to= '/play/quiz'> 
                            <Button variant='danger'>Play Again</Button>
                        </Link>
                    </section>
                </Fragment>
            )
        }
        console.log(this.props.location.state)
        return(
            <Container>
                <Helmet>
                    <title>Quiz Summary</title>
                    <style>{`body { background-image: url(${back}); background-size:cover; }`}</style>
                </Helmet>
                
                {stats}
            </Container>
        )
    }
}

export default QuizzSummary