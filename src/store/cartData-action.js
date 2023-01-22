import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const getCartData = () => {
  return async (dispatch) => {
    const fetchHandler = async() => {
      const res = await fetch('https://react-shoppingcart-c9dfc-default-rtdb.firebaseio.com/cartItems.json');
      const data = await res.json();
      return data;
    }
    try {
      const cartData = await fetchHandler();
      dispatch(cartActions.replaceData(cartData));
    } catch (err) {
      dispatch(uiActions.showNotification({
        message: 'Sending Request Failed',
        open: true,
        type: 'error'
      }))
    }
  }
}

export const sendCartData = (cart) => {
  return async(dispatch) => {
    dispatch(uiActions.showNotification({
      message: 'Sending Request',
      open: true,
      type: 'warning',
    }))
    const sendRequest = async() => {
      // Send ui state as Sending request
      
      const res = await fetch('https://react-shoppingcart-c9dfc-default-rtdb.firebaseio.com/cartItems.json', {
        method:"PUT",
        body:JSON.stringify(cart)
      })
      const data = await res.json();
      // Send ui state as Sent Request
      dispatch(uiActions.showNotification({
        message: 'Sent Request Successfully',
        open: true,
        type: 'success',
      })) 
    };
    try {
      await sendRequest();
    } catch (err) {
      dispatch(uiActions.showNotification({
        message: 'Sending Request Failed',
        open: true,
        type: 'error'
      }))
    }
  }
}

