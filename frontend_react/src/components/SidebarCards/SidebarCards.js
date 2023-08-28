import React, { useEffect, useState } from 'react'
import styles from './SidebarCards.module.scss'
import Button, { BUTTONTYPE } from '../Button/Button'
import { CARDFOCUSTYPE } from '../CardFocus/CardFocus'
function SidebarCards({ cardBackdrop, cardData, setCardFocusType, setSelectedCard, deckSelected, onDeleteDeckClickHandler }) {
  const onClickAddHandler = () => {
    setCardFocusType(CARDFOCUSTYPE.ADD)
  }

  const onClickEditHandler = (item) => {
    setCardFocusType(CARDFOCUSTYPE.EDIT)
    setSelectedCard(item)
  }

  const onClickTestHandler = () => {
    setCardFocusType(CARDFOCUSTYPE.ANSWER)
  }


  return (
    <>
    <div className={styles.DefaultText}>Select a deck</div>
    {deckSelected!==''&&<div className={styles.SidebarCards}>
      {(cardBackdrop) ? <div className={styles.GlassBackdrop} /> : <></>}
      <h2>PlaceHolder</h2>
      <h3>Cards</h3>
      <ul>
        <div className={styles.CardDeck}>
          {(cardData && cardData.length<1?<h4>Add First Card Below</h4>:<></>)}
          {cardData.map(item => (
            <Button buttonType={BUTTONTYPE.ALT} isActive={item.active} onClick={() => { onClickEditHandler(item) }}>{item.term}</Button>
          ))}
        </div>
        <Button buttonType={BUTTONTYPE.GREEN} onClick={onClickAddHandler}>Add Card</Button>
        <Button buttonType={BUTTONTYPE.RED} onClick={() => { onDeleteDeckClickHandler(deckSelected); setCardFocusType(CARDFOCUSTYPE.DEFAULT) }}>Delete Deck</Button>
        <Button buttonType={(cardData && cardData.length>0)?BUTTONTYPE.TEST:BUTTONTYPE.DISABLED} onClick={onClickTestHandler}>Review</Button>
      </ul></div>}
      </>
  )
}

export default SidebarCards