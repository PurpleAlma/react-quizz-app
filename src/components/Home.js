import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
import { GiAbstract013 } from "react-icons/gi";
import Container from 'react-bootstrap/Container'
import back from '../assets/images/back.jpg'


const Home=()=>(
    <Container className='home-container'>
        <Helmet>
            <style>{`body { background-image: url(${back}); background-size:cover; }`}</style>
            <title>Quiz-Home</title>
        </Helmet>
        <div className='text-center display-2'>QUIZZ APP</div>
        <div id='home'>
            <div className="border ">
                <div>
                    <span className='mdi mdi-cube-outline mdi-480px'></span>
                </div>
                <div className='display-1'><GiAbstract013/></div>
                <div className='display-2'>About Movies</div>
                <div className='p-1'>
                    <Link 
                        className='bg-success d-block p-3 m-1 rounded text-light display-1 play-button' 
                        to='/play/instructions'>Play</Link>
                </div>
                <div className='p-2'>
                    <Link 
                        className='m-1 p-2 text-light rounded bg-danger display-3 float-left login-button' 
                        to='/login'>Login</Link>
                    <Link 
                        className='m-1 p-2 text-light rounded bg-primary display-3 float-right register-button'  
                        to='/register'>register</Link>
                </div>
            </div>
        </div>
        <div className='text-center'>
            Credit to: 
                <a href='https://www.youtube.com/channel/UC9baFhLF3bCEPSZgje4k99A'>
                Uzoanya Dominic
                </a>
        </div>

    </Container>
    )

export default Home