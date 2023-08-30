import React from 'react'
import styles from './CardFocus.module.scss'
import CardAnsForm from '../Forms/CardAnsForm'
import CardAddForm from '../Forms/CardAddForm'
import CardEditForm from '../Forms/CardEditForm'
export const CARDFOCUSTYPE={
    DEFAULT:"default",
    EDIT:"edit",
    ANSWER:"answer",
    ADD:"add"
}
function CardFocus({toggleFocus,focusBackdrop, cardData,cardFocusType,setCardFocusType,checkDuplicate,addCard,editCard,selectedCard,deletecard,deckSelected}) {
  const resetFocus=()=>{
    setCardFocusType(CARDFOCUSTYPE.DEFAULT);
  }
  return (
    <div className={styles.CardFocus}>
      {(focusBackdrop)?<div className={styles.GlassBackdrop}/>:<></>}
      {cardFocusType===CARDFOCUSTYPE.DEFAULT && <div className={styles.DefaultText}>Add, Edit, Remove or review cards here</div>}
        {cardFocusType===CARDFOCUSTYPE.EDIT && <CardEditForm resetFocus={resetFocus} checkDuplicate={checkDuplicate} editCard={editCard} selectedCard={selectedCard} deletecard={deletecard}/>}
        {cardFocusType===CARDFOCUSTYPE.ANSWER && <CardAnsForm resetFocus={resetFocus} deckSelected={deckSelected} cardData={cardData} toggleFocus={toggleFocus}/>}
        {cardFocusType===CARDFOCUSTYPE.ADD && <CardAddForm resetFocus={resetFocus} checkDuplicate={checkDuplicate} addCard={addCard}/>}
    </div>
  )
}

export default CardFocus