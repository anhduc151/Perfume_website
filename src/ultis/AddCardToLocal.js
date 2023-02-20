const AddToCard = (newProduct, quantity) => {
  const getCartProducts = JSON.parse(localStorage.getItem("carts")) || [];
  let newObj = {
    _id: newProduct._id,
    quantity: quantity,
  };
  if (getCartProducts.length >= 1) {
    const indexCart = getCartProducts.findIndex(
      (product) => product._id === newObj._id
    );
    if (indexCart === -1) {
      getCartProducts.push(newObj);
      localStorage.setItem("carts", JSON.stringify(getCartProducts));
    } else {
      getCartProducts[indexCart].quantity += quantity;
      localStorage.setItem("carts", JSON.stringify(getCartProducts));
    }
  } else {
    getCartProducts.push(newObj);
    localStorage.setItem("carts", JSON.stringify(getCartProducts));
  }
};

export default AddToCard;
