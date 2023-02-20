import Slides from "react-slick";
import "./slider.scss";
import "slick-carousel/slick/slick-theme.css";
const Slider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider__container">
      <div className="slider__container-border"></div>
      <h3 className="slider__title-style">Testimonials</h3>
      <h2 className="slider__title-heading">What our clients say</h2>
      <Slides {...settings} className="slides__content" >
        {/* <div className="slides"> */}
        <div className="slide__item">
          <p className="slide__item-testimonial">
            "Brows should begin directly above the middle of your nostrils. The
            highest point of the arch should connect the tip of the nose with
            the middle of the iris. Brows should end where the corner of the
            nostril connects with the outer corner of the eye."
          </p>
          <p className="slide__item-name">Samanta Peterson</p>
          <p className="slide__item-position">Client of VA Perfume</p>
        </div>
        <div className="slide__item">
          <p className="slide__item-testimonial">
            "Brows should begin directly above the middle of your nostrils. The
            highest point of the arch should connect the tip of the nose with
            the middle of the iris. Brows should end where the corner of the
            nostril connects with the outer corner of the eye."
          </p>
          <p className="slide__item-name">Mike Oxmall</p>
          <p className="slide__item-position">Client of VA Perfume</p>
        </div>
        <div className="slide__item">
          <p className="slide__item-testimonial">
            "Brows should begin directly above the middle of your nostrils. The
            highest point of the arch should connect the tip of the nose with
            the middle of the iris. Brows should end where the corner of the
            nostril connects with the outer corner of the eye."
          </p>
          <p className="slide__item-name">Nguyen Van Anh</p>
          <p className="slide__item-position">Founder of VA Perfume</p>
        </div>
        {/* </div> */}
      </Slides> 
    </div>
  );
};

export default Slider;
