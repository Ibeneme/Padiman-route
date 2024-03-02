import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  ViewBase,
  Modal,ScrollView, TouchableOpacity 
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import HistoryLogs from "../Components/HistoryLog";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import {
  fetchSingleDriversHistory,
  fetchSinglePassengerHistory,
} from "../../Redux/Ride/Ride";
const imageBackground = require("../../assets/Images/Dashboard.png");

const Deliver = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibles, setModalVisibles] = useState(false);
  const dispatch = useDispatch();
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [activeTab, setActiveTab] = useState("flipper"); // "flipper" is active by default
  const [delivery, setDeliveries] = useState([]);
  const [rider, setRider] = useState([]);
  const [selectedDeliverys, setSelectedDeliverys] = useState(null);
  const openModals = (deliveryData) => {
    setSelectedDeliverys(deliveryData);
    setModalVisibles(true);
    fetchData();
    fetchParcels();
  };
  const closeModals = () => {
    setModalVisibles(false);
    fetchData();
    fetchParcels();
  };
  const openModal = (deliveryData) => {
    setSelectedDelivery(deliveryData);
    setModalVisible(true);
    fetchData();
    fetchParcels();
  };

  const closeModal = () => {
    setModalVisible(false);
    fetchData();
    fetchParcels();
  };

  const toggleFlipper = () => {
    setActiveTab("flipper");
    fetchData();
    fetchParcels();
  };

  const toggleRipper = () => {
    setActiveTab("ripper");
    fetchData();
    fetchParcels();
  };

  // const toggleFlipper = () => {
  //   setFlipperActive(!flipperActive);
  //   setRipperActive(false);
  // };
  // const toggleRipper = () => {
  //   setRipperActive(!ripperActive);
  //   setFlipperActive(false);
  // };
  const fetchData = () => {
    dispatch(fetchSinglePassengerHistory())
      .then((response) => {
        setDeliveries(response?.payload);
      })
      .catch((error) => {});
  };
  const fetchParcels = () => {
    dispatch(fetchSingleDriversHistory())
      .then((response) => {
        setParcels(response?.payload);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    dispatch(fetchSinglePassengerHistory())
      .then((response) => {
        console.log(response?.payload, "posts");
        setDeliveries(response?.payload);
      })
      .catch((error) => {
        //console.log(error);
      });
    dispatch(fetchSingleDriversHistory())
      .then((response) => {
        setRider(response?.payload);
        console.log(response?.payload, "dispatched");
      })

      .catch((error) => {
        //console.log(error);
      });
  }, [dispatch]);

  console.log(delivery, "delivery");
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#f4f4f4",
        flex: 1,
        flexGrow: 1,
        paddingBottom: 24,
        height: "100%",
        marginBottom: -96,
        width: "100%",
      }}
    >
      <ScrollView
        style={{
          padding: 16,
          width: "100%",
        }}
      >
        <View style={styles.container}>
          <Image
            style={{
              width: "100%",
              height: 260,
              borderRadius: 12,
            }}
            source={imageBackground}
          />
          <View style={styles.overlay}>
            <Text style={styles.name}> 👋 {""}Hello,s Ibeneme Ikenna</Text>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 12,
                gap: 8,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: "#FFFFFF25",
                    borderRadius: 2222,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: 24,
                    paddingRight: 24,
                    flexDirection: "row",
                    gap: 12,
                  },
                ]}
                onPress={() => navigation.navigate("passengers")}
              >
                <FontAwesome5 name="users" size={18} color="white" />
                <Text style={styles.buttonText}>Carry a Passenger</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#FFFFFF25",
                  borderRadius: 2222,
                  height: 48,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 24,
                  paddingRight: 24,
                  flexDirection: "row",
                  gap: 12,
                }}
                onPress={() => navigation.navigate("CreateRide")}
              >
                <FontAwesome5 name="car" size={18} color="white" />

                <Text style={styles.buttonText}>Join a Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            backgroundColor: "white",
            marginTop: 12,
            alignItems: "center",
            padding: 12,
            borderRadius: 2444,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor:
                activeTab === "flipper" ? "#515FDF" : "transparent",
              borderRadius: 24,
              width: 140,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={toggleFlipper}
          >
            <Text
              style={{
                color: activeTab === "flipper" ? "white" : "black",
                fontFamily: activeTab === "flipper" ? "Bold" : "Regular",
                fontSize: 16,
              }}
            >
              Passengers
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                activeTab === "ripper" ? "#515FDF" : "transparent",
              borderRadius: 24,
              width: 130,
              height: 48,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={toggleRipper}
          >
            <Text
              style={{
                color: activeTab === "ripper" ? "white" : "black",
                fontFamily: activeTab === "ripper" ? "Bold" : "Regular",
                fontSize: 16,
              }}
            >
              Rides{" "}
            </Text>
          </TouchableOpacity>
        </View>
        {activeTab === "flipper" && (
          <View
            style={{
              marginBottom: 180,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: 4,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: "space-between",
                  width: "49%",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="users" size={18} color="#515FDF" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Bold",
                  }}
                >
                  {delivery?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Regular",
                    }}
                  >
                    Total Driver Requests
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: "space-between",
                  width: "49%",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="users" size={18} color="#515FDF" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Bold",
                  }}
                >
                  {rider?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Regular",
                    }}
                  >
                    Total Ride Requests
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <View
                style={{
                  //backgroundColor: "white",
                  borderRadius: 12,
                  //padding: 16,
                  gap: 2,
                  marginTop: 48,
                  marginBottom: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "SemiBold",
                  }}
                >
                  Passengers History
                </Text>
                {/* <FontAwesome5
                  name="arrow-alt-circle-down"
                  size={24}
                  color="#515FDF"
                /> */}

                {/* <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Regular",
                    color: "gray",
                  }}
                >
                  View your Delivery History
                </Text> */}
              </View>

              <View
                style={{
                  gap: 8,
                }}
              >
                {rider?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 64,
                      fontFamily: "Regular",
                    }}
                  >
                    No deliveries available
                  </Text>
                ) : (
                  rider?.map((data, index) => (
                    <View key={index}>
                      <TouchableOpacity onPress={() => openModal(data)}>
                        <HistoryLogs
                          receiversName={`${data?.current_city} to ${data?.destination}`}
                          location={`${data?.travelling_date}`}
                          // price={
                          //   new Date(data?.delivery_date)
                          //     .toISOString()
                          //     .split("T")[0]
                          // } // Format delivery_date
                          icon="paper-plane"
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Display delivery details here */}
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="truck" size={18} color="#515FDF" />
                </View>
              </View>

              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                  fontSize: 18,
                  fontFamily: "Bold",
                }}
              >
                Driver Request Details
              </Text>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Curent City:`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.current_city}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Destination:`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.destination}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Drop Off`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.drop_off}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text
                  style={styles.flexFontsSmall}
                >{`Number of Passenger`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.no_of_passengers}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text
                  style={styles.flexFontsSmall}
                >{`Preferred Take off`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.preferred_take_off}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Time of Take off`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.time_of_take_off}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Travelling Date`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDelivery?.travelling_date}`}</Text>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.buttons}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisibles}
          onRequestClose={closeModals}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Display delivery details here */}
              <View
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                  marginTop: 24,
                  marginBottom: 24,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="truck" size={18} color="#515FDF" />
                </View>
              </View>

              <Text
                style={{
                  textAlign: "center",
                  marginBottom: 24,
                  fontSize: 18,
                  fontFamily: "Bold",
                }}
              >
                Join a Ride Request
              </Text>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Current City`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDeliverys?.current_city}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Destination`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDeliverys?.destination}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Travel date`}</Text>
                <Text
                  style={styles.flexFonts}
                >{`${selectedDeliverys?.travelling_date}`}</Text>
              </View>

              <TouchableOpacity onPress={closeModals} style={styles.buttons}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {activeTab === "ripper" && (
          <View
            style={{
              marginBottom: 180,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                width: "100%",
                gap: 4,
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: "space-between",
                  width: "49%",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="car" size={18} color="#515FDF" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Bold",
                  }}
                >
                  3
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Regular",
                    }}
                  >
                    Pending Rides
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: "space-between",
                  width: "49%",
                  marginTop: 12,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#515FDF12",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}
                >
                  <FontAwesome5 name="car" size={18} color="#515FDF" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: "Bold",
                  }}
                >
                  3
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Regular",
                    }}
                  >
                    Pending Rides
                  </Text>
                </View>
              </View>
            </View> */}
            <View>
              <View
                style={{
                  //backgroundColor: "white",
                  borderRadius: 12,
                  //padding: 16,
                  gap: 2,
                  marginTop: 48,
                  marginBottom: 12,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: "SemiBold",
                  }}
                >
                  Ride History
                </Text>
                {/* <FontAwesome5
                  name="arrow-alt-circle-down"
                  size={24}
                  color="#515FDF"
                /> */}

                {/* <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "Regular",
                    color: "gray",
                  }}
                >
                  View your RidesHistory
                </Text> */}
              </View>
              <View
                style={{
                  gap: 8,
                }}
              >
                {delivery?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: "center",
                      margin: 64,
                      fontFamily: "Regular",
                    }}
                  >
                    No deliveries available
                  </Text>
                ) : (
                  delivery?.map((data, index) => (
                    <View key={index}>
                      <TouchableOpacity onPress={() => openModals(data)}>
                        <HistoryLogs
                          receiversName={`${data?.current_city} to ${data?.destination}`}
                          location={`${data?.travelling_date}`}
                          // price={
                          //   new Date(data?.delivery_date)
                          //     .toISOString()
                          //     .split("T")[0]
                          // } // Format delivery_date
                          icon="paper-plane"
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Deliver;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    gap: 12,
  },
  name: {
    marginTop: 24,
    color: "white",
    fontSize: 18,
    fontFamily: "Medium",
  },
  button: {},
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Medium",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: "100%",
    gap: 12,
  },
  name: {
    marginTop: 24,
    color: "white",
    fontSize: 18,
    fontFamily: "Medium",
  },
  button: {},
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Medium",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#00000075",
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    height: "auto",
  },
  flexContainers: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  flexFonts: {
    fontSize: 14,
    fontFamily: "Bold",
  },
  flexFontsSmall: {
    fontSize: 14,
    fontFamily: "Regular",
  },
  closeButtonText: {
    color: "white",
  },
  buttons: {
    width: "100%",
    height: 45,
    backgroundColor: "#515FDF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 48,
    marginBottom: 48,
  },
});
