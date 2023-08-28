import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import OptionHolder from '../../components/OptionHolder/OptionHolder';
import Button, { BUTTONTYPE } from '../../components/Button/Button';
import styles from './LandingPage.module.scss'
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate=useNavigate();

  return (
    <div>
        <header className="App-header Backdrop">
          <h1>FlashCard&nbsp;<span className={styles.TextPop}>AI: <br/>Supercharge Your Study Sessions</span></h1>
          <p className={styles.Description}> Grading your own understanding of flashcards can be 
          <span className={styles.TextRed}> subjective</span>  and 
          <span className={styles.TextRed}> draining</span>. 
          <br/> Introducing FlashCard AI: where <span className={styles.TextPop}> GPT-4 🤖</span>  takes on the role of your&nbsp;
          <span className={styles.TextPop}> personal grader</span> 
          &nbsp;and&nbsp;<span className={styles.TextPop}>mentor 🧑‍🏫</span>,<br/> providing you with an enhanced and objective learning experience.</p>
          <OptionHolder>
            <Button onClick={()=>{navigate('Home')}}>Guest Session</Button>
            <Button buttonType={BUTTONTYPE.DISABLED}>User Login</Button>
          </OptionHolder>
          <p className={styles.Disclaimer}>User login is not supported until AWS SES unverified emailing permissions are approved for authentication purposes. <br/> Guest session data is stored in localStorage which is sufficient except GPT-4 responses.
          <br/>GPT-4 responses are saved on AWS dynamoDB and are deleted 1 minute after client retrieves it.</p>
      </header>
    </div>
  )
}

export default LandingPage