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
import { driverRequest } from "../../Redux/Ride/Ride";
import { useDispatch } from "react-redux";

const PassengerSummary = () => {
  const dispatch = useDispatch();
  const handleEllipsisPress = () => {
    setModalVisible(true);
  };
  const handleEllipsisPressClose = () => {
    setModalVisible(false);
  };
  const route = useRoute();

  // Extract params from route
  const {
    destination,
    date,
    currentCity,
    noOfPassengers,
    preferredTakeOff,
    dropOff,
    timeOfTakeOff,
  } = route.params;

  const [Err, setERR] = useState("");

  const handleDeliverParcel = () => {
    //setLoadin(true);

    const formattedDate = new Date(date).toISOString().split("T")[0];
    console.log(formattedDate, "formattedDate");

    const payload = {
      destination: destination?.value,
      travelling_date: formattedDate,
      current_city: currentCity?.value,
      no_of_passengers: noOfPassengers,
      preferred_take_off: preferredTakeOff?.value,
      drop_off: dropOff?.value,
      time_of_take_off: timeOfTakeOff,
    };
    //navigation.navigate("TravellersDetails");
    console.log(payload, "payload");
    dispatch(driverRequest(payload))
      .then((result) => {
        //setLoadin(false);
        console.log("Parcel delivered successfully:", result);
        console.log(JSON.stringify(payload, null, 2));
        if (result?.meta?.requestStatus === "fulfilled") {
          navigation.navigate("RideSuccess");
        } else {
          setERR("Please go back and fill your details correctly");
        }
        //navigation.navigate("TravellersDetails")
        //navigation.navigate("DeliverySuccess")
      })
      .catch((error) => {
        //setLoadin(false);
        console.error("Error delivering parcel:", error);
      });
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
      title: "Passenger Summary",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "Bold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

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
            Passenger Summary
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: "Regular",
              color: "gray",
              marginTop: 2,
              marginBottom: 24,
            }}
          >
            Read Carefully before making request
          </Text>
        </View>
        {Err ? (
          <View
            style={{
              backgroundColor: "#ff000015",
              padding: 12,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "red",
                fontFamily: "Regular",
              }}
            >
              Pls Confirm your time of takeoff was entered in this format 12:45,
              else pls provide the correct details
            </Text>
          </View>
        ) : null}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Where are you driving to?{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {destination?.value}{" "}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Which are you taking off from?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {currentCity?.value}
          </Text>
        </View>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            What Date are you travelling{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {date?.toLocaleDateString("en-GB")}
          </Text>
        </View>

        {/* Travel Date */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            How many passengers do you need?
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {noOfPassengers}
          </Text>
        </View>

        {/* Arrival Date */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Clearly describe your preferred take off point
          </Text>

          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {preferredTakeOff?.value}
          </Text>
        </View>

        {/* Arrival Time */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Specific takeoff time{" "}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {timeOfTakeOff}
          </Text>
        </View>

        {/* Bus Stop */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Drop off points
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "gray",
              lineHeight: 21,
              marginBottom: 24,
            }}
          >
            {dropOff?.value}
          </Text>
        </View>
        {Err ? (
          <View
            style={{
              backgroundColor: "#ff000015",
              padding: 12,
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                color: "red",
                fontFamily: "Regular",
              }}
            >
              Pls Confirm your time of takeoff was entered in this format 12:45,
              else pls provide the correct details
            </Text>
          </View>
        ) : null}
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
            // onPress={() => navigation.navigate("PassengerSuccess")}
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

export default PassengerSummary;
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
  //checkbox: {},
});
