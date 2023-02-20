import { BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  checkIsAddToCart,
  checkProductFavorite,
  checkQuantity,
} from "../../redux/actions";
import { checkUserSelector } from "../../redux/selector";
import AddToCard from "../../ultis/AddCardToLocal";
import LoadingSkeleton from "./Loading/LoadingSkeleton";
import "./product.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Space } from "antd";
const Product = (props) => {
  const { img, name, price, productId, width } = props;
  const userId = useSelector(checkUserSelector);
  const dispatch = useDispatch();
  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    const newCart = {
      _id: productId,
      quantity: 1,
    };
    dispatch(checkQuantity(newCart));
    AddToCard(newCart, 1); // Save Product on LocalStorage
    dispatch(checkIsAddToCart(true));
  };

  const [alertFavorite, setAlertFavorite] = useState(false);
  const createFavoriteProduct = async (data) => {
    // thêm favorite product vào database
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/api/v1/favorite",
      data: data,
      headers: { "Content-Type": "application/json" },
    });
  };
  const handleAddProductFavorite = (e) => {
    e.preventDefault();
    let favoriteProducts = {
      UserId: userId.infoUser._id,
      productId,
      productName: name,
      productImg: img,
      productPrice: price
    };
    dispatch(checkProductFavorite(favoriteProducts));
    const products = JSON.parse(localStorage.getItem("productFavorite")) || [];
    if (products.length > 0) {
      const indexProduct = products.findIndex((product) => {
        return product.productId === favoriteProducts.productId;
      });
      
      if (indexProduct === -1) {
        products.push(favoriteProducts);
        localStorage.setItem("productFavorite", JSON.stringify(products));
        createFavoriteProduct(favoriteProducts);
        setAlertFavorite(true);
      } else {
        alert("Đã có trong danh sách");
        return;
      }
    } else {
      products.push(favoriteProducts);
      localStorage.setItem("productFavorite", JSON.stringify(products));
      createFavoriteProduct(favoriteProducts);
      setAlertFavorite(true);
    }
  };
  useEffect(() => {
    if (!alertFavorite) return;
    setTimeout(() => setAlertFavorite(false), 2000);
  }, [alertFavorite]);
  return (
    <>
      {alertFavorite && (
        <div className="message__favorite">
          <Alert
            message="Success Tips"
            description="Detailed description and advice about successful copywriting."
            type="success"
            showIcon
          />
        </div>
      )}

      <Link
        to={`/products/${productId}`}
        data-value={productId}
        className="product__item"
        style={{ width: width }}
      >
        <img src={img} alt="" className="product__img" />

        <div className="product__item-sale">Giảm giá</div>
        <div className="product__item-heart" onClick={handleAddProductFavorite}>
          <BsHeart size={25} color="red" />
        </div>

        <div className="product__name">{name}</div>

        <div className="product__btns">
          <div
            className="btn__add product__btns-item"
            onClick={(e) => handleAddToCart(e, productId)}
          >
            Thêm vào túi
          </div>
          <div className="product__price product__btns-item">{price} VND</div>
        </div>
      </Link>
    </>
  );
};
const Loading = ({ width }) => {
  return (
    <div className="product" style={{ width }}>
      <LoadingSkeleton height="250px" />
      <LoadingSkeleton width="80%" height="20px" />
      <LoadingSkeleton height="60px" />
    </div>
  );
};
Product.Loading = Loading;
export default Product;
