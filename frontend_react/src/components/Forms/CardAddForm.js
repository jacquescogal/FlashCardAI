import React, {  useEffect, useRef, useState } from 'react'
import styles from './Forms.module.scss'
import Button from '../Button/Button';
function CardAddForm({checkDuplicate,addCard}) {
    const termRef=useRef(null);
    const answerRef=useRef(null)
    const [buttonActive,setButtonActive]=useState(false);
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(''); 
    const [answer, setAnswer] = useState('');
    const [ansError, setAnsError] = useState(''); 

    useEffect(()=>{
        if (termRef && termRef.current) termRef.current.focus();
    },[termRef])

    const handleTermInputChange = (e) => {
        if (term.length>2 && answer.length>0) setButtonActive(true);
        else setButtonActive(false);
        setTerm(e.target.value);
        setTermError(''); 
    };

    const handleAnsInputChange = (e) => {
        if (term.length>2 && answer.length>0) setButtonActive(true);
        else setButtonActive(false);
        setAnswer(e.target.value);
        setAnsError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.length <3) { // Validation check
            setTermError('Term must be 3 at least characters long.');
            return;
        }
        else if (checkDuplicate(term)===true){
            setTermError('Term must be unique');
            return;
        }
        else if(answer.length<1){
            setAnsError('Answer must not be empty');
            return;
        }
        addCard({term,answer});
        termRef.current.focus()
        setTerm('');
        setTermError(''); 
        setAnswer('');
        setAnsError(''); 
        setButtonActive(false)
    };

    const handleTermKeyDown = (event)=>{
        if (event.keyCode===13 && answer===''){
            event.preventDefault();
            answerRef.current.focus()
        }
    }

    const handleAnswerKeyDown = (event)=>{
        if (event.keyCode===13 && !event.shiftKey){
            event.preventDefault();
            handleSubmit(event);
            termRef.current.focus()
        }
    }
  return (
    <>
        <h2 className={styles.Hide}>PlaceHolder</h2>
        <h3 className={styles.TitleName}>Add Card</h3>
        <form onSubmit={handleSubmit} className={styles.CardAddForm}>
            <div className={styles.NameInputPair}>
            <label>
            Term:
            </label>
            <input 
            ref={termRef}
            type="text" 
            value={term} 
            onChange={handleTermInputChange}
            style={{ flex: 1, borderColor: termError ? 'red' : '' }}
            className={styles.TermInput}
            onKeyDown={handleTermKeyDown}
            />
            </div>

            <div className={styles.NameInputPair}>
            <label>
            Answer:
            </label>
            <textarea 
            ref={answerRef}
            type="text" 
            value={answer} 
            onChange={handleAnsInputChange}
            style={{ borderColor: ansError ? 'red' : '' }}
            className={styles.AnsInput}
            onKeyDown={handleAnswerKeyDown}
            />
            </div>

            {termError && <div style={{ color: 'red', marginTop: '5px' }}>{termError}</div>}
            {ansError && <div style={{ color: 'red', marginTop: '5px' }}>{ansError}</div>}
            <Button  type="submit" width='20%' isActive={buttonActive} >Add</Button>
        </form>
        </>
  )
}

export default CardAddForm