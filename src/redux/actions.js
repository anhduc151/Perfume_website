export const checkUser = (data) => {
  return {
    type: "user/checkUser",
    payload: data,
  };
};

export const checkQuantity = (data) => {
  return {
    type: "quantityCart/checkQuantity",
    payload: data,
  };
};

export const checkIsAddToCart = (payload) => {
  return {
    type: "isAddToCart/checkIsAddToCart",
    payload,
  };
};

export const checkIncreaseProduct = (payload) => {
  return {
    type: "increaseProduct/checkIncreaseProduct",
    payload,
  };
};

export const checkDecreaseProduct = (payload) => {
  return {
    type: "decreaseProduct/checkDecreaseProduct",
    payload,
  };
};

export const checkTotalProducts = (payload) => {
  return {
    type: "totalProducts/checkTotalProducts",
    payload,
  };
};
export const checkProductFavorite = (payload) => {
  return {
    type: "productFavorite/checkProductFavorite",
    payload,
  };
};
