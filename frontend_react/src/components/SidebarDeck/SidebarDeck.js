import React from 'react'
import styles from './SidebarDeck.module.scss'
import Button,{BUTTONTYPE} from '../Button/Button'
function SidebarDeck() {
    const deckData=[]
  return (
    <div className={styles.SidebarDeck}>
        <h2>FlashCard <span>AI</span></h2>
      <ul>
        <Button type={BUTTONTYPE.DOTTED}>+ New Deck</Button>
      </ul>
    </div>
  )
}

export default SidebarDeck