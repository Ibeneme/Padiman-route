import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { nigeriaCities } from "../Passenger/CreateDelivery";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateRide = () => {
  const navigation = useNavigation();
  const [travelTo, setTravelTo] = useState("");
  const [travelDate, setTravelDate] = useState(new Date());
  const [currentCity, setCurrentCity] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(Platform.OS === "ios");
    setTravelDate(currentDate);
  };

  const handleTravelToChange = (text) => {
    setTravelTo(text?.value);
  };

  const handleNextPress = () => {
    if (travelTo && travelDate && currentCity) {
      navigation.navigate("RideSummary", {
        destination: travelTo,
        travelling_date: travelDate,
        current_city: currentCity?.value,
      });
    } else {
      alert("Please fill out all the fields");
    }
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
            Join a Ride
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
            Please fill out the form
          </Text>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Where are you travelling from?
          </Text>

          <Dropdown
            style={styles.textInput}
            itemTextStyle={{
              fontSize: 17,
              color: `#121212`,
              fontFamily: "Regular",
            }}
            itemContainerStyle={{
              backgroundColor: "#ffffff",
            }}
            data={nigeriaCities}
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            value={travelTo}
            onChange={handleTravelToChange}
            placeholder="Select state"
          />
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Travelling Date
          </Text>
          <View
            style={[
              styles.textInput,
              {
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              },
            ]}
          >
            <View>
              <Text
                style={[
                  {
                    fontFamily: "Medium",
                    color: `#000`,
                    fontSize: 16,
                  },
                ]}
              >
                {travelDate.toISOString().split("T")[0]}
              </Text>
            </View>
            <View>
              <Button
                onPress={() => setShowDatePicker(true)}
                title="Choose Date"
              />
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={travelDate}
                  mode="date"
                  is24Hour={true}
                  display="default"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  timeZoneOffsetInMinutes={-60}
                />
              )}
            </View>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Which city are you traveling from?
          </Text>
          <Dropdown
            style={styles.textInput}
            itemTextStyle={{
              fontSize: 17,
              color: `#121212`,
              fontFamily: "Regular",
            }}
            itemContainerStyle={{
              backgroundColor: "#ffffff",
            }}
            data={nigeriaCities}
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            value={currentCity}
            onChange={setCurrentCity}
            placeholder="Select city"
          />
        </View>

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
          onPress={handleNextPress}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default CreateRide;
