import React from 'react'
import styles from './OptionHolder.module.scss'
import Button from '../Button/Button'
function OptionHolder({children}) {
  return (
    <div className={styles.OptionHolder}>
        {children}
    </div>
  )
}

export default OptionHolder