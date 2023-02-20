import './bannerPage.scss'
const BannerPage = (props) => {
  const { heading, title, img } = props;
  return (
    <div className="hero" style={{ backgroundImage: `url(${img})` }}>
      <h3 className="hero__heading">{heading}</h3>
      <h2 className="hero__title">{title}</h2>
    </div>
  );
};
export default BannerPage;
