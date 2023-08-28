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
function CardFocus({toggleFocus,focusBackdrop, cardData,cardFocusType,checkDuplicate,addCard,editCard,selectedCard,deletecard,deckSelected}) {
  return (
    <div className={styles.CardFocus}>
      {(focusBackdrop)?<div className={styles.GlassBackdrop}/>:<></>}
      {cardFocusType===CARDFOCUSTYPE.DEFAULT && <div className={styles.DefaultText}>Add, Edit, Remove or review cards here</div>}
        {cardFocusType===CARDFOCUSTYPE.EDIT && <CardEditForm checkDuplicate={checkDuplicate} editCard={editCard} selectedCard={selectedCard} deletecard={deletecard}/>}
        {cardFocusType===CARDFOCUSTYPE.ANSWER && <CardAnsForm deckSelected={deckSelected} cardData={cardData} toggleFocus={toggleFocus}/>}
        {cardFocusType===CARDFOCUSTYPE.ADD && <CardAddForm checkDuplicate={checkDuplicate} addCard={addCard}/>}
    </div>
  )
}

export default CardFocus