import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import OptionHolder from '../../components/OptionHolder/OptionHolder';
import Button, { BUTTONTYPE } from '../../components/Button/Button';
import styles from './LandingPage.module.scss'
import { useNavigate } from 'react-router-dom';
import logoImage from '../../media/logo.png'
import Popup from '../../components/Popup/Popup';
import LoginForm from '../../components/Forms/LoginForm';
import RegisterForm from '../../components/Forms/RegisterForm';

function LandingPage({ setLogoLoad }) {
  const navigate = useNavigate();
  const [showPopup, setshowPopup] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  useEffect(() => {
    localStorage.clear()
  }, [])
  return (
    <div>

      {(showPopup) && <Popup setPopupOpen={setshowPopup}>
        {(showLogin) ? <LoginForm setLogoLoad={setLogoLoad} setShowLogin={setShowLogin} /> : <RegisterForm setLogoLoad={setLogoLoad} setShowLogin={setShowLogin} />}
      </Popup>}

      <header className="App-header Backdrop">
        <div class="background">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className="GlassCase">
          <img src={logoImage} className={styles.LogoImage} alt="Logo" />
          <h1 className={styles.AppName}>FlashCard&nbsp;<span className={styles.TextPop}>AI: <br />Supercharge Your Study Sessions</span></h1>
          <p className={styles.Description}> Grading your own understanding of flashcards can be
            <span className={styles.TextRed}> subjective</span>  and
            <span className={styles.TextRed}> draining</span>.
            <br /> Introducing FlashCard AI: where <span className={styles.TextPop}> GPT-4 🤖</span>  takes on the role of your&nbsp;
            <span className={styles.TextPop}> personal grader</span>
            &nbsp;and&nbsp;<span className={styles.TextPop}>mentor 🧑‍🏫</span>,<br /> providing you with an enhanced and objective learning experience.</p>
          <OptionHolder>
            <Button onClick={() => { localStorage.setItem('isGuest', true); navigate('Home') }} style={{ width: '50%' }}>Guest Session</Button>
            <Button buttonType={BUTTONTYPE.NORMAL} style={{ width: '50%' }} onClick={() => { setshowPopup(true); setShowLogin(true) }}>Login/Register</Button>
          </OptionHolder>
          <p className={styles.Disclaimer}>  Note:
            <br /> Please do not enter private information.<br /> This is a solo project completed in 1 week made for the purpose of learning and not a commercial product. Not optimized for mobile. 
            <br /> Awaiting AWS SES approval for email auth and password reset functionality.
            <br /> Daily gpt-4 shared api token quota of 200 calls to prevent abuse.
            <br /> My github: <a href="https://github.com/jacquescogal" className={styles.Link}>github.com/jacquescogal</a> || Portfolio: <a href="https://jacquescogal.github.io/" className={styles.Link}>jacquescogal.github.io</a>
            || LinkedIn: <a href="https://www.linkedin.com/in/j-cogal" className={styles.Link}>linkedin.com/in/j-cogal</a>
          </p>
        </div>
      </header>


    </div>
  )
}

export default LandingPage