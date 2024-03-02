import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  rides: [],
  parcelSenders: [],
  messaging: [],
  rides: [],
  status: "idle",
  error: null,
};

const getAccessTokenFromAsyncStorage = async () => {
  try {
    const token = await AsyncStorage.getItem("access-token");
    if (token) {
      return token;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const listDrivers = createAsyncThunk(
  "rides/listDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/ride/list-all-drivers/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const listPassengers = createAsyncThunk(
  "rides/listPassengers",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/ride/list-all-passengers/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMessaging = createAsyncThunk(
  "rides/fetchMessaging",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/rides/messaging/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleDriversHistory = createAsyncThunk(
  "rides/fetchSingleDriversHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/ride/single-driver-history/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSinglePassengerHistory = createAsyncThunk(
  "rides/fetchSinglePassengerHistory",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/ride/single-passenger-history/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const driverRequest = createAsyncThunk(
  "rides/driverRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log(payload, "payload");
      const response = await axios.post(
        "https://padi-ride.onrender.com/rideapi/ride/driver-request/",
        payload, // Replace 'payload' with the data you want to send in the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const passengersRequest = createAsyncThunk(
  "rides/passengersRequest",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log(payload, "payload");
      const response = await axios.post(
        "https://padi-ride.onrender.com/rideapi/ride/passenger-request/",
        payload, // Replace 'payload' with the data you want to send in the POST request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listDrivers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listDrivers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rides = action.payload;
      })
      .addCase(listDrivers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(listPassengers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(listPassengers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.parcelSenders = action.payload;
      })
      .addCase(listPassengers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMessaging.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessaging.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messaging = action.payload;
      })
      .addCase(fetchMessaging.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSingleDriversHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleDriversHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rides = action.payload;
      })
      .addCase(fetchSingleDriversHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchSinglePassengerHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSinglePassengerHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rides = action.payload;
      })
      .addCase(fetchSinglePassengerHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(driverRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(driverRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can handle the success action here if needed
      })
      .addCase(driverRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(passengersRequest.pending, (state) => {
        state.status = "loading";
      })
      .addCase(passengersRequest.fulfilled, (state, action) => {
        state.status = "succeeded";
        // You can handle the success action here if needed
      })
      .addCase(passengersRequest.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ridesSlice.reducer;
