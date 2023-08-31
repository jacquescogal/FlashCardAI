import React, { useEffect, useRef, useState } from 'react'
import Button, { BUTTONTYPE } from '../Button/Button';
import styles from './Forms.module.scss'
import axios from 'axios';
import { toast } from 'react-toastify';
function CardAnsForm({ resetFocus,deckSelected, cardData, toggleFocus }) {
  const termRef = useRef(null);
  const attemptRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCard, setSelectedCard] = useState({ term: '', answer: '', attempt: '', feedback: '', score: null,processed:false});
  const [attempt, setAttempt] = useState('');
  const [attemptError, setAttemptError] = useState('');
  const [shuffledCards, setShuffledCards] = useState([]);
  const [buttonActive, setButtonActive] = useState(false);
  const [leftActive, setLeftActive] = useState(false);
  const [rightActive, setRightActive] = useState(false);
  const [finishActive, setFinishActive] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [fetchData, setFetchData] = useState(false);
  const [finishPage, setFinishPage] = useState(false);
  const [rightCount,setRightCount]=useState(0);
  const [wrongCount,setWrongCount]=useState(0);


  useEffect(() => {
    const shuffledArray = shuffleArray([...cardData]);
    setShuffledCards(shuffledArray);
    setSelectedCard({ ...shuffledArray[0], attempt: shuffledArray[0].attempt ? shuffledArray[0].attempt : '', feedback: shuffledArray[0].feedback ? shuffledArray[0].feedback : '', score: shuffledArray[0].score ? shuffledArray[0].score : null,processed:false});
    setSelectedIndex(0);
    toggleFocus();
  }, [])

  useEffect(() => {
    setAttempt(selectedCard.attempt ? selectedCard.attempt : '')
    setAttemptError('')
    setRightActive(false);
    setFeedback(selectedCard.feedback ? selectedCard.feedback : '')
  }, [selectedIndex])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index
      const j = Math.floor(Math.random() * (i + 1));

      // Swap elements at indices i and j
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const handleAttemptInputChange = (e) => {
    if (feedback !== '') return;
    setAttempt(e.target.value);
    if (e.target.value.length > 0) {
      setButtonActive(true);
      setRightActive(false);
    }
    else setButtonActive(false);
    setAttemptError('')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fetchData === false && buttonActive === true && feedback === '') setFetchData(true);
  };

  const handleAnswerKeyDown = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      event.preventDefault();
      if (buttonActive === true) handleSubmit(event);
      else if (rightActive === true) rightRef.current.click();
    }

  }

  const prevClickHandler = () => {
    if (selectedIndex <= 0 || fetchData === true) return;
    setSelectedCard(shuffledCards[selectedIndex - 1]);
    setSelectedIndex(selectedIndex - 1);
  }


  const nextClickHandler = () => {
    if (selectedIndex >= shuffledCards.length || fetchData === true || selectedCard.processed===false) return;
    setSelectedCard({ ...shuffledCards[selectedIndex + 1], attempt: shuffledCards[selectedIndex + 1].attempt ? shuffledCards[selectedIndex + 1].attempt : '', feedback: shuffledCards[selectedIndex + 1].feedback ? shuffledCards[selectedIndex + 1].feedback : '', score: shuffledCards[selectedIndex + 1].score ? shuffledCards[selectedIndex + 1].score : null, processed: shuffledCards[selectedIndex + 1].processed ? shuffledCards[selectedIndex + 1].processed : false });
    setSelectedIndex(selectedIndex + 1);
  }
  useEffect(() => {
    if (fetchData===true) return;
    let score = null;
    try {
      score = parseInt(feedback.match(/Score:\s*(\d+)/)[1], 10);
    } catch (e) {
      score = null;
    }
    if (score !== null && selectedCard.processed===false) {
      setSelectedCard(prevData => ({ ...prevData, attempt: attempt, feedback: feedback, score: score, processed:true }))
      const cards = shuffledCards;
      cards[selectedIndex] = { ...selectedCard, attempt: attempt, feedback: feedback, score: score,processed:true };
      if (score>=70) {
        setRightCount(count=>count+1);
        setShuffledCards(cards);
      }
      else {
        toast.error("Card re-added")
        setWrongCount(count=>count+1);
        setShuffledCards([...cards,{term: selectedCard.term, answer: selectedCard.answer, attempt: '', feedback: '', score: null}]);
      }
      
    }
  }, [feedback,fetchData])

  useEffect(() => {
    if (fetchData === true) {
      const eventSource = new EventSource(`https://api.flashcardai.app/check_answer?subject=${deckSelected}&term=${selectedCard.term}&answer=${selectedCard.answer}&attempt=${attempt}`)

      eventSource.onmessage = (event) => {
        if (event.data === "TERMINATE") {
          setFetchData(false);
          setRightActive(true);
          setButtonActive(false);
        }
        else if (event.data === "LIMIT") {
          toast.error("Shared pool daily quota reached (200/day). Come back again tomorrow.")
          setAttemptError("Shared pool daily quota reached (200/day). Come back again tomorrow.")
          setFetchData(false);
          setRightActive(true);
          setButtonActive(false);
        }
        else {
          setFeedback(prevData => `${prevData}${event.data}`.replace("|", "\n"));
        }
      };

      return () => {
        eventSource.close();
      };
    }

  }, [fetchData]);

  function convertToCSV(processedArray) {
    const objArray = []
    processedArray.forEach(element => {
      objArray.push({term:element.term,answer:element.answer,attempt:element.attempt,feedback:element.feedback.match(/Feedback:\s*(.+)/)[1],score:element.score})
    });
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // headers
    for (let index in objArray[0]) {
        if (str !== '') str += ',';
        str += `"${index}"`;
    }
    str += '\r\n';

    // data rows
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in array[i]) {
            if (line !== '') line += ',';
            line += `"${array[i][index]}"`;
        }
        str += line + '\r\n';
    }

    return str;
}
function downloadCSV(arrayOfObjects) {
  const csvContent = convertToCSV(arrayOfObjects);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'data.csv');
  document.body.appendChild(link);
  
  link.click();
  document.body.removeChild(link);
}

const handleExit=()=>{
  toggleFocus(true);
  resetFocus();
}

  return (
    <>
    <div className={styles.Backdrop}/>
      <h2 className={styles.Hide}>PlaceHolder</h2>
      {(finishPage === false) ? <h3 className={styles.TitleName}><span className={styles.Eval}>Evaluate:</span> <span>{deckSelected}</span> ({selectedIndex + 1} of {shuffledCards.length})</h3> :
        <h3 className={styles.TitleName}><span className={styles.Eval}>Summary:</span> <span>{deckSelected}</span></h3>}
      {(finishPage === false) ?

        <form onSubmit={handleSubmit} className={styles.CardAnsForm} onKeyDown={handleAnswerKeyDown}>
          <div className={styles.NameInputPair}>
            <label>
              Term:
            </label>
            <input readOnly
              ref={termRef}
              type="text"
              value={selectedCard?.term}
              style={{ flex: 1 }}
              className={styles.TermInput}
            />
          </div>

          <div className={styles.NameInputPair}>
            <label>
              Attempt:
            </label>
            <textarea maxLength="200"
              ref={attemptRef}
              type="text"
              value={attempt}
              onChange={handleAttemptInputChange}
              style={{ borderColor: attemptError ? 'red' : '', backgroundColor: feedback !== '' ? '#111e25' : '', color: feedback !== '' ? '#fdf9e3' : '' }}
              className={styles.AttemptInput}

            />
          </div>

          <div className={styles.NameInputPair}>
            <label>
              Answer:
            </label>
            <textarea readOnly 
              type="text"
              value={(selectedCard.processed===true || fetchData===true)?selectedCard?.answer:'hidden'}
              className={styles.AnsInput}
            />
          </div>

          <div className={styles.NameInputPair}>
            <label>
              Feedback:
            </label>
            <textarea readOnly
              type="text"
              value={feedback}
              className={styles.AnsInput}
            />
          </div>
          {attemptError && <div style={{ color: 'red', marginTop: '5px' }}>{attemptError}</div>}
          <div className={styles.ButtonLayout}>
            {selectedIndex > 0 ? <>
              <Button className={styles.LeftButton} buttonType={BUTTONTYPE.NORMAL} type="button" width='20%' isActive={leftActive} onClick={prevClickHandler}>{"<"}</Button>
            </> : <div></div>}
            <button ref={leftRef} style={{ display: 'none' }} onClick={prevClickHandler} />
            {(selectedIndex === shuffledCards.length - 1 && feedback !== '' && fetchData===false)?<Button buttonType={BUTTONTYPE.NORMAL} type="submit" width='80%' isActive={finishActive} onClick={() => { setFinishPage(true) }}>Finish</Button>:<Button buttonType={(buttonActive===true)?BUTTONTYPE.NORMAL:BUTTONTYPE.DISABLED} type="submit" width='80%' isActive={buttonActive} onClick={handleSubmit}>Check Attempt</Button>}
            <button ref={rightRef} style={{ display: 'none' }} onClick={nextClickHandler} />
            {selectedIndex < shuffledCards.length - 1 ? <Button className={styles.RightButton} buttonType={(selectedIndex >= shuffledCards.length || fetchData === true || selectedCard.processed===false)?BUTTONTYPE.DISABLED:BUTTONTYPE.NORMAL} type="button" width='20%' isActive={rightActive} onClick={nextClickHandler}>{">"}</Button> : <div></div>}
            <div></div>
          </div>
        </form>
        : <>
          <h3>Total Questions: {shuffledCards.length}</h3>
          <h3>Correct: {rightCount} ({(rightCount/shuffledCards.length*100).toFixed(2)}%)</h3>
          <h3>Wrong: {wrongCount} ({(wrongCount/shuffledCards.length*100).toFixed(2)}%)</h3>
          <div className={styles.FinishButtonGroup}>
          <Button style={{justifySelf:'centre'}} buttonType={BUTTONTYPE.NORMAL} type="button" width='50%' isActive={buttonActive} onClick={() => downloadCSV(shuffledCards)}>Download Attempt</Button>
          <Button style={{justifySelf:'centre'}} buttonType={BUTTONTYPE.RED} type="button" width='50%' isActive={buttonActive} onClick={handleExit}>Finish Review</Button>
          </div>
        </>}
    </>
  )
}

export default CardAnsForm