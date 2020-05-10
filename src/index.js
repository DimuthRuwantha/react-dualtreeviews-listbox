import React from 'react'
import DualListBox from './DualListBox'
import styles from './styles.module.css'


export const DualTreeViewListBox = ({data, onnodemoved}) => {
  console.log(data)
  return <DualListBox tree={data} onnodemoved={onnodemoved} />
}
