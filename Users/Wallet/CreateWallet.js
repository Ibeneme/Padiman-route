import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { createWallet } from "../../Redux/Wallet/CreateWallet";
import ThreeDropdowns from "./CalendarDropdown";

const CreateWallet = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bvn, setBvn] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [err, setErr] = useState("");
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const handleSubmit = () => {
    setErr("");
    if (!bvn || !dob) {
      setErr("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    dispatch(
      createWallet({
        // first_name: firstName,
        // last_name: lastName,
        bvn: bvn,
        dob: `${selectedYear?.value}-${selectedMonth?.value}-${selectedDay?.value}`,
      })
    )
      .then((response) => {
        setLoading(false);
        console.log(dob, "sjj");
        // navigation.navigate("CreateDelivery");
        console.log(response?.payload, "ffffffff");
        if (response?.payload?.data?.message === "NUBAN successfully created") {
          navigation.navigate("CreateDelivery");
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error creating wallet:", error.message);
        setErr("Cannot Verify your Bvn an error occcured");
      });
  };

  // Calculate minimum date for 16 years ago
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 70);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");

  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const handleMonthChange = (value) => {
    setSelectedMonth(value);
  };

  const handleDayChange = (value) => {
    setSelectedDay(value);
  };

  return (
    <View style={[styles.container, { padding: 12, paddingTop: 84 }]}>
      {/* <View style={[styles.inputContainer, { marginTop: 32 }]}>

        <Text style={styles.label}>First Name</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          placeholder="Enter First Name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          placeholder="Enter Last Name"
        />
      </View> */}

      {err ? (
        <View
          style={{
            backgroundColor: "#ff000025",
            padding: 16,
            marginBottom: 24,
            fontFamily: "Regular",
            borderColor: "#ff0000",
            borderWidth: "0.6",
            borderRadius: 8,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "red",
            }}
          >
            {err}
          </Text>
        </View>
      ) : null}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>BVN</Text>
        <TextInput
          style={styles.input}
          value={bvn}
          onChangeText={(text) => setBvn(text)}
          placeholder="Enter BVN"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date of Birth</Text>
        <ThreeDropdowns
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onDayChange={handleDayChange}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {" "}
          {loading ? <ActivityIndicator color="#fff" /> : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#121212",
    fontFamily: "Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00000060",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    height: 48,
    marginBottom: 18,
  },
  button: {
    backgroundColor: "#515FDF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Bold",
    fontSize: 16,
  },
});

export default CreateWallet;
