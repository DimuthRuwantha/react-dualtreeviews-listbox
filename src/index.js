import React from 'react'
import DualListBox from './DualListBox'
import styles from './styles.module.css'


export const DualTreeViewListBox = data => {
  console.log(data)
  return <DualListBox tree={data} />
}
