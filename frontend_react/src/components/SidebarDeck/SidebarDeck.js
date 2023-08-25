import React, { useEffect, useState } from 'react'
import styles from './SidebarDeck.module.scss'
import Button,{BUTTONTYPE} from '../Button/Button'
import Popup from '../Popup/Popup';
import DeckForm from '../Forms/DeckForm';
function SidebarDeck({setDeckSelected}) {
  const [popupOpen,setPopupOpen]=useState(false); 
  const [deckData,setDeckData]=useState(
    [
      {name:'hello',
    active:false}
    ]
  );

  useEffect(()=>{
    updateDeck();
  },[])

  const updateDeck=()=>{
    const data=localStorage.getItem('deckData')
    if (data) {
      const parsedData = JSON.parse(data);
      setDeckData(parsedData);
    } 
  }

  const addDeck=(name)=>{
    const data=deckData;
    data.push({name:name.toLowerCase()});
    localStorage.setItem('deckData', JSON.stringify(data));
  }

  const checkDuplicate=(name)=>{
    var toReturn=false;
    deckData.forEach(deck=>{
      if (deck.name.toLowerCase()===name.toLowerCase()) toReturn=true;
    })
    return toReturn;
  }
  
  const onNewDeckClickHandler=()=>{
    setPopupOpen(true);
  }
  const onDeckClickHandler=(name)=>{
    setDeckSelected(name);
    const test=deckData;
    test.forEach(object=>{
      if (object.name==name)object.active=true;
      else object.active=false;
    })
    console.log(test)
    setDeckData(test);
  }
  return (
    <>
    
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