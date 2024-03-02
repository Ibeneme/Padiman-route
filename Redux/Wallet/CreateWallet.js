import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  wallet: [],
  status: "idle",
  error: null,
};

// const getAccessTokenFromAsyncStorage = async () => {
//   try {
//     const token = await AsyncStorage.getItem("access-token");
//     if (token) {
//       return token;
//     }
//     return null;
//   } catch (error) {
//     throw error;
//   }
// };

export const createWallet = createAsyncThunk(
  "delivery/createWallet",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log(payload, token, "access_token");
      const response = await axios.post(
        "https://padi-ride.onrender.com/rideapi/wallet/create-wallet/",
        payload,
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

const createWalletSlice = createSlice({
  name: "createWallet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createWallet.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.wallet = action.payload;
      })
      .addCase(createWallet.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default createWalletSlice.reducer;
