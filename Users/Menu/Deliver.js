import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-remix-icon';
import HistoryLogs from '../Components/HistoryLog';
import {useNavigation} from '@react-navigation/native';
const imageBackground = require('../../assets/Images/Dashboard.png');
import {useSelector, useDispatch} from 'react-redux';
import {
  fetchParcelSenders,
  fetchUserDeliveryHistory,
  fetchUserSendParcelHistory,
} from '../../Redux/Deliveries/Deliveries';
import {fetchUserProfile} from '../../Redux/Users/User';

const Deliver = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('flipper'); // "flipper" is active by default
  const {isLoading, deliveries} = useSelector(state => state.delivery);
  const {userProfile} = useSelector(state => state.user);
  const [delivery, setDeliveries] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [isModalVisibles, setModalVisibles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedDeliverys, setSelectedDeliverys] = useState(null);
  const [userData, setUsersData] = useState('');
  const [parcels, setParcels] = useState(null);

  const openModal = deliveryData => {
    setSelectedDelivery(deliveryData);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModals = deliveryData => {
    setSelectedDeliverys(deliveryData);
    setModalVisibles(true);
  };

  const closeModals = () => {
    setModalVisibles(false);
  };

  useEffect(() => {
    if (isLoading === true) {
      dispatch(fetchAllPosts())
        .then(response => {})
        .catch(error => {});
      dispatch(fetchUserProfile())
        .then(response => {
          setUsersData(response?.payload);
          // console.log(response, "response");
        })
        .catch(error => {});
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserProfile())
      .then(response => {
        setUsersData(response?.payload);
        //console.log(response, "response");
      })
      .catch(error => {});
  }, [dispatch]);

  const fetchData = () => {
    dispatch(fetchUserDeliveryHistory())
      .then(response => {
        setDeliveries(response?.payload);
      })
      .catch(error => {});
  };
  // console.log(userData?.has_verified_bvn, "userData");

  const fetchParcels = () => {
    dispatch(fetchUserSendParcelHistory())
      .then(response => {
        // console.log("Data fetched setParcels", response?.payload);
        setParcels(response?.payload);
      })
      .catch(error => {
        //console.log("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchParcels();

    if (loading) {
      fetchData();
      fetchParcels();
      console.log('3');
      setLoading(false);
    }
  }, []);

  const toggleFlipper = () => {
    fetchData();
    fetchParcels();
    setActiveTab('flipper');
    console.log('4');
  };

  const toggleRipper = () => {
    fetchData();
    fetchParcels();
    console.log('4');
    setActiveTab('ripper');
  };

  // const toggleFlipper = () => {
  //   setFlipperActive(!flipperActive);
  //   setRipperActive(false);
  // };

  // const toggleRipper = () => {
  //   setRipperActive(!ripperActive);
  //   setFlipperActive(false);
  // };
  console.log(delivery, 'delivery');

  const handleNext = () => {
    navigation.navigate('CreateDelivery');
    // if (userData?.has_verified_licence) {
    //   navigation.navigate("CreateDelivery");
    // } else {
    //   navigation.navigate("VerifyLicense");
    // }
  };

  const handleNextParcel = () => {
    if (userData?.has_verified_bvn) {
      navigation.navigate('CreateParcel');
    } else {
      navigation.navigate('CreateWallet');
    }
  };

  // console.log(delivery, "delivery");
  // console.log(deliveries, "deliveries");

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#f4f4f4',
        flex: 1,
        flexGrow: 1,
        paddingBottom: 24,
        height: '100%',
        marginBottom: -96,
        width: '100%',
      }}>
      <ScrollView
        style={{
          padding: 16,
          width: '100%',
        }}>
        <View style={styles.container}>
          <Image
            style={{
              width: '100%',
              height: 260,
              borderRadius: 12,
            }}
            source={imageBackground}
          />
          <View style={styles.overlay}>
            <Text style={styles.name}>
              👋 {''}Hello, {''}
              {userProfile.first_name}
            </Text>
            <View
              style={{
                flexDirection: 'column',
                marginBottom: 12,
                gap: 8,
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: '#FFFFFF25',
                    borderRadius: 2222,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingLeft: 24,
                    paddingRight: 24,
                    flexDirection: 'row',
                    gap: 12,
                  },
                ]}
                onPress={handleNext}>
                <Icon name="truck-fill" size={20} color="#fff" />
                <Text style={styles.buttonText}>Deliver Someone's Parcel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#FFFFFF25',
                  borderRadius: 2222,
                  height: 48,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingLeft: 24,
                  paddingRight: 24,
                  flexDirection: 'row',
                  gap: 12,
                }}
                onPress={handleNextParcel}>
                <Icon name="truck-fill" size={20} color="#fff" />
                <Text style={styles.buttonText}>Send a Parcel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            backgroundColor: 'white',
            marginTop: 12,
            alignItems: 'center',
            padding: 12,
            borderRadius: 2444,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor:
                activeTab === 'flipper' ? '#515FDF' : 'transparent',
              borderRadius: 24,
              width: 140,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={toggleFlipper}>
            <Text
              style={{
                color: activeTab === 'flipper' ? 'white' : 'black',
                fontFamily: activeTab === 'flipper' ? 'Bold' : 'Regular',
                fontSize: 16,
              }}>
              Deliveries
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor:
                activeTab === 'ripper' ? '#515FDF' : 'transparent',
              borderRadius: 24,
              width: 130,
              height: 48,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={toggleRipper}>
            <Text
              style={{
                color: activeTab === 'ripper' ? 'white' : 'black',
                fontFamily: activeTab === 'ripper' ? 'Bold' : 'Regular',
                fontSize: 16,
              }}>
              Parcel
            </Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 24,
                  fontSize: 18,
                  fontFamily: 'Bold',
                }}>
                Delivery Details
              </Text>

              <View style={styles.flexContainers}>
                <Text
                  style={styles.flexFontsSmall}>{`Destination State:`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDelivery?.destination}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Destination City:`}</Text>
                <Text
                  style={styles.flexFonts}>{`${selectedDelivery?.city}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Bus stop:`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDelivery?.bus_stop}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Arrival date:`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDelivery?.arrival_date}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`${
                  selectedDelivery?.can_carry_light === true
                    ? 'Can Carry Light Weight'
                    : 'Can Carry Heavy Weight'
                }`}</Text>
                <Text style={styles.flexFonts}>{`${
                  selectedDelivery?.can_carry_light === true ? 'Yes' : 'Yes'
                }`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`${
                  selectedDelivery?.can_carry_light === true
                    ? 'Can Carry Light Weight'
                    : 'Can Carry Heavy Weight'
                }`}</Text>
                <Text style={styles.flexFonts}>{`${
                  selectedDelivery?.can_carry_light === true ? 'Yes' : 'Yes'
                }`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`${
                  selectedDelivery?.can_carry_light === true
                    ? 'Can Carry Light Weight'
                    : 'Can Carry Heavy Weight'
                }`}</Text>
                <Text style={styles.flexFonts}>{`${
                  selectedDelivery?.can_carry_light === true ? 'Yes' : 'Yes'
                }`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`${
                  selectedDelivery?.min_price === true
                    ? 'Min Price'
                    : 'Max Price'
                }`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDelivery?.min_price}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`${
                  selectedDelivery?.max_price === true
                    ? 'Max Price'
                    : 'Min Price'
                }`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDelivery?.max_price}`}</Text>
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
          onRequestClose={closeModals}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {/* Display delivery details here */}
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginTop: 24,
                  marginBottom: 24,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  marginBottom: 24,
                  fontSize: 18,
                  fontFamily: 'Bold',
                }}>
                Parcel Details
              </Text>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Senders City`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.sender_city}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Senders State`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.state}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Delivery date`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.delivery_date}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Is Fragile`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.is_fragile}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Is Perishable`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.is_perishable}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{`Receiver's City`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.receiver_city}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{` Receiver Email`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.receiver_email}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{` Receiver Name`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.receiver_name}`}</Text>
              </View>
              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{` Receiver Gender`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.receiver_gender}`}</Text>
              </View>

              <View style={styles.flexContainers}>
                <Text style={styles.flexFontsSmall}>{` Receiver Phone`}</Text>
                <Text
                  style={
                    styles.flexFonts
                  }>{`${selectedDeliverys?.receiver_phone}`}</Text>
              </View>

              <TouchableOpacity onPress={closeModals} style={styles.buttons}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {activeTab === 'flipper' && (
          <View
            style={{
              marginBottom: 180,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                gap: 4,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: 'space-between',
                  width: '49%',
                  marginTop: 12,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Bold',
                  }}>
                  {delivery?.delivery_history?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Regular',
                    }}>
                    Pending Deliveries
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: 'space-between',
                  width: '49%',
                  marginTop: 12,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Bold',
                  }}>
                  {delivery?.delivery_history?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Regular',
                    }}>
                    Pending Deliveries
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'SemiBold',
                  }}>
                  Delivery History
                </Text>
              </View>
              <View
                style={{
                  gap: 8,
                }}>
                {delivery?.delivery_history?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 64,
                      fontFamily: 'Regular',
                    }}>
                    No deliveries available
                  </Text>
                ) : null}
                {Array.isArray(delivery?.delivery_history) &&
                  delivery?.delivery_history?.map((data, index) => (
                    <View key={index}>
                      <TouchableOpacity onPress={() => openModal(data)}>
                        <HistoryLogs
                          receiversName={`Destination: ${data?.destination}`}
                          location={
                            data?.can_carry_light
                              ? 'Can carry light weight'
                              : 'Can carry heavy weight'
                          }
                          price={`NGN${data.max_price}`}
                          icon="paper-plane"
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === 'ripper' && (
          <View
            style={{
              marginBottom: 180,
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                gap: 4,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: 'space-between',
                  width: '49%',
                  marginTop: 12,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Bold',
                  }}>
                  {parcels?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Regular',
                    }}>
                    Pending Parcels
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  padding: 16,
                  borderRadius: 12,
                  height: 180,
                  paddingBottom: 24,
                  justifyContent: 'space-between',
                  width: '49%',
                  marginTop: 12,
                }}>
                <View
                  style={{
                    backgroundColor: '#515FDF12',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 48,
                    height: 48,
                    borderRadius: 3333,
                  }}>
                  <Icon name="truck-fill" size={20} color="#515fdf" />
                </View>
                <Text
                  style={{
                    fontSize: 24,
                    fontFamily: 'Bold',
                  }}>
                  {parcels?.length}
                </Text>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Regular',
                    }}>
                    Pending Parcels
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
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: 'SemiBold',
                  }}>
                  Parcel History
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
                  View your Parcel History
                </Text> */}
              </View>

              <View
                style={{
                  gap: 8,
                }}>
                {parcels?.length === 0 ? (
                  <Text
                    style={{
                      textAlign: 'center',
                      margin: 64,
                      fontFamily: 'Regular',
                    }}>
                    No deliveries available
                  </Text>
                ) : (
                  parcels?.map((data, index) => (
                    <View key={index}>
                      <TouchableOpacity onPress={() => openModals(data)}>
                        <HistoryLogs
                          receiversName={`${data?.receiver_name}`}
                          location={`${data?.receiver_email}`}
                          price={
                            new Date(data?.delivery_date)
                              .toISOString()
                              .split('T')[0]
                          } // Format delivery_date
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
    position: 'relative',
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
    gap: 12,
  },
  name: {
    marginTop: 24,
    color: 'white',
    fontSize: 18,
    fontFamily: 'Medium',
  },
  button: {},
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Medium',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000075',
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    height: 'auto',
  },
  flexContainers: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  flexFonts: {
    fontSize: 14,
    fontFamily: 'Bold',
  },
  flexFontsSmall: {
    fontSize: 14,
    fontFamily: 'Regular',
  },
  closeButtonText: {
    color: 'white',
  },
  buttons: {
    width: '100%',
    height: 45,
    backgroundColor: '#515FDF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 48,
    marginBottom: 48,
  },
});
