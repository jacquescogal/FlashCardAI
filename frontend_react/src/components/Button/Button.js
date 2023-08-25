import React, { useEffect, useRef } from 'react'
import styles from './Button.module.scss'

export const BUTTONTYPE = {
  NORMAL: 'normal',
  ALT: 'deck',
  DISABLED: 'disabled',
  DOTTED: 'dotted',
  RED: 'red',
  GREEN: 'green'
};

function Button({children, onClick,type,isTall=true, isActive,width='80%', buttonType=BUTTONTYPE.NORMAL}) {
  const styledButtonRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(()=>{
    if (styledButtonRef.current && buttonType===BUTTONTYPE.NORMAL) styledButtonRef.current.classList.add(styles.Enabled); 
    else if (styledButtonRef.current && buttonType===BUTTONTYPE.ALT) {
      styledButtonRef.current.classList.add(styles.Enabled); 
      styledButtonRef.current.classList.add(styles.Alt); 
    }
    else if (styledButtonRef.current && buttonType===BUTTONTYPE.DISABLED) styledButtonRef.current.classList.add(styles.Disabled);
    else if (styledButtonRef.current && buttonType===BUTTONTYPE.DOTTED) styledButtonRef.current.classList.add(styles.Dotted);
    else if (styledButtonRef.current && buttonType===BUTTONTYPE.RED) styledButtonRef.current.classList.add(styles.Red);
    else if (styledButtonRef.current && buttonType===BUTTONTYPE.GREEN) styledButtonRef.current.classList.add(styles.Green);
    if (styledButtonRef.current && isTall===true) styledButtonRef.current.classList.add(styles.Tall);
  },[])

  useEffect(()=>{
    if (styledButtonRef.current && isActive) styledButtonRef.current.classList.add(styles.Active);
    else if (styledButtonRef.current && !isActive)styledButtonRef.current.classList.remove(styles.Active);
  },[isActive])

  const onClickHandler=()=>{
    if (buttonRef.current) buttonRef.current.click();
  }
  return (
    <>
    <div ref={styledButtonRef}   className={`${styles.Button}`} style={{ width:width }} onClick={onClickHandler}>{children}</div>
    <button ref={buttonRef} type={type} className={styles.hiddenButton} onClick={onClick}/>
    </>
  )
}

export default Button