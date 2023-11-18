import {AiFillStar} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import './index.css'

const PopularRestaurants = props => {
  const {item} = props
  const {name, cuisine, imageUrl, id, totalReviews, rating} = item

  return (
    <Link to={`/restaurant/${id}`} className="text-line">
      <li data-testid="restaurant-item" className="restaurant-item">
        <div>
          <img className="restro-img" src={imageUrl} alt="restaurant" />
        </div>
        <div>
          <h1 className="res-name">{name}</h1>
          <p className="item-p">{cuisine}</p>
          <div className="flex-rating">
            <AiFillStar className="star" />
            <p className="rating-head">{rating}</p>
            <p className="rating-p">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PopularRestaurants
