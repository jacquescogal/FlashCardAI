import React, { useState } from 'react'
import SidebarDeck from '../../components/SidebarDeck/SidebarDeck'
import SidebarCards from '../../components/SidebarCards/SidebarCards'
import CardSection from '../../components/CardSection/CardSection';

function Home() {
  const [deckSelected,setDeckSelected] = useState("");
  
  return (
    <div className='Backdrop'>
        
        <CardSection deckSelected={deckSelected}/>
        <SidebarDeck setDeckSelected={setDeckSelected}/>
    </div>
  )
}

export default Home