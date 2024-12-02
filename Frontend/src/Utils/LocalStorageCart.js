export const saveCartToLocalStorage = (cartProduct, total) => {
  localStorage.setItem("Local Cart", JSON.stringify(cartProduct));
  localStorage.setItem("Cart Total", JSON.stringify(total));
};

export const getCartFromLocalStorage = () => {
  try {
    const items = localStorage.getItem("Local Cart");
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Error parsing localStorage cart:", error);
    return [];
  }
};
