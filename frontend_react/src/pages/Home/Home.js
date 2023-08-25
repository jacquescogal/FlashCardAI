import React, { useEffect, useState } from 'react'
import SidebarDeck from '../../components/SidebarDeck/SidebarDeck'
import SidebarCards from '../../components/SidebarCards/SidebarCards'
import CardSection from '../../components/CardSection/CardSection';

function Home() {
  const [deckSelected,setDeckSelected] = useState("");
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
    const data=deckData;
    data.forEach(object=>{
      if (object.name==name)object.active=true;
      else object.active=false;
    })
    setDeckData(data);
  }

  const onDeleteDeckClickHandler=(name)=>{
    let data=deckData;
    data=data.filter(object=>object.name!=name);
    localStorage.setItem('deckData', JSON.stringify(data));
    localStorage.removeItem(name);
    setDeckSelected('');
    updateDeck();
  }
  return (
    <div className='Backdrop'>
        <CardSection deckSelected={deckSelected} onDeleteDeckClickHandler={onDeleteDeckClickHandler}/>
        <SidebarDeck  checkDuplicate={checkDuplicate} addDeck={addDeck} updateDeck={updateDeck} deckData={deckData} onDeckClickHandler={onDeckClickHandler} onNewDeckClickHandler={onNewDeckClickHandler} popupOpen={popupOpen} setPopupOpen={setPopupOpen}/>
    </div>
  )
}

export default Home