export function addToCart(id, products, cart) {
  let product = products.find((product) => product.id === id);
  if (cart.length === 0) {
    product.quantity++;
    cart.push(product);
  } else {
    let response = cart.find((ele) => ele.id === id);
    if (!response) {
      product.quantity++;
      cart.push(product);
    } else {
      for (let product of cart) {
        if (product.id === id) {
          product.quantity++;
        }
      }
    }
  }
  return cart;
}

export function removeItem(id, products, cart) {
  for (let product of cart) {
    if (product.id === id) {
      product.quantity--;
      if (product.quantity === 0) {
        cart = deleteItem(id, cart);
        return cart;
      } else {
        return cart;
      }
    }
  }
}

function deleteItem(id, cart) {
  cart = cart.filter((item) => item.id !== id);
  return cart;
}

export function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}
export function validatePassword(password) {
  return String(password).match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
  );
}
