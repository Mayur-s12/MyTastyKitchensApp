import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import ProductItem from './ProductItem'
import Header from '../Header'

import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {details: '', foodList: [], apiStatus: constants.initial}

  componentDidMount() {
    this.getFoodDetailsAPi()
  }

  getFoodDetailsAPi = async () => {
    this.setState({apiStatus: constants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwt = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(each => ({
          cost: each.cost,
          id: each.id,
          imageUrl: each.image_url,
          foodType: each.food_type,
          name: each.name,
          rating: each.rating,
        })),
      }

      this.setState({
        details: updatedData,
        foodList: updatedData.foodItems,
        apiStatus: constants.success,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  failureView = () => <h1>oops! Something went wrong from our end.</h1>

  loadingView = () => (
    <div data-testid="restaurant-details-loader" className="loader-class">
      <Loader type="TailSpin" color="#f7931e" height={50} width={380} />
    </div>
  )

  successView = () => {
    const {details, foodList} = this.state
    return <ProductItem item={details} foodList={foodList} />
  }

  switchStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.inProgress:
        return this.loadingView()
      case constants.success:
        return this.successView()
      case constants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="details-main-container">
        <Header />
        {this.switchStatus()}
      </div>
    )
  }
}

export default RestaurantDetails
