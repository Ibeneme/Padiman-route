import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-remix-icon';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../Redux/Users/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

const User = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [userProfiles, setUserProfile] = useState('');
  const { isLoading, userProfile } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoading === true) {
      dispatch(fetchUserProfile())
        .then((response) => {
          console.log('dispatched');
          setUserProfile(response?.payload);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [dispatch]);

  const handleFetchUserProfile = () => {
    dispatch(fetchUserProfile())
      .then((response) => {
        console.log('dispatched', response);
        setUserProfile(response?.payload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = async () => {
    try {
      const accessToken = await AsyncStorage.getItem('access_token');
      const refreshToken = await AsyncStorage.getItem('refresh_token');

      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');

      navigation.navigate('Onboarding');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <ScrollView style={{ padding: 16 }}>
        <View style={[styles.topView]}>
          <View style={styles.viewWidths}>
            <Text style={styles.name}>Account</Text>
          </View>
          <TouchableOpacity onPress={handleFetchUserProfile} style={styles.viewNotification}>
            <Icon name="notification-line" size={28} />
            <View style={{ width: 8, height: 8, backgroundColor: '#ff0000', position: 'absolute', borderRadius: 12, right: 6, top: 10 }}></View>
          </TouchableOpacity>
        </View>

        <View style={styles.flex}>
          <View>
          </View>
          <View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Text style={styles.hi}>{userProfile.first_name}{' '}</Text>
              <Text style={styles.hi}>{userProfile.last_name}{' '}</Text>
            </View>
            <Text style={[styles.title, { fontSize: 16, color: '#FF9100' }]}>{userProfile.email}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('updateprofile')} style={styles.flex}>
          <Icon name="user-line" size={18} width={20} />
          <Text style={[styles.title]}>Profile Information</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.flex}>
          <Icon name="login-box-line" size={18} width={20} color="#ff0000" />
          <Text style={[styles.title, { color: '#ff0000' }]}>Log Out</Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 200 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default User;

const styles = StyleSheet.create({
  hi: {
    fontSize: 18,
    fontFamily: 'Medium',
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontFamily: 'Medium',
  },
  viewWidths: {
    width: '50%',
  },
  topView: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewNotification: {
    width: 48,
    backgroundColor: '#d9d9d945',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Medium',
  },
  addFunds: {
    width: '48.5%',
    height: 50,
    backgroundColor: '#1E0700',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  texts: {
    color: '#1E0700',
    fontSize: 16,
    fontFamily: 'Regular',
  },
  flex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginTop: 32,
  },
  transaction: {
    color: '#121212',
    fontSize: 20,
    fontFamily: 'Regular',
  },
});
