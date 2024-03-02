import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  chats: [],
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

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await axios.get(
        "https://padi-ride.onrender.com/rideapi/chat/messaging/",
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

export const sendChats = createAsyncThunk(
  "chat/sendChats",
  async (payload, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log(payload, "payload");
      const response = await axios.post(
        "https://padi-ride.onrender.com/rideapi/chat/messaging/",
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


const ChatSlice = createSlice({
  name: "Chat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
    builder
      .addCase(sendChats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sendChats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.chats = action.payload;
      })
      .addCase(sendChats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ChatSlice.reducer;
