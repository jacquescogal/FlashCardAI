import React, { useEffect, useState } from 'react'
import SidebarCards from '../SidebarCards/SidebarCards'
import CardFocus, { CARDFOCUSTYPE } from '../CardFocus/CardFocus'
import { v4 as uuidv4 } from 'uuid';
function CardSection({toggleFocus,focusBackdrop,cardBackdrop,deckSelected,onDeleteDeckClickHandler}) {
    const [cardData,setCardData]=useState([
    ]);
    const [cardFocusType,setCardFocusType]=useState(CARDFOCUSTYPE.DEFAULT);
    const [selectedCard,setSelectedCard]=useState({uuid:null,term:'',answer:'',active:false})

    useEffect(()=>{
        updateCards();
        setSelectedCard({uuid:null,term:'',answer:'',active:false});
        setCardFocusType(CARDFOCUSTYPE.DEFAULT);
    },[deckSelected])

    useEffect(()=>{
        const data=cardData;
        data.forEach(object=>{
            if (object.uuid==selectedCard.uuid) object.active=true;
            else object.active=false;
        })
        localStorage.setItem(deckSelected, JSON.stringify(data));
        updateCards();
    },[selectedCard])

    useEffect(()=>{
        const data=cardData;
        if (cardFocusType===CARDFOCUSTYPE.EDIT) return;
        data.forEach(object=>{
            object.active=false;
        })
        localStorage.setItem(deckSelected, JSON.stringify(data));
        updateCards();
    },[cardFocusType])


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
        localStorage.setItem(deckSelected, JSON.stringify(data));
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
        localStorage.setItem(deckSelected, JSON.stringify(data));
        updateCards();
    }

    const deletecard=({uuid})=>{
        let data=cardData;
        data=data.filter(card=>card.uuid!=uuid);
        if (data.length>0) {
            setSelectedCard(data[data.length-1]);
            data[data.length-1].active=true;
        }
        else {
            setSelectedCard({uuid:null,term:'',answer:'',active:false});
            setCardFocusType(CARDFOCUSTYPE.DEFAULT)
        }
        localStorage.setItem(deckSelected, JSON.stringify(data));
        updateCards();
    }

    const updateCards=()=>{
        const data=localStorage.getItem(deckSelected)
        if (data) {
          const parsedData = JSON.parse(data);
          setCardData(parsedData);
        } 
        else{
            setCardData([]);
        }
      }
  return (
    <div>
        <SidebarCards  cardBackdrop={cardBackdrop} cardData={cardData} setCardFocusType={setCardFocusType} setSelectedCard={setSelectedCard} deckSelected={deckSelected}  onDeleteDeckClickHandler={onDeleteDeckClickHandler}/>
        <CardFocus toggleFocus={toggleFocus} focusBackdrop={focusBackdrop} cardData={cardData} cardFocusType={cardFocusType} checkDuplicate={checkDuplicate} addCard={addCard} editCard={editCard} deletecard={deletecard} selectedCard={selectedCard} deckSelected={deckSelected}/>
    </div>
  )
}

export default CardSection