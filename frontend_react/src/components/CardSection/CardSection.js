import React, { useEffect, useState } from 'react'
import SidebarCards from '../SidebarCards/SidebarCards'
import CardFocus, { CARDFOCUSTYPE } from '../CardFocus/CardFocus'
import { v4 as uuidv4 } from 'uuid';
function CardSection({deckSelected}) {
    const [cardData,setCardData]=useState([
        {uuid:uuidv4(),term:'hello',answer:'test',active:false},
        {uuid:uuidv4(),term:'hello',answer:'test',active:false}
    ]);
    const [cardFocusType,setCardFocusType]=useState(CARDFOCUSTYPE.DEFAULT);
    const [selectedCard,setSelectedCard]=useState({uuid:null,term:'',answer:'',active:false})

    useEffect(()=>{
        // localStorage.setItem('cardData', JSON.stringify([]));
        // updateCards();
    },[])


    const checkDuplicate=(term)=>{
        var answer=false;
        cardData.forEach(card=>{
            if (card.term===term) answer=true;
        })
        return answer;
    }

    const addCard=({term,answer})=>{
        const data=cardData;
        data.push({uuid:uuidv4(),term:term.toLowerCase(),answer:answer,active:false});
        localStorage.setItem('cardData', JSON.stringify(data));
        updateCards();
    }

    const editCard=({uuid,term,answer})=>{
        const data=cardData;
        data.forEach(card=>{
            if (card.uuid===uuid){
                card.term=term.toLowerCase();
                card.answer=answer;
            }
        })
        localStorage.setItem('cardData', JSON.stringify(data));
        updateCards();
    }

    const deletecard=({uuid})=>{
        let data=cardData;
        data=data.filter(card=>card.uuid!=uuid);
        localStorage.setItem('cardData', JSON.stringify(data));
        updateCards();
    }

    const updateCards=()=>{
        const data=localStorage.getItem('cardData')
        if (data) {
          const parsedData = JSON.parse(data);
          setCardData(parsedData);
        } 
      }
  return (
    <div>
        <SidebarCards cardData={cardData} setCardFocusType={setCardFocusType} setSelectedCard={setSelectedCard}/>
        <CardFocus cardFocusType={cardFocusType} checkDuplicate={checkDuplicate} addCard={addCard} editCard={editCard} deletecard={deletecard} selectedCard={selectedCard}/>
    </div>
  )
}

export default CardSection