import React, { useEffect } from 'react'
import styles from './Popup.module.scss'

function Popup({children,setPopupOpen}) {
  return (
    <>
    <div className={styles.Backdrop} onClick={()=>{setPopupOpen(false)}}>
    </div>
    <div className={styles.Popup}>
    {children}
    </div>
    </>
  )
}

export default Popup