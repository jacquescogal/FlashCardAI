import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import OptionHolder from '../../components/OptionHolder/OptionHolder';
import Button, { BUTTONTYPE } from '../../components/Button/Button';
import styles from './LandingPage.module.scss'
import { useNavigate } from 'react-router-dom';
import logoImage from '../../media/logo.png'
import Popup from '../../components/Popup/Popup';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';

function LandingPage({setLogoLoad}) {
  const navigate=useNavigate();
  const [showPopup,setshowPopup]=useState(false);
  const [showLogin,setShowLogin]=useState(true);
  useEffect(()=>{
    localStorage.clear()
  },[])
  return (
    <div>
      {(showPopup) && <Popup setPopupOpen={setshowPopup}>
        {(showLogin)?<LoginForm  setLogoLoad={setLogoLoad} setShowLogin={setShowLogin}/>:<RegisterForm setLogoLoad={setLogoLoad} setShowLogin={setShowLogin}/>}
      </Popup>}
        <header className="App-header Backdrop">
        <img src={logoImage} className={styles.LogoImage} alt="Logo" />
          <h1 className={styles.AppName}>FlashCard&nbsp;<span className={styles.TextPop}>AI: <br/>Supercharge Your Study Sessions</span></h1>
          <p className={styles.Description}> Grading your own understanding of flashcards can be 
          <span className={styles.TextRed}> subjective</span>  and 
          <span className={styles.TextRed}> draining</span>. 
          <br/> Introducing FlashCard AI: where <span className={styles.TextPop}> GPT-4 🤖</span>  takes on the role of your&nbsp;
          <span className={styles.TextPop}> personal grader</span> 
          &nbsp;and&nbsp;<span className={styles.TextPop}>mentor 🧑‍🏫</span>,<br/> providing you with an enhanced and objective learning experience.</p>
          <OptionHolder>
            <Button onClick={()=>{localStorage.setItem('isGuest',true);navigate('Home')}} style={{width:'100%'}}>Guest Session</Button>
            <Button buttonType={BUTTONTYPE.NORMAL} style={{width:'100%'}} onClick={()=>{setshowPopup(true);setShowLogin(true)}}>Login/Register</Button>
          </OptionHolder>
          <p className={styles.Disclaimer}>  Note:<br/>*Awaiting AWS SES approval for email auth and password reset. 
          <br/> *Daily gpt-4 api quota put in place of 200 calls to prevent abuse.
          <br/> *This is a solo student project and not a commercial product. Do not enter private information.
          </p>
      </header>
      
    </div>
  )
}

export default LandingPage