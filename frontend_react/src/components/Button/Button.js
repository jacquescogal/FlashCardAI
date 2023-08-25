import React, { useEffect, useRef } from 'react'
import styles from './Button.module.scss'

export const BUTTONTYPE = {
  NORMAL: 'normal',
  DISABLED: 'disabled',
  DOTTED: 'dotted',
};

function Button({children, onClick,  type=BUTTONTYPE.NORMAL}) {
  const buttonRef = useRef(null);
  useEffect(()=>{
    if (buttonRef.current && type===BUTTONTYPE.NORMAL) buttonRef.current.classList.add(styles.Enabled); 
    else if (buttonRef.current && type===BUTTONTYPE.DISABLED) buttonRef.current.classList.add(styles.Disabled);
    else if (buttonRef.current && type===BUTTONTYPE.DOTTED) buttonRef.current.classList.add(styles.Dotted);
  },[])
  return (
    <div ref={buttonRef} onClick={onClick}  className={`${styles.Button}`}>{children}</div>
  )
}

export default Button