import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import Group from '../../../assets/Group.svg'
import iconTwo from '../../../assets/iconTwo.svg'
import iconThree from '../../../assets/iconThree.svg'
import iconFour from '../../../assets/iconFour.svg'
import Vector from '../../../assets/Vector.svg'
import bigBrinjal from '../../../assets/bigBrinjal.svg'
import potato from '../../../assets/potato.svg'

import Footer from '../../Footer'
import FoodItem from '../FoodItem'

import './index.css'

const ProductItem = props => {
  const {item, foodList} = props
  const {
    imageUrl,
    costForTwo,
    cuisine,
    name,
    opesAt,
    location,
    rating,
    reviewsCount,
    itemsCount,
  } = item

  return (
    <>
      <div className="back-image">
        <div>
          <img className="detail-img-size" src={imageUrl} alt="restaurant" />
        </div>
        <div className="text-content-div">
          <img className="back-iconBrinjal" src={bigBrinjal} alt="" />
          <img className="back-iconpotato" src={potato} alt="" />
          <img className="back-iconVector" src={Vector} alt="" />
          <img className="back-icon5" src={iconFour} alt="" />
          <img className="back-icon2" src={Group} alt="" />
          <img className="back-icon" src={iconTwo} alt="" />
          <img className="back-icon3" src={iconThree} alt="" />
          <img className="back-icon4" src={iconFour} alt="" />
          <h1 className="details-heading">{name}</h1>
          <p className="cuisine-text">{cuisine}</p>
          <p className="cuisine-text">{location}</p>
          <div className="flex-costforTwo">
            <div className="ratings-div">
              <p className="all-text">
                <span className="star-space">
                  <AiFillStar />
                </span>
                {rating}
              </p>
              <p className="cost-para">{reviewsCount}+ Ratings</p>
            </div>
            <div className="line-cost-div">
              <p className="all-text">
                <span>
                  <BiRupee />
                </span>
                {costForTwo}
              </p>
              <p className="cost-para">Cost for Two</p>
            </div>
          </div>
        </div>
      </div>
      <ul className="restaurants-foods">
        {foodList.map(each => (
          <FoodItem item={each} key={each.id} foodList={foodList} />
        ))}
      </ul>
      <Footer />
    </>
  )
}

export default ProductItem
