import { FiMapPin, FiMail, FiPhone } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import './footer.scss'
const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer__container">
          <div className="footer__item">
            <h3 className="footer__logo">VA PERFUME.</h3>
            <div className="footer__list-info">
              <div className="footer__info-item">
                <FiMapPin
                  size={20}
                  color="#555455"
                  className="footer__info-icon"
                />
                <span>388/40 Ha Huy Tap.., Da Nang City</span>
              </div>

              <div className="footer__info-item">
                <FiMail
                  size={20}
                  color="#555455"
                  className="footer__info-icon"
                />
                <a href="mailto:info.anhdev@gmail.com">info.anhdev@gmail.com</a>
              </div>

              <div className="footer__info-item">
                <FiPhone
                  size={20}
                  color="#555455"
                  className="footer__info-icon"
                />
                <a href="tel:0386203125">0386203125</a>
              </div>
            </div>
          </div>
          <div className="footer__item">
            <h3 className="footer__item-heading">Useful Links</h3>
            <div className="footer__links">
              <div className="footer__links-left">
                <NavLink to="/" className="links__item">
                  Home Pages
                </NavLink>
                <NavLink to="/" className="links__item">
                  Order Pages
                </NavLink>
                <NavLink to="/" className="links__item">
                  Portfolio
                </NavLink>
              </div>

              <div className="footer__links-left">
                <NavLink to="/" className="links__item">
                  Blog Posts
                </NavLink>
                <NavLink to="/" className="links__item">
                  Shop Products
                </NavLink>
                <NavLink to="/" className="links__item">
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
          <div className="footer__item">
            <h3 className="footer__item-heading">Subscribe</h3>
            <input
              type="email"
              name=""
              className="footer__input"
              placeholder="Your Email"
            />
            <div className="footer__btn">Subscribe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
