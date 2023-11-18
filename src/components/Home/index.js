import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import {MdOutlineSort} from 'react-icons/md'
import {BsCheckLg, BsChevronLeft, BsChevronRight} from 'react-icons/bs'

import {FaSortDown} from 'react-icons/fa'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import PopularRestaurants from './PopularRestaurants'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselList: [],
    selectedHighest: false,
    selectedLowest: true,
    isSelected: 'Lowest',
    displayRes: [],
    currentPage: 1,
    apiStatusOffer: constants.initial,
    apiStatusPopular: constants.initial,
  }

  componentDidMount() {
    this.getcarouselApi()
    this.getPopularApi()
  }

  getcarouselApi = async () => {
    this.setState({apiStatusOffer: constants.inProgress})

    const jwt = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.offers.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
      }))
      this.setState({
        carouselList: updatedData,
        apiStatusOffer: constants.success,
      })
    } else {
      this.setState({apiStatusOffer: constants.failure})
    }
  }

  getPopularApi = async () => {
    this.setState({apiStatusPopular: constants.inProgress})
    const {currentPage, isSelected} = this.state
    const offsetVal = (currentPage - 1) * 9

    const jwt = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offsetVal}&limit=9&sort_by_rating=${isSelected}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedData = data.restaurants.map(each => ({
        id: each.id,
        name: each.name,
        cuisine: each.cuisine,
        imageUrl: each.image_url,
        rating: each.user_rating.rating,
        totalReviews: each.user_rating.total_reviews,
      }))

      this.setState({
        displayRes: updatedData,
        apiStatusPopular: constants.success,
      })
    } else {
      this.setState({apiStatusPopular: constants.failure})
    }
  }

  onClickHighest = () => {
    this.setState(
      {
        selectedHighest: true,
        selectedLowest: false,
        isSelected: 'Highest',
      },
      this.getPopularApi,
    )
  }

  onClickLowest = () => {
    this.setState(
      {
        selectedLowest: true,
        selectedHighest: false,
        isSelected: 'Lowest',
      },
      this.getPopularApi,
    )
  }

  tooltipBig = () => {
    const {selectedHighest, selectedLowest, isSelected} = this.state
    return (
      <Popup
        trigger={open => (
          <div className="sort-div-big">
            <MdOutlineSort />
            <p className="sort-text">Sort by {isSelected}</p>
            <FaSortDown className="drop-icon" />
          </div>
        )}
        position="bottom center"
        closeOnDocumentClick
        className="popup-content"
      >
        <div className="tool-div">
          <button onClick={this.onClickLowest} className="button-select">
            Lowest
          </button>
          {selectedLowest ? <BsCheckLg /> : null}
        </div>
        <div className="tool-div">
          <button onClick={this.onClickHighest} className="button-select">
            Highest
          </button>
          {selectedHighest ? <BsCheckLg /> : null}
        </div>
      </Popup>
    )
  }

  tooltipSmall = () => {
    const {selectedHighest, selectedLowest, isSelected} = this.state
    return (
      <Popup
        trigger={open => (
          <div className="sort-div">
            <MdOutlineSort />
            <p className="sort-text">Sort by {isSelected}</p>
            <FaSortDown className="drop-icon" />
          </div>
        )}
        position="bottom center"
        closeOnDocumentClick
        className="popup-content"
      >
        <div className="tool-div">
          <button onClick={this.onClickLowest} className="button-select">
            Lowest
          </button>
          {selectedLowest ? <BsCheckLg /> : null}
        </div>
        <div className="tool-div">
          <button onClick={this.onClickHighest} className="button-select">
            Highest
          </button>
          {selectedHighest ? <BsCheckLg /> : null}
        </div>
      </Popup>
    )
  }

  onIncrementPage = () => {
    const {currentPage} = this.state
    if (currentPage < 4) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage + 1}),
        this.getPopularApi,
      )
    }
    const nextSection = document.getElementById('next-section')

    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'})
    }
  }

  onDecrementPage = () => {
    const {currentPage} = this.state
    if (currentPage > 1) {
      this.setState(
        prevState => ({currentPage: prevState.currentPage - 1}),
        this.getPopularApi,
      )
    }
    const nextSection = document.getElementById('next-section')

    if (nextSection) {
      nextSection.scrollIntoView({behavior: 'smooth'})
    }
  }

  offerView = () => {
    const {carouselList, displayRes, currentPage} = this.state
    console.log(carouselList)

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <div className="slider-div">
        <Slider {...settings} className="slick-adjust">
          {carouselList.map(each => (
            <img className="carousel-img" src={each.imageUrl} alt="offer" />
          ))}
        </Slider>
      </div>
    )
  }

  loadingViewOffer = () => (
    <div data-testid="restaurants-offers-loader" className="loader-class">
      <Loader type="TailSpin" color="#f7931e" height={50} width={380} />
    </div>
  )

  loadingViewPopular = () => (
    <div data-testid="restaurants-list-loader" className="loader-class">
      <Loader type="TailSpin" color="#f7931e" height={50} width={380} />
    </div>
  )

  popularView = () => {
    const {displayRes, currentPage} = this.state

    return (
      <>
        <h1 className="popular-res">Popular Restaurants</h1>
        <div className="big-screen-sort">
          <p className="para">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          {this.tooltipBig()}
        </div>
        {this.tooltipSmall()}
        <hr />
        <div className="results-section">
          <ul id="next-section" className="ul-big-display">
            {displayRes.map(each => (
              <PopularRestaurants item={each} key={each.id} />
            ))}
          </ul>
          <div className="disp-pagination">
            <button
              data-testid="pagination-left-button"
              onClick={this.onDecrementPage}
              className="button-page"
            >
              <BsChevronLeft />{' '}
            </button>

            <p>
              <span data-testid="active-page-number">{currentPage}</span> of 4
            </p>

            <button
              data-testid="pagination-right-button"
              onClick={this.onIncrementPage}
              className="button-page"
            >
              <BsChevronRight />{' '}
            </button>
          </div>
          <Footer />
        </div>
      </>
    )
  }

  failureView = () => <h1>oops! Something went wrong from our end.</h1>

  switchStatusOffer = () => {
    const {apiStatusOffer} = this.state
    switch (apiStatusOffer) {
      case constants.inProgress:
        return this.loadingViewOffer()
      case constants.success:
        return this.offerView()
      case constants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  switchStatusPopular = () => {
    const {apiStatusPopular} = this.state
    switch (apiStatusPopular) {
      case constants.inProgress:
        return this.loadingViewPopular()
      case constants.success:
        return this.popularView()
      case constants.failure:
        return this.failureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.switchStatusOffer()}
        {this.switchStatusPopular()}
      </div>
    )
  }
}

export default Home
