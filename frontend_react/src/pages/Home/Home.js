import React, { useEffect, useState } from 'react'
import SidebarDeck from '../../components/SidebarDeck/SidebarDeck'
import CardSection from '../../components/CardSection/CardSection';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Home() {
  const nav=useNavigate();
  const [deckSelected, setDeckSelected] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [deckData, setDeckData] = useState(
    [
    ]
  );

  const [deckBackdrop, setDeckBackdrop] = useState(false);
  const [cardBackdrop, setCardBackdrop] = useState(false);
  const [focusBackdrop, setFocusBackdrop] = useState(false);

  const toggleFocus = (setTo = false) => {
    if (deckBackdrop === true || cardBackdrop === true || setTo === true) {
      setDeckBackdrop(false);
      setCardBackdrop(false);
    }
    else {
      setDeckBackdrop(true);
      setCardBackdrop(true);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('username')===null && localStorage.getItem('isGuest')===null){
      nav('/')
    }
    else if (localStorage.getItem('username')!==null){
      loadFromDB();
    }
    else if (localStorage.getItem("isGuest")!=null){
      updateDeck();
    }
  }, [])

  const updateDeck = () => {
    saveToDB();
    const data = localStorage.getItem('deckData')
    if (data) {
      const parsedData = JSON.parse(data);
      parsedData.forEach(e => {
        e.active = false;
      })
      setDeckData(parsedData);
      setDeckSelected('');
    }
  }

  const addDeck = (name) => {
    const data = deckData;
    data.push({ deck_uuid: uuidv4(), deck_name: name.toLowerCase() });
    localStorage.setItem('deckData', JSON.stringify(data));
    updateDeck();
  }

  const checkDuplicate = (name) => {
    var toReturn = false;
    deckData.forEach(deck => {
      if (deck.deck_name.toLowerCase() === name.toLowerCase()) toReturn = true;
    })
    return toReturn;
  }

  const onNewDeckClickHandler = () => {
    setPopupOpen(true);
  }
  const onDeckClickHandler = (name) => {
    setDeckSelected(name);
    const data = deckData;
    data.forEach(object => {
      if (object.deck_name == name) object.active = true;
      else object.active = false;
    })
    setDeckData(data);
  }

  const onDeleteDeckClickHandler = (name) => {
    let data = deckData;
    data = data.filter(object => object.deck_name != name);
    localStorage.setItem('deckData', JSON.stringify(data));
    localStorage.removeItem(name);
    setDeckSelected('');
    updateDeck();
  }

  const saveToDB = async () => {
    // bulk operation
    // top: username:{}, decklist:[{deck_uuid:{},deckname:{},cardlist:[{card_uuid:{},term:{},answer:{}}]}}
    // to crud deck name, need username and deck_uuid
    // to crud card, need username, deck_uuid and card_uuid
    // 1st layer: 
    if (localStorage.getItem("isGuest")!=null) return;
    const saveData = { username: localStorage.getItem('username') }
    const deckData = JSON.parse(localStorage.getItem('deckData'))
    console.log(deckData);
    deckData.forEach(deck => {
      const cardData = JSON.parse(localStorage.getItem(deck.deck_name))
      console.log(cardData)
      deck.card_list = [];
      if (cardData !== null) {
        cardData.forEach(card => {
          deck.card_list.push({ card_uuid: card.uuid, card_term: card.term, card_answer: card.answer })
        })
      }
    })
    saveData.deck_list = deckData;
    const jsonString=JSON.stringify(saveData);
    const token = localStorage.getItem("token")
    console.log(jsonString);
    const response = await axios.post('https://api.flashcardai.app/save_data', {
        data: jsonString
    },{
        headers: {
            'Authorization': `Bearer ${token}`
          }
    });
    console.log(response.data);
  }

  const loadFromDB = async () => {
    if (localStorage.getItem("isGuest")!=null) return;
    const token = localStorage.getItem("token")
    try{
      const response = await axios.get(`https://api.flashcardai.app/load_data/${localStorage.getItem('username')}`, {
          headers: {
              'Authorization': `Bearer ${token}`
            }
      });
    
    const deckData=response.data.deck_list;
    if (deckData!==null && deckData!=undefined){
      deckData.forEach(deck=>{
        const deckName=deck.deck_name;
        const deckList=[];
        deck.card_list.forEach(card=>{
          deckList.push({term:card.card_term,answer:card.card_answer,uuid:card.card_uuid})
        })
        localStorage.setItem(deckName,JSON.stringify(deckList));
      })
      localStorage.setItem('deckData',JSON.stringify(deckData));
      deckData.forEach(e => {
        e.active = false;
      })
      setDeckData(deckData);}
    else setDeckData([]);
    setDeckSelected('');
    }
    catch{
      toast.error("Failed to load from DB. Use guest session instead.")
      nav('/')
    }

  }


  return (
    <div className='Backdrop'>
      <CardSection saveToDB={saveToDB} toggleFocus={toggleFocus} focusBackdrop={focusBackdrop} cardBackdrop={cardBackdrop} deckSelected={deckSelected} onDeleteDeckClickHandler={onDeleteDeckClickHandler} />
      <SidebarDeck deckBackdrop={deckBackdrop} checkDuplicate={checkDuplicate} addDeck={addDeck} updateDeck={updateDeck} deckData={deckData} onDeckClickHandler={onDeckClickHandler} onNewDeckClickHandler={onNewDeckClickHandler} popupOpen={popupOpen} setPopupOpen={setPopupOpen} />
    </div>
  )
}

export default Home