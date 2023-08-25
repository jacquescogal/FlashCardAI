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
function CardFocus({cardFocusType,checkDuplicate,addCard,editCard,selectedCard,deletecard}) {
  return (
    <div className={styles.CardFocus}>
        {cardFocusType===CARDFOCUSTYPE.EDIT && <CardEditForm checkDuplicate={checkDuplicate} editCard={editCard} selectedCard={selectedCard} deletecard={deletecard}/>}
        {cardFocusType===CARDFOCUSTYPE.ANSWER && <CardAnsForm/>}
        {cardFocusType===CARDFOCUSTYPE.ADD && <CardAddForm checkDuplicate={checkDuplicate} addCard={addCard}/>}
    </div>
  )
}

export default CardFocus