import React from 'react'

const MyContext = React.createContext({
  cartList: [],
  quantity: 1,
  onAddToCart: () => {},
  onIncreaseQuantity: () => {},
  onDecreaseQuantity: () => {},
  onDeleteItem: () => {},
})

export default MyContext
