import React, { useEffect, useRef, useState } from 'react'
import Button, { BUTTONTYPE } from '../Button/Button';
import styles from './Forms.module.scss'
function DeckForm({addDeck, checkDuplicate, updateDeck,setPopupOpen}) {
    const inputRef=useRef(null);
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(''); // New nameError state
    const [buttonActive,setButtonActive] = useState(false);

    useEffect(()=>{
        if (inputRef) inputRef.current.focus();
    },[])

    const handleInputChange = (e) => {
        if (e.target.value.length >=4 && checkDuplicate(e.target.value)===false) { // Validation check
            setButtonActive(true);
        }
        else setButtonActive(false);
        setName(e.target.value);
        setNameError(''); // Clear nameError on input change
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.length <4) { // Validation check
            setNameError('Name must be 4 characters long.');
            return;
        }
        else if (checkDuplicate(name)===true){
            setNameError('Name must be unique');
            return;
        }
        addDeck(name);
        setPopupOpen(false);
    };

    return (
        <>
        <h2>Create Deck</h2>
        <form onSubmit={handleSubmit} className={styles.DeckForm}>
            <div className={styles.NameInputPair}>
                <label>
                    Name:
                </label>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={name} 
                    onChange={handleInputChange}
                    style={{ flex: 1, borderColor: nameError ? 'red' : '' }}
                />
            </div>
            {nameError && <div style={{ color: 'red', marginTop: '5px' }}>{nameError}</div>}
            <Button buttonType={(buttonActive===true)?BUTTONTYPE.GREEN:BUTTONTYPE.DISABLED} style={{justifySelf:'centre', width:'80%'}} type="submit" isActive={buttonActive} >Submit</Button>
        </form>
        </>
    );
}

export default DeckForm