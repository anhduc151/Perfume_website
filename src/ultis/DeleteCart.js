export const deleteCart = (productId) => {
  const productsCart = JSON.parse(localStorage.getItem("carts")) || [];
  const temp = productsCart.findIndex((product) => {
    return product._id === productId;
  });
  if (temp > -1) {
    productsCart.splice(temp, 1);
    localStorage.setItem("carts", JSON.stringify(productsCart));
  }
  return productsCart;
};
