import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BiRupee} from 'react-icons/bi'
import './index.css'
import MyContext from '../../context/myContext'
import CartItems from './CartItems'
import Header from '../Header'
import checkCircle from '../../assets/checkCircle.svg'
import Footer from '../Footer'
import cooking from '../../assets/cooking.svg'

const constants = {
  success: 'SUCCESS',
  noView: 'NO_VIEW',
  paymentView: 'PAYMENT_VIEW',
}

class Cart extends Component {
  state = {itemsView: constants.success}

  onPlaceOrder = () => {
    this.setState({itemsView: constants.paymentView})
  }

  onCLickGoToHome = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
      <MyContext.Consumer>
        {value => {
          const {cartList} = value

          let orderTotal = 0

          cartList.forEach(item => {
            orderTotal += item.cost * item.quantity
          })

          console.log(orderTotal)

          const cartEmpty = cartList.length === 0

          const onShowPaymentSuccess = () => (
            <div className="payment">
              <img src={checkCircle} alt="" />
              <h1 className="payment-text">Payment Successful</h1>
              <p className="pay-success-p">
                Thank you for ordering <br />
                Your payment is successfully completed.
              </p>
              <Link to="/" className="text-decorate">
                <button className="nav-home-btn">Go To Home Page</button>
              </Link>
            </div>
          )

          const showNoItemsView = () => (
            <div className="empty-cart">
              <img src={cooking} alt="empty cart" />
              <h1 className="no-orders">No Orders Yet!</h1>
              <p className="empty-text">
                Your cart is empty. Add something from the menu.
              </p>
              <button onClick={this.onCLickGoToHome} className="nav-home-btn">
                Order Now
              </button>
            </div>
          )

          const showResults = () => (
            <div className="div-lg-screen">
              <div className="disp-titles">
                <p>Item</p>
                <p>Quantity</p>
                <p>Price</p>
              </div>
              <ul data-testid="cartItem" className="ul-size">
                {cartList.map(each => (
                  <CartItems item={each} key={each.id} />
                ))}
              </ul>
              <hr />
              <div className="order-total">
                <div>
                  <h1 className="order-text">Order Total:</h1>
                </div>
                <div>
                  <p className="total-amount-p" data-testid="total-price">
                    <span>
                      <BiRupee />
                    </span>
                    {orderTotal}
                  </p>
                  <button onClick={this.onPlaceOrder} className="order-button">
                    Place Order
                  </button>
                </div>
              </div>
            </div>
          )

          const showSwitchStatus = () => {
            const {itemsView} = this.state

            switch (itemsView) {
              case constants.success:
                return showResults()
              case constants.paymentView:
                return onShowPaymentSuccess()
              case constants.noView:
                return showNoItemsView()
              default:
                return null
            }
          }

          return (
            <div className="background-cart">
              <Header />
              {cartEmpty ? showNoItemsView() : showSwitchStatus()}

              <Footer />
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Cart
