import React, { useEffect, useRef, useState } from 'react'
import styles from './Forms.module.scss'
import Button, { BUTTONTYPE } from '../Button/Button';
import { toast } from 'react-toastify';
function CardEditForm({checkDuplicate,editCard,selectedCard,deletecard}) {
    const termRef=useRef(null);
    const uuid=selectedCard.uuid;
    const [oldTerm,setOldTerm]=useState('');
    const [term, setTerm] = useState(selectedCard.term);
    const [termError, setTermError] = useState(''); 
    const [answer, setAnswer] = useState(selectedCard.answer);
    const [ansError, setAnsError] = useState(''); 
    const [buttonActive,setButtonActive]=useState(false);

    useEffect(()=>{
        if (termRef && termRef.current) termRef.current.focus();
    },[termRef])

    useEffect(()=>{
        setOldTerm(selectedCard.term);
        setTerm(selectedCard.term);
        setAnswer(selectedCard.answer);
        setAnsError('');
        setTermError('');setButtonActive(false);
        if (termRef && termRef.current) termRef.current.focus();
    },[selectedCard])

    const handleTermInputChange = (e) => {
        setTerm(e.target.value);
        if (e.target.value.length>2 && answer.length>0) setButtonActive(true);
        else setButtonActive(false);
        setTermError(''); 
    };

    const handleAnsInputChange = (e) => {
        setAnswer(e.target.value);
        if (term.length>2 && e.target.value.length>0) setButtonActive(true);
        else setButtonActive(false);
        setAnsError(''); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (term.length <3) { // Validation check
            setTermError('Term must be 3 at least characters long.');
            return;
        }
        else if (checkDuplicate(term)===true && term!==oldTerm){
            console.log(oldTerm)
            setTermError('Term must be unique');
            return;
        }
        else if(answer.length<1){
            setAnsError('Answer must not be empty');
            return;
        }
        setOldTerm(term);
        editCard({uuid,term,answer});
        toast.success("Card updated")
    };

    const handleAnswerKeyDown = (event)=>{
        if (event.keyCode===13 && !event.shiftKey){
            event.preventDefault();
            handleSubmit(event);
        }
    }

  return (
    <>
        <h2 className={styles.Hide}>PlaceHolder</h2>
        <h3 className={styles.TitleName}>Edit Card</h3>
        <form onSubmit={handleSubmit} className={styles.CardAddForm}>
            <div className={styles.NameInputPair}>
            <label>
            Term:
            </label>
            <input maxLength="200"
            ref={termRef}
            type="text" 
            value={term} 
            onChange={handleTermInputChange}
            style={{ flex: 1, borderColor: termError ? 'red' : '' }}
            className={styles.TermInput}
            />
            </div>

            <div className={styles.NameInputPair}>
            <label>
            Answer:
            </label>
            <textarea maxLength="200"
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
            <Button buttonType={BUTTONTYPE.NORMAL} type="submit" width='20%' isActive={buttonActive}>Update Card</Button>
            <Button buttonType={BUTTONTYPE.RED} type="button" width='20%' onClick={()=>{deletecard({uuid})}}>Delete Card</Button>
        </form>
        </>
  )
}

export default CardEditForm