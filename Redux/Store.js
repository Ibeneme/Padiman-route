import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./Auth/Auth";
import userReducer from "./Users/User";
import postReducer from "./Posts/Post";
import deliveryReducer from "./Deliveries/Deliveries";
import ridesReducer from "./Ride/Ride";
import walletReducer from "./Ride/Ride";

const store = configureStore({
  reducer: {
    registration: registrationReducer,
    user: userReducer,
    post: postReducer,
    delivery: deliveryReducer,
    rides: ridesReducer,
    wallet: walletReducer,
  },
});

export default store;
