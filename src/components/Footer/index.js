import {Component} from 'react'

import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-div">
      <div className="footer-flex">
        <img
          src="https://i.postimg.cc/yY8KH28c/Frame-275.png"
          alt="website-footer-logo"
        />
        <h1 className="head-footer">Tasty Kitchens</h1>
      </div>
      <div>
        <p className="p-footer">
          The only thing we are serious about is food. Contact us on
        </p>
      </div>
      <div className="footer-icons">
        <FaPinterestSquare
          className="icon-size"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="icon-size" testid="instagram-social-icon" />
        <FaTwitter className="icon-size" testid="twitter-social-icon" />
        <FaFacebookSquare className="icon-size" testid="facebook-social-icon" />
      </div>
    </div>
  )
}
