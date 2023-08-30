import React, { useEffect, useRef } from 'react'
import styles from './Button.module.scss'

export const BUTTONTYPE = {
  NORMAL: 'normal',
  HARDEDGE:'hardedge',
  ALT: 'deck',
  DISABLED: 'disabled',
  DOTTED: 'dotted',
  RED: 'red',
  GREEN: 'green',
  TEST: 'test'
};

function Button({children,style,className, onClick,type,isTall=true, isActive,width='80%', buttonType=BUTTONTYPE.NORMAL}) {
  const styledButtonRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(()=>{
    console.log(buttonType)
    if (styledButtonRef.current){
      styledButtonRef.current.classList.remove(styles.Enabled);
      styledButtonRef.current.classList.remove(styles.HardEdge);
      styledButtonRef.current.classList.remove(styles.Test);
      styledButtonRef.current.classList.remove(styles.Disabled);
      styledButtonRef.current.classList.remove(styles.Alt);
      styledButtonRef.current.classList.remove(styles.Dotted);
      styledButtonRef.current.classList.remove(styles.Red);
      styledButtonRef.current.classList.remove(styles.Green);
      switch (buttonType){
        case BUTTONTYPE.NORMAL:
          styledButtonRef.current.classList.add(styles.Enabled);
          break;
          case BUTTONTYPE.HARDEDGE:
            styledButtonRef.current.classList.add(styles.HardEdge);
            break;
        case BUTTONTYPE.ALT:
          styledButtonRef.current.classList.add(styles.Enabled); 
          styledButtonRef.current.classList.add(styles.Alt); 
          break;
        case BUTTONTYPE.DISABLED:
          styledButtonRef.current.classList.add(styles.Disabled);
          break;
        case BUTTONTYPE.DOTTED:
          styledButtonRef.current.classList.add(styles.Dotted);
          break;
        case BUTTONTYPE.RED: 
          styledButtonRef.current.classList.add(styles.Red);  
          break;
        case BUTTONTYPE.GREEN:
          styledButtonRef.current.classList.add(styles.Green);
          break;
        case BUTTONTYPE.TEST:
          styledButtonRef.current.classList.add(styles.Test);
          break;
        default:
          styledButtonRef.current.classList.add(styles.Enabled);
          break;
      }
    } 
    if (styledButtonRef.current && isTall===true) styledButtonRef.current.classList.add(styles.Tall);
  },[buttonType])

  useEffect(()=>{
    if (styledButtonRef.current && isActive) styledButtonRef.current.classList.add(styles.Active);
    else if (styledButtonRef.current && !isActive)styledButtonRef.current.classList.remove(styles.Active);
  },[isActive])

  const onClickHandler=()=>{
    if (buttonRef.current) buttonRef.current.click();
  }
  return (
    <div style={{ width:width,...style}} className={className}>
    <div ref={styledButtonRef}   className={`${styles.Button}`}  onClick={onClickHandler}>{children}</div>
    <button ref={buttonRef} type={type} className={styles.hiddenButton} onClick={onClick}/>
    </div>
  )
}

export default Button