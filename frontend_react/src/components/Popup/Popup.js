import React, { useEffect } from 'react'
import styles from './Popup.module.scss'

function Popup({children,setPopupOpen}) {
  return (
    <>
    <div className={styles.Popup}>
    {children}
    </div>
    <div className={styles.Backdrop} onClick={()=>{setPopupOpen(false)}}>
    </div>
    
    </>
  )
}

export default Popup