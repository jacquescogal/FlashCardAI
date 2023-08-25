import React, { useState } from 'react'
import styles from './Forms.module.scss'
import Button from '../Button/Button';
function CardAddForm({checkDuplicate,addCard}) {
    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(''); 
    const [answer, setAnswer] = useState('');
    const [ansError, setAnsError] = useState(''); 
    const handleTermInputChange = (e) => {
        setTerm(e.target.value);
        setTermError(''); 
    };

    const handleAnsInputChange = (e) => {
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
    };
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
            <textarea 
            type="text" 
            value={answer} 
            onChange={handleAnsInputChange}
            style={{ borderColor: ansError ? 'red' : '' }}
            className={styles.AnsInput}
            />
            </div>

            {termError && <div style={{ color: 'red', marginTop: '5px' }}>{termError}</div>}
            {ansError && <div style={{ color: 'red', marginTop: '5px' }}>{ansError}</div>}
            <Button type="submit" width='20%'>Add</Button>
        </form>
        </>
  )
}

export default CardAddForm