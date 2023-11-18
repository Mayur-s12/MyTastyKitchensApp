import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import MyContext from '../../../context/myContext'

class CartItems extends Component {
  state = {count: 1}

  componentDidMount() {
    const {item} = this.props
    const {quantity} = item
    this.setState({count: quantity})
  }

  render() {
    const {item} = this.props
    const {cost, name, quantity, imageUrl, id} = item
    const {count} = this.state

    console.log(quantity)
    return (
      <MyContext.Consumer>
        {value => {
          const {onIncreaseQuantity, onDecreaseQuantity, onDeleteItem} = value

          const onClickItemIncrease = () => {
            onIncreaseQuantity(id)
            this.setState(prevState => ({count: prevState.count + 1}))
          }

          const onClickItemDecrease = () => {
            if (count <= 1) {
              onDeleteItem(id)
            } else {
              onDecreaseQuantity(id)
              this.setState(prevState => ({count: prevState.count - 1}))
            }
          }

          return (
            <li data-testid="cartItem" className="list-back-cart">
              <div>
                <img className="cart-item-image" src={imageUrl} alt="item" />
              </div>
              <div className="cart-item-details">
                <div className="div-sizes">
                  <h1 className="para-cart name-color">{name}</h1>
                </div>

                <div className="flex-cart-button div-sizes">
                  <button
                    className="button-plusminus"
                    data-testid="decrement-quantity"
                    onClick={onClickItemDecrease}
                  >
                    -
                  </button>
                  <p data-testid="item-quantity" className="count-para">
                    {count}
                  </p>
                  <button
                    className="button-plusminus"
                    data-testid="increment-quantity"
                    onClick={onClickItemIncrease}
                  >
                    +
                  </button>
                </div>
                <div className="flex-rupess div-sizes">
                  <BiRupee />
                  <p className="para-cart cost-color">{cost}</p>
                </div>
              </div>
            </li>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default CartItems
