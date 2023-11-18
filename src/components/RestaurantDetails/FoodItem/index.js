import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'
import MyContext from '../../../context/myContext'

import './index.css'

class FoodItem extends Component {
  state = {isAdded: false, count: 1}

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {
            onAddToCart,
            onIncreaseQuantity,
            onDecreaseQuantity,
            quantity,
          } = value
          const {item} = this.props
          const {isAdded, count} = this.state
          const {cost, name, imageUrl, rating, id} = item

          const cartItem = {
            cost,
            id,
            imageUrl,
            name,
          }

          const onClickAdd = () => {
            this.setState(prevState => ({
              isAdded: !prevState.isAdded,
            }))
            onAddToCart({...cartItem, quantity})
          }

          const onIncrement = () => {
            onIncreaseQuantity(id)
            this.setState(prevState => ({count: prevState.count + 1}))
          }

          const onDecrement = () => {
            if (count <= 1) {
              this.setState(prevState => ({isAdded: !prevState.isAdded}))
            } else {
              onDecreaseQuantity(id)
              this.setState(prevState => ({count: prevState.count - 1}))
            }
          }

          const counter = () => (
            <div className="flex-btn-product">
              <button
                className="btn"
                data-testid="decrement-count"
                type="button"
                onClick={onDecrement}
              >
                -
              </button>
              <div data-testid="active-count">{count}</div>
              <button
                className="btn"
                data-testid="increment-count"
                type="button"
                onClick={onIncrement}
              >
                +
              </button>
            </div>
          )

          const showButton = isAdded ? (
            counter()
          ) : (
            <button onClick={onClickAdd} className="add-button">
              ADD
            </button>
          )

          return (
            <li data-testid="foodItem" className="flex-food-list">
              <div>
                <img className="img-food" src={imageUrl} alt="" />
              </div>
              <div className="food-text-div">
                <h1 className="food-name">{name}</h1>
                <p className="cost-amount">
                  <span>
                    <BiRupee />
                  </span>
                  {cost}
                </p>
                <p className="rating-name">
                  <span>
                    <AiFillStar className="star" />
                  </span>
                  {rating}
                </p>
                {showButton}
              </div>
            </li>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default FoodItem
