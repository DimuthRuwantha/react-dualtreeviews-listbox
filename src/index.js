import React from 'react'
import DualListBox from './DualListBox'
import './styles.module.css'


export const DualTreeViewListBox = ({data, onnodemoved}) => {
  return <DualListBox tree={data} onnodemoved={onnodemoved} />
}
