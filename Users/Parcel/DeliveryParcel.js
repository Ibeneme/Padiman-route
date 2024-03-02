import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Modal,TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
// import Checkbox from "expo-checkbox";
import { sendParcel } from "../../Redux/Deliveries/Deliveries";
import { useDispatch } from "react-redux";

const DeliverySummaryParcel = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [travelTo, setTravelTo] = useState("");
  const [travelDates, setTravelDate] = useState("");
  const [arrivalDate, setArrivalDate] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [busStop, setBusStop] = useState("");
  const [dateWithoutTime, setdateWithoutTime] = useState("");
  const [err, setERR] = useState("");
  const [loading, setLoadin] = useState("");
  const route = useRoute();
  const dispatch = useDispatch();
  console.log("Route Params:", route.params);

  const {
    selectedState,
    selectedCity,
    travelDate,
    isFragile,
    isPerishable,
    gender,
    travelFrom,
    pickupTime,
    phoneNumber,
    date,
  } = route.params;

  const dateObject = new Date(date);
  const formattedDate = dateObject.toLocaleDateString("en-GB");

  const handleEllipsisPress = () => {
    setModalVisible(true);
  };
  const handleEllipsisPressClose = () => {
    setModalVisible(false);
  };
  const closeModal = () => {
    setModalVisible(false); // Close the modal
  };

  const navigation = useNavigation();
  const headerStyle = {
    backgroundColor: "white",
  };

  const headerTitleStyle = {
    color: "#000",
    borderBottomWidth: 0,
  };

  const headerTintColor = "#000";

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Parcel Summary",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "Bold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const handleTravelToChange = (text) => {
    setTravelTo(text);
    if (text === "Overseas") {
      Alert.alert("Coming Soon");
    }
  };

  const handleDeliverParcel = () => {
    setLoadin(true);
    const formattedDate = new Date(date).toISOString().split("T")[0];
    console.log(formattedDate, "formattedDate");
    const payload = {
      state: selectedState?.value,
      sender_city: selectedCity?.value,
      receiver_city: travelDate?.value,
      delivery_date: formattedDate,
      is_perishable: isFragile?.value,
      is_fragile: isPerishable?.value,
      receiver_name: travelFrom,
      receiver_phone: phoneNumber,
      receiver_email: pickupTime,
      receiver_gender: gender?.value,
    };
    //navigation.navigate("TravellersDetails")
    console.log(payload, "payload");
    dispatch(sendParcel(payload))
      .then((result) => {
        setLoadin(false);
        console.log("Parcel delivered successfully:", result);
        console.log(JSON.stringify(result, null, 2));
        if (result?.meta?.requestStatus === "fulfilled") {
          navigation.navigate("DeliverySuccess");
        } else {
          setERR("Please go back and fill your details correctly");
        }
        //navigation.navigate("TravellersDetails")
        //navigation.navigate("DeliverySuccess")
      })
      .catch((error) => {
        setLoadin(false);
        console.error("Error delivering parcel:", error);
      });
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f4f4f4",
        flex: 1,
        flexGrow: 1,
        paddingTop: 16,
        paddingBottom: 24,
        height: "100%",
        marginBottom: -96,
      }}
    >
      <ScrollView
        style={{
          backgroundColor: "white",
          flex: 1,
          flexGrow: 1,
          padding: 12,
          margin: 12,
        }}
      >
        <View>
          <View
            style={{
              backgroundColor: "#515FDF12",
              justifyContent: "center",
              alignItems: "center",
              width: 48,
              height: 48,
              borderRadius: 3333,
              marginTop: 24,
            }}
          >
            <FontAwesome5 name="truck" size={18} color="#515FDF" />
          </View>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "SemiBold",
              marginTop: 12,
            }}
          >
            Parcel Summary
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Regular",
              color: "gray",
              marginTop: 2,
              marginBottom: 8,
            }}
          >
            Read Carefully before making request
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Which State do you reside?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {selectedState?.value}
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Which city are you traveling to?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {selectedCity?.value}
          </Text>
        </View>

        {/* Travel Date */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Where's your delivery City?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {travelDate?.value}
          </Text>
        </View>

        {/* Arrival Date */}

        {/* Arrival Time */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Is the parcel perishable?{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {isFragile?.value === "true" ? "Yes" : "No"}
          </Text>
        </View>

        {/* Bus Stop */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Is the Parcel Perishable?{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {isPerishable?.value === "true" ? "Yes" : "No"}
          </Text>
        </View>

        {/* Travel From */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Name of Receiver{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {travelFrom}
          </Text>
        </View>

        {/* Pickup Location */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Gender of Receiver
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {gender?.value}
          </Text>
        </View>

        {/* Pickup Time */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Email Address of Receiver
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {pickupTime}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Phone Number of Receiver
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {phoneNumber}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Date of Delivery
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 8,
            }}
          >
            {formattedDate}
          </Text>
        </View>
        <View>
          <TouchableOpacity
            style={{
              color: "#515FDF",
              padding: 16,
              backgroundColor: "#515FDF",
              fontFamily: "Regular",
              borderRadius: 6,
              marginTop: 48,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 200,
            }}
            onPress={handleDeliverParcel}
          >
            <Text
              style={{
                fontSize: 16,
                fontFamily: "SemiBold",
                color: "white",
              }}
            >
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliverySummaryParcel;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#00000050",
    flex: 1,
    flexGrow: 1,
    bottom: 0,
    position: "relative",
  },
  modalContainerView: {
    paddingTop: 32,
    paddingBottom: 96,
    bottom: 0,
    position: "absolute",
    width: "100%",
    backgroundColor: "#ffff",
    borderRadius: 21,
    padding: 16,
    gap: 24,
    // alignItems: "center",
    //justifyContent: "center",
  },
  textInput: {
    height: 50,
    fontFamily: "Regular",
    fontSize: 16,
    borderColor: "#d9d9d9",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  checkbox: {},
});
