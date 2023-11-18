import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import MyContext from './context/myContext'
import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantDetails from './components/RestaurantDetails'
import NotFound from './components/NotFound'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartList: [], quantity: 1}

  componentDidMount() {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    if (cartData) {
      this.setState({cartList: cartData})
    }
  }

  componentDidUpdate() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  onAddToCart = newItem => {
    const {cartList} = this.state
    const existingItemIndex = cartList.findIndex(item => item.id === newItem.id)

    if (existingItemIndex !== -1) {
      const updatedCartList = [...cartList]
      updatedCartList[existingItemIndex] = {
        ...updatedCartList[existingItemIndex],
        quantity: newItem.quantity,
      }
      this.setState({cartList: updatedCartList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, newItem],
      }))
    }

    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  onIncreaseQuantity = itemId => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === itemId) {
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    this.setState({cartList: updatedCartList})
  }

  onDecreaseQuantity = itemId => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(item => {
      if (item.id === itemId && item.quantity > 1) {
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    this.setState({cartList: updatedCartList})
  }

  onDeleteItem = id => {
    const {cartList} = this.state
    const updatedList = cartList.filter(each => each.id !== id)
    this.setState({cartList: updatedList})
  }

  render() {
    const {cartList, quantity} = this.state
    console.log(cartList)
    return (
      <MyContext.Provider
        value={{
          cartList,
          quantity,
          onAddToCart: this.onAddToCart,
          onIncreaseQuantity: this.onIncreaseQuantity,
          onDecreaseQuantity: this.onDecreaseQuantity,
          onDeleteItem: this.onDeleteItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <NotFound />
        </Switch>
      </MyContext.Provider>
    )
  }
}

export default App
