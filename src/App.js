import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";
import { getCartData, sendCartData } from "./store/cartData-action";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification)
  const cart = useSelector(state => state.cart);
  const loggedIn = useSelector(state => state.auth.loggedIn);

  useEffect(() => {
    dispatch(getCartData());
  },[dispatch])


  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (cart.changed){
      dispatch(sendCartData(cart));
    }  
  },[cart, dispatch]);

  return (
    <div className="App">
      { notification && <Notification type={notification.type} message={notification.message} /> } 
      { !loggedIn && <Auth />}
      { loggedIn && <Layout /> }
    </div>
  );
}

export default App;
