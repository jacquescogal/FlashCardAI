import React, { useEffect, useState } from 'react'
import SidebarCards from '../SidebarCards/SidebarCards'
import CardFocus, { CARDFOCUSTYPE } from '../CardFocus/CardFocus'
import { v4 as uuidv4 } from 'uuid';
import style from './CardSection.module.scss'
function CardSection({saveToDB,toggleFocus,focusBackdrop,cardBackdrop,deckSelected,onDeleteDeckClickHandler}) {
    const [cardData,setCardData]=useState([
    ]);
    const [cardFocusType,setCardFocusType]=useState(CARDFOCUSTYPE.DEFAULT);
    const [selectedCard,setSelectedCard]=useState({uuid:null,term:'',answer:'',active:false})
    const [outsideFocus,setOutsideFocus]=useState(false);

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
            if (card.term.toLowerCase().trim()===term.toLowerCase().trim()) answer=true;
        })
        return answer;
    }

    const addCard=({term,answer})=>{
        const data=cardData;
        data.push({uuid:uuidv4(),term:term.toLowerCase(),answer:answer,active:false});
        localStorage.setItem(deckSelected, JSON.stringify(data));
        updateCards();
        saveToDB();
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
        saveToDB();
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
        saveToDB();
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


      const handleExit=()=>{
        toggleFocus(true);
        setCardFocusType(CARDFOCUSTYPE.DEFAULT);
        setOutsideFocus(false);
      }

      
      
  return (
    <div>

        {outsideFocus && <div className={style.OutsideFocus} onClick={handleExit}/>}
        <SidebarCards setOutsideFocus={setOutsideFocus}  cardBackdrop={cardBackdrop} cardData={cardData} setCardFocusType={setCardFocusType} setSelectedCard={setSelectedCard} deckSelected={deckSelected}  onDeleteDeckClickHandler={onDeleteDeckClickHandler}/>
        <CardFocus toggleFocus={toggleFocus} focusBackdrop={focusBackdrop} cardData={cardData} cardFocusType={cardFocusType} setCardFocusType={setCardFocusType} checkDuplicate={checkDuplicate} addCard={addCard} editCard={editCard} deletecard={deletecard} selectedCard={selectedCard} deckSelected={deckSelected}/>
    </div>
  )
}

export default CardSection