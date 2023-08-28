import React, {  useState } from 'react'
import styles from './SidebarDeck.module.scss'
import Button,{BUTTONTYPE} from '../Button/Button'
import Popup from '../Popup/Popup';
import DeckForm from '../Forms/DeckForm';
function SidebarDeck({deckBackdrop,checkDuplicate, addDeck, updateDeck, deckData=[], onDeckClickHandler, onNewDeckClickHandler, setPopupOpen, popupOpen}) {
  return (
    <>
    {(deckBackdrop===true)?<div className={styles.GlassBackdrop}></div>:<></>}
    {(popupOpen===true)?<Popup setPopupOpen={setPopupOpen}><DeckForm checkDuplicate={checkDuplicate} addDeck={addDeck} updateDeck={updateDeck} setPopupOpen={setPopupOpen}/></Popup>:null}
    <div className={styles.SidebarDeck}>
      
        <h2>FlashCard <span>AI</span></h2>
        <h3>Decks</h3>
      <ul>
        
        {deckData.map(item => (
        <Button buttonType={BUTTONTYPE.ALT} onClick={()=>{onDeckClickHandler(item.name)}} isActive={item.active}>{item.name}</Button>
      ))}
      {Array.from({ length: 5-deckData.length }).map((_, index) => (
        <Button buttonType={BUTTONTYPE.DOTTED} onClick={onNewDeckClickHandler}>+ New Deck</Button>
      ))}
      </ul>
      
    </div>
    </>
  )
}

export default SidebarDeck