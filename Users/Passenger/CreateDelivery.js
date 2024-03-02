import React, { useState, useCallback } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
  Button,TouchableOpacity
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
export const nigeriaCities = [
  { label: "Umuahia", value: "Umuahia" }, // Abia
  { label: "Yola", value: "Yola" }, // Adamawa
  { label: "Uyo", value: "Uyo" }, // Akwa Ibom
  { label: "Awka", value: "Awka" }, // Anambra
  { label: "Bauchi", value: "Bauchi" }, // Bauchi
  { label: "Yenagoa", value: "Yenagoa" }, // Bayelsa
  { label: "Makurdi", value: "Makurdi" }, // Benue
  { label: "Maiduguri", value: "Maiduguri" }, // Borno
  { label: "Calabar", value: "Calabar" }, // Cross River
  { label: "Asaba", value: "Asaba" }, // Delta
  { label: "Abakaliki", value: "Abakaliki" }, // Ebonyi
  { label: "Benin City", value: "Benin City" }, // Edo
  { label: "Ado Ekiti", value: "Ado Ekiti" }, // Ekiti
  { label: "Enugu", value: "Enugu" }, // Enugu
  { label: "Abuja", value: "Abuja" }, // FCT - Abuja
  { label: "Gombe", value: "Gombe" }, // Gombe
  { label: "Owerri", value: "Owerri" }, // Imo
  { label: "Dutse", value: "Dutse" }, // Jigawa
  { label: "Kaduna", value: "Kaduna" }, // Kaduna
  { label: "Kano", value: "Kano" }, // Kano
  { label: "Katsina", value: "Katsina" }, // Katsina
  { label: "Birnin Kebbi", value: "Birnin Kebbi" }, // Kebbi
  { label: "Lokoja", value: "Lokoja" }, // Kogi
  { label: "Ilorin", value: "Ilorin" }, // Kwara
  { label: "Ikeja", value: "Ikeja" }, // Lagos
  { label: "Lafia", value: "Lafia" }, // Nasarawa
  { label: "Minna", value: "Minna" }, // Niger
  { label: "Abeokuta", value: "Abeokuta" }, // Ogun
  { label: "Akure", value: "Akure" }, // Ondo
  { label: "Osogbo", value: "Osogbo" }, // Osun
  { label: "Ibadan", value: "Ibadan" }, // Oyo
  { label: "Jos", value: "Jos" }, // Plateau
  { label: "Port Harcourt", value: "Port Harcourt" }, // Rivers
  { label: "Sokoto", value: "Sokoto" }, // Sokoto
  { label: "Jalingo", value: "Jalingo" }, // Taraba
  { label: "Damaturu", value: "Damaturu" }, // Yobe
  { label: "Gusau", value: "Gusau" }, // Zamfara
];

const Passenger = () => {
  const navigation = useNavigation();
  const [destination, setDestination] = useState("");
  const [travellingDate, setTravellingDate] = useState("");
  const [currentCity, setCurrentCity] = useState("");
  const [noOfPassengers, setNoOfPassengers] = useState("");
  const [preferredTakeOff, setPreferredTakeOff] = useState("");
  const [timeOfTakeOff, setTimeOfTakeOff] = useState("");
  const [dropOff, setDropOff] = useState("");

  const handleEllipsisPress = useCallback(() => {
    console.log(
      destination?.value,
      currentCity?.value,
      noOfPassengers,
      preferredTakeOff?.value,
      timeOfTakeOff,
      dropOff?.value,
      date
    );
    if (
      destination?.value.trim() !== "" &&
      date &&
      currentCity?.value.trim() !== "" &&
      noOfPassengers?.trim() !== "" &&
      preferredTakeOff?.value.trim() !== "" &&
      timeOfTakeOff?.trim() !== "" &&
      dropOff?.value.trim() !== ""
    ) {
      navigation.navigate("PassengerSummary", {
        destination,
        date,
        currentCity,
        noOfPassengers,
        preferredTakeOff,
        timeOfTakeOff,
        dropOff,
      });
    } else {
      Alert.alert("Error", "Please fill out all the fields");
    }
  }, [
    destination,
    travellingDate,
    currentCity,
    noOfPassengers,
    preferredTakeOff,
    timeOfTakeOff,
    dropOff,
    navigation,
  ]);

  const headerStyle = {
    backgroundColor: "white",
  };

  const headerTitleStyle = {
    color: "#000",
    borderBottomWidth: 0,
  };

  const headerTintColor = "#000";
  // const [timeOfTakeOff, setTimeOfTakeOff] = useState("");

  const handleTimeOfTakeOffChange = (text) => {
    console.log(text);
    setTimeOfTakeOff(text);
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Carry a Passenger",
      headerStyle,
      headerTitleStyle: {
        ...headerTitleStyle,
        fontFamily: "Bold",
      },
      headerTintColor,
      headerBackTitleVisible: false,
    });
  }, [navigation]);

  const handleDestinationChange = (text) => {
    console.log(destination);
    setDestination(text);
  };

  const handleTravellingDateChange = (text) => {
    console.log(text);
    setTravellingDate(text);
  };

  const handleCurrentCityChange = (text) => {
    console.log(text);
    setCurrentCity(text);
  };

  const handleNoOfPassengersChange = (text) => {
    console.log(text);
    setNoOfPassengers(text);
  };

  const handlePreferredTakeOffChange = (text) => {
    console.log(text);
    setPreferredTakeOff(text);
  };

  // const handleTimeOfTakeOffChange = (text) => {
  //   console.log(text);
  //   setTimeOfTakeOff(text);
  // };

  const handleDropOffChange = (text) => {
    console.log(text);
    setDropOff(text);
  };
  const nigeriaStates = [
    {
      label: "Abia",
      value: "Abia",
    },
    {
      label: "Adamawa",
      value: "Adamawa",
    },
    {
      label: "Akwa Ibom",
      value: "Akwa Ibom",
    },
    {
      label: "Anambra",
      value: "Anambra",
    },
    {
      label: "Bauchi",
      value: "Bauchi",
    },
    {
      label: "Bayelsa",
      value: "Bayelsa",
    },
    {
      label: "Benue",
      value: "Benue",
    },
    {
      label: "Borno",
      value: "Borno",
    },
    {
      label: "Cross River",
      value: "Cross River",
    },
    {
      label: "Delta",
      value: "Delta",
    },
    {
      label: "Ebonyi",
      value: "Ebonyi",
    },
    {
      label: "Edo",
      value: "Edo",
    },
    {
      label: "Ekiti",
      value: "Ekiti",
    },
    {
      label: "Enugu",
      value: "Enugu",
    },
    {
      label: "FCT - Abuja",
      value: "FCT - Abuja",
    },
    {
      label: "Gombe",
      value: "Gombe",
    },
    {
      label: "Imo",
      value: "Imo",
    },
    {
      label: "Jigawa",
      value: "Jigawa",
    },
    {
      label: "Kaduna",
      value: "Kaduna",
    },
    {
      label: "Kano",
      value: "Kano",
    },
    {
      label: "Katsina",
      value: "Katsina",
    },
    {
      label: "Kebbi",
      value: "Kebbi",
    },
    {
      label: "Kogi",
      value: "Kogi",
    },
    {
      label: "Kwara",
      value: "Kwara",
    },
    {
      label: "Lagos",
      value: "Lagos",
    },
    {
      label: "Nasarawa",
      value: "Nasarawa",
    },
    {
      label: "Niger",
      value: "Niger",
    },
    {
      label: "Ogun",
      value: "Ogun",
    },
    {
      label: "Ondo",
      value: "Ondo",
    },
    {
      label: "Osun",
      value: "Osun",
    },
    {
      label: "Oyo",
      value: "Oyo",
    },
    {
      label: "Plateau",
      value: "Plateau",
    },
    {
      label: "Rivers",
      value: "Rivers",
    },
    {
      label: "Sokoto",
      value: "Sokoto",
    },
    {
      label: "Taraba",
      value: "Taraba",
    },
    {
      label: "Yobe",
      value: "Yobe",
    },
    {
      label: "Zamfara",
      value: "Zamfara",
    },
  ];
  const nigeriaCities = [
    { label: "Umuahia", value: "Umuahia" }, // Abia
    { label: "Yola", value: "Yola" }, // Adamawa
    { label: "Uyo", value: "Uyo" }, // Akwa Ibom
    { label: "Awka", value: "Awka" }, // Anambra
    { label: "Bauchi", value: "Bauchi" }, // Bauchi
    { label: "Yenagoa", value: "Yenagoa" }, // Bayelsa
    { label: "Makurdi", value: "Makurdi" }, // Benue
    { label: "Maiduguri", value: "Maiduguri" }, // Borno
    { label: "Calabar", value: "Calabar" }, // Cross River
    { label: "Asaba", value: "Asaba" }, // Delta
    { label: "Abakaliki", value: "Abakaliki" }, // Ebonyi
    { label: "Benin City", value: "Benin City" }, // Edo
    { label: "Ado Ekiti", value: "Ado Ekiti" }, // Ekiti
    { label: "Enugu", value: "Enugu" }, // Enugu
    { label: "Abuja", value: "Abuja" }, // FCT - Abuja
    { label: "Gombe", value: "Gombe" }, // Gombe
    { label: "Owerri", value: "Owerri" }, // Imo
    { label: "Dutse", value: "Dutse" }, // Jigawa
    { label: "Kaduna", value: "Kaduna" }, // Kaduna
    { label: "Kano", value: "Kano" }, // Kano
    { label: "Katsina", value: "Katsina" }, // Katsina
    { label: "Birnin Kebbi", value: "Birnin Kebbi" }, // Kebbi
    { label: "Lokoja", value: "Lokoja" }, // Kogi
    { label: "Ilorin", value: "Ilorin" }, // Kwara
    { label: "Ikeja", value: "Ikeja" }, // Lagos
    { label: "Lafia", value: "Lafia" }, // Nasarawa
    { label: "Minna", value: "Minna" }, // Niger
    { label: "Abeokuta", value: "Abeokuta" }, // Ogun
    { label: "Akure", value: "Akure" }, // Ondo
    { label: "Osogbo", value: "Osogbo" }, // Osun
    { label: "Ibadan", value: "Ibadan" }, // Oyo
    { label: "Jos", value: "Jos" }, // Plateau
    { label: "Port Harcourt", value: "Port Harcourt" }, // Rivers
    { label: "Sokoto", value: "Sokoto" }, // Sokoto
    { label: "Jalingo", value: "Jalingo" }, // Taraba
    { label: "Damaturu", value: "Damaturu" }, // Yobe
    { label: "Gusau", value: "Gusau" }, // Zamfara
  ];
  const Country = [
    {
      label: "Nigeria",
      value: "Nigeria",
    },
  ];

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const currentDate = new Date();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios"); // For iOS, only show time picker
    setDate(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
    setMode("date");
  };

  const [dates, setDates] = useState(new Date());
  const [modes, setModes] = useState("date");
  const [shows, setShows] = useState(false);
  const currentDates = new Date();

  const onChanges = (event, selectedDate) => {
    const currentDates = selectedDate || date;
    setShows(Platform.OS === "ios"); // For iOS, only show time picker
    setDates(currentDates);
  };

  const showDatePickers = () => {
    setShows(true);
    setModes("date");
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
            Carry a Passenger
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
        {/* Destination */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Destination
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
            data={nigeriaStates}
            //search
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            placeholder="Enter Destination"
            value={destination}
            onChange={handleDestinationChange}
          />
        </View>

        {/* Current City */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Current City
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
            //search
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            placeholder="Enter Current City"
            value={currentCity}
            onChange={handleCurrentCityChange}
          />
        </View>

        {/* Travelling Date */}
        <View style={{ marginTop: 24 }}>
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
                >{`${
                  date
                    ? date.toISOString().split("T")[0]
                    : "Choose Delivery date"
                }`}</Text>
              </View>
              <View>
                <Button onPress={showDatePicker} title="Choose Date" />
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    //mode="datetime"
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={currentDate}
                    timeZoneOffsetInMinutes={-60}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
        {/* Number of Passengers */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Number of Passengers
          </Text>
          <TextInput
            style={[styles.textInput]}
            value={noOfPassengers}
            onChangeText={handleNoOfPassengersChange}
            placeholder="Enter Number of Passengers"
          />
        </View>

        {/* Preferred Take Off */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Preferred Take Time Off Location
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
            //search
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            placeholder="Enter Preferred Take Off"
            value={preferredTakeOff}
            onChange={handlePreferredTakeOffChange}
          />
        </View>

        {/* Time of Take Off */}
        {/* <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Time of Take Off
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
              >{`${
                dates
                  ? dates.toISOString().split("T")[0]
                  : "Choose take off date"
              }`}</Text>
            </View>
            <View>
              <Button onPress={showDatePickers} title="Choose Date" />
              {shows && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dates}
                  //mode="datetime"
                  mode="datetime"
                  is24Hour={true}
                  display="default"
                  onChange={onChanges}
                  minimumDate={currentDates}
                  timeZoneOffsetInMinutes={-60}
                />
              )}
            </View>
          </View>
        </View> */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>
            Time of Take Off
          </Text>
          <TextInput
            style={[styles.textInput]}
            value={timeOfTakeOff}
            onChangeText={handleTimeOfTakeOffChange}
            placeholder="Enter Time of Take Off"
          />
        </View>

        {/* Drop Off */}
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 16, fontFamily: "SemiBold" }}>Drop Off</Text>

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
            //search
            maxHeight={500}
            labelField="label"
            valueField="value"
            placeholderTextColor={"#1e1e1e45"}
            value={dropOff}
            onChange={handleDropOffChange}
            placeholder="Enter Drop Off"
          />
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
            onPress={handleEllipsisPress}
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

export default Passenger;
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
