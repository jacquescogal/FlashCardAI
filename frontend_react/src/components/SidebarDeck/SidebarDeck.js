import React, {  useState } from 'react'
import styles from './SidebarDeck.module.scss'
import Button,{BUTTONTYPE} from '../Button/Button'
import Popup from '../Popup/Popup';
import DeckForm from '../Forms/DeckForm';
import logoImage from '../../media/logo.png'
import { useNavigate } from 'react-router-dom';
function SidebarDeck({deckBackdrop,checkDuplicate, addDeck, updateDeck, deckData=[], onDeckClickHandler, onNewDeckClickHandler, setPopupOpen, popupOpen}) {
  const navigate=useNavigate();
  return (
    <>
    {(deckBackdrop===true)?<div className={styles.GlassBackdrop}></div>:<></>}
    {(popupOpen===true)?<Popup setPopupOpen={setPopupOpen}><DeckForm checkDuplicate={checkDuplicate} addDeck={addDeck} updateDeck={updateDeck} setPopupOpen={setPopupOpen}/></Popup>:null}
    <div className={styles.SidebarDeck}>
    <img src={logoImage} className={styles.LogoImage} alt="Logo" />
        <h2>FlashCard <span>AI</span></h2>
        <h3>Decks</h3>
        <h3 className={styles.Greet}>Hello {(localStorage.getItem('username')!==null)?localStorage.getItem('username'):"guest"}</h3>
      <ul>
        
        {deckData.map(item => (
        <Button buttonType={BUTTONTYPE.ALT} onClick={()=>{onDeckClickHandler(item.deck_name)}} isActive={item.active}>{item.deck_name}</Button>
      ))}
      {Array.from({ length: 5-deckData.length }).map((_, index) => (
        <Button buttonType={BUTTONTYPE.DOTTED} onClick={onNewDeckClickHandler}>+ New Deck</Button>
      ))}
      <Button buttonType={BUTTONTYPE.RED} onClick={()=>{navigate('/')}}>Logout</Button>
      </ul>
      
      
    </div>
    </>
  )
}

export default SidebarDeck