import React from 'react'
import CartOverview from '../features/cart/components/CartOverview'
import Menu from '../features/menu/components/Menu'
import Header from './Header'

function MenuPage() {
  return (
    <div className='grid grid-rows-[1fr_auto_auto] grid-cols-1 !w-full h-full'>
        <Header></Header>
        <Menu></Menu>
        <CartOverview></CartOverview>
    </div>
  )
}

export default MenuPage