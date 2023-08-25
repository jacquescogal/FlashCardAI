import React, { useEffect, useState } from 'react'
import styles from './SidebarCards.module.scss'
import Button, { BUTTONTYPE } from '../Button/Button'
import { CARDFOCUSTYPE } from '../CardFocus/CardFocus'
function SidebarCards({cardData,setCardFocusType,setSelectedCard,deckSelected,onDeleteDeckClickHandler}) {
    const onClickAddHandler=()=>{
        setCardFocusType(CARDFOCUSTYPE.ADD)
    }

    const onClickEditHandler=(item)=>{
        setCardFocusType(CARDFOCUSTYPE.EDIT)
        setSelectedCard(item)
    }

    
  return (
    <div className={styles.SidebarCards}>
    <h2>PlaceHolder</h2>
    <h3>Cards</h3>
  <ul>
    <div className={styles.CardDeck}>
  {cardData.map(item => (
    <Button buttonType={BUTTONTYPE.ALT}  isActive={item.active} onClick={()=>{onClickEditHandler(item)}}>{item.term}</Button>
    ))}
    </div>
  <Button buttonType={BUTTONTYPE.GREEN} onClick={onClickAddHandler}>Add Card</Button>
  <Button buttonType={BUTTONTYPE.RED} onClick={()=>{onDeleteDeckClickHandler(deckSelected)}}>Delete Deck</Button>
  <Button buttonType={BUTTONTYPE.DOTTED}>Test</Button>
  </ul></div>
  )
}

export default SidebarCards