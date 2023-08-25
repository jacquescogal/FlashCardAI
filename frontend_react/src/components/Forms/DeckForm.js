import React, { useState } from 'react'
import Button from '../Button/Button';
import styles from './Forms.module.scss'
function DeckForm({addDeck, checkDuplicate, updateDeck,setPopupOpen}) {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(''); // New nameError state

    const handleInputChange = (e) => {
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
        updateDeck();
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
                    type="text" 
                    value={name} 
                    onChange={handleInputChange}
                    style={{ flex: 1, borderColor: nameError ? 'red' : '' }}
                />
            </div>
            {nameError && <div style={{ color: 'red', marginTop: '5px' }}>{nameError}</div>}
            <Button type="submit">Submit</Button>
        </form>
        </>
    );
}

export default DeckForm