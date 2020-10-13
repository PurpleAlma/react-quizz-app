import React, { Fragment } from 'react'
import { Helmet } from 'react-helmet'
import {Link} from 'react-router-dom'
import { GiAbstract013 } from "react-icons/gi";


const Home=()=>(
    <Fragment>
        <Helmet><title>Quiz-Home</title></Helmet>
        <div id='home'>
            <section className="border ">
                <div>
                    <span className='mdi mdi-cube-outline mdi-480px'></span>
                </div>
                <div className='display-1'><GiAbstract013/></div>
                <div className='display-1'>Quiz App</div>
                <div className='p-1'>
                    <Link 
                        className='bg-success d-block p-3 m-1 rounded text-light display-1 play-button' 
                        to='/play/instructions'>Play</Link>
                </div>
                <div className='p-2'>
                    <Link 
                        className='m-1 p-2 text-light rounded bg-danger login-button display-3 float-left' 
                        to='/login'>Login</Link>
                    <Link 
                        className='m-1 p-2 text-light rounded bg-primary display-3 float-right register-button'  
                        to='/register'>register</Link>
                </div>
            </section>
        </div>

    </Fragment>
    )

export default Home