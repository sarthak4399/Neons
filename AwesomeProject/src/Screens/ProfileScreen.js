import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import React from 'react';
import {Dimensions} from 'react-native';
import styles from '../Styles/ProfileStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {statusCodes} from 'react-native-google-signin';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import auth from '@react-native-firebase/auth';
const defaultAvatar = require('../../assets/Image/profile1.png');
const windowHeight = Dimensions.get('window').height;
const Profile = ({navigation}) => {
  const FallbackAvatar = ({size}) => (
    <Image
      source={defaultAvatar}
      style={{width: size, height: size, borderRadius: size / 2}}
    />
  );
  const [userName, setuserName] = useState('');
  const [userDes, setuserDes] = useState('');
  const [photourl, setPhotoUrl] = useState('');
  const [email, setEmail] = useState('');
  const [method, setMethod] = useState('');
  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        // console.log(userData);
        const data = JSON.parse(userData);
        // console.log('after logout', data);
        setuserName(data.userName);
        setuserDes(data.userDes);
        setPhotoUrl(data.photoUrl);
        setEmail(data.email);
        setMethod(data.Signin_Method);
        // if (method == 'google') {
        //   console.log('hello');
        // }
      } else {
        console.log('User data not found in AsyncStorage.');
      }
    } catch (error) {
      console.log('Error while retrieving user data:', error);
    }
  };
  const count = 1;
  useEffect(() => {
    getUserData();
  }, [count]);
  const logout = async () => {
    await AsyncStorage.removeItem('user')
      .then(() => {
        getUserData();
        removeUser();
        const email = auth().currentUser.email;
        console.log(email);
        ToastAndroid.show('Logged out successfully', ToastAndroid.SHORT);

        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
        GoogleSignin.signOut();
      })
      .catch(error => {
        console.log(
          'Error while removing auth-token from AsyncStorage:',
          error,
        );
      });
  };
  const delete_account = async () => {
    // await AsyncStorage.removeItem('user');

    const email = auth().currentUser.email;
    const user_ID = auth().currentUser.uid;

    console.log(email);
    console.log(user_ID);

    try {
    } catch (error) {}
  };
  return (
    <ScrollView>
      <LinearGradient
        colors={['#001314', '#1E010B']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        style={{height: windowHeight}}>
        <View style={styles.Addfullscreen}>
          <View style={styles.leftIcon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <View style={styles.accountBack}>
                <Icon name="chevron-back" size={30} color="white" />
              </View>
            </TouchableOpacity>
            <View style={styles.titleText}>
              <Text style={styles.AddtitleText}>My Account</Text>
            </View>
          </View>

          <View style={styles.profileDetails}>
            <View style={styles.profileImage}>
              <Avatar.Image
                size={90}
                source={photourl ? {uri: photourl} : defaultAvatar}
                avatarStyle={{
                  borderWidth: 22,
                  borderColor: 'white',
                  borderTopLeftRadius: 1,
                  borderStyle: 'solid',
                }}
              />
            </View>

            <View>
              <Text style={styles.ProfileTitle}>{userName}</Text>
              <Text style={styles.ProfileSubtitle}>{userDes}</Text>
            </View>
          </View>

          <View style={styles.editFlex}>
            <View style={styles.container}>
              <View style={{marginBottom: 40}}>
                <Text style={styles.editTitle}>User Name</Text>
                <View style={styles.editValBtn}>
                  <Text style={styles.editValue}>{userName}</Text>

                  {/* <Button
                  {/* <Button
                    icon="account-edit"
                    mode="contained"
                    style={styles.editBtn}>
                    Edit
                  </Button> */}
                </View>
              </View>

              <View style={{marginBottom: 40}}>
                <Text style={styles.editTitle}>Email</Text>
                <View style={styles.editValBtn}>
                  <Text style={styles.editValue}>{email}</Text>

                  {/* <Button
                    icon="account-edit"
                    mode="contained"
                    style={styles.editBtn}>
                    {' '}
                    Edit
                  </Button> */}
                </View>
              </View>

              <View style={{marginBottom: 40}}>
                <Text style={styles.editTitle}>Password</Text>
                <View style={styles.editValBtn}>
                  <Text style={styles.editValue}>*********</Text>
                  {method !== 'google' && (
                    <Button
                      style={styles.editBtn}
                      onPress={() => navigation.navigate('EmailValid')}>
                      Change
                    </Button>
                  )}
                </View>
              </View>
              {/* delete account button  */}
              <View style={{marginBottom: 40}}>
                <Text style={styles.editTitle}>Delete Account</Text>
                <View style={styles.editValBtn}>
                  <Text style={styles.editValue}>Delete Account</Text>
                  <Button style={styles.editBtn} onPress={delete_account}>
                    Delete
                  </Button>
                </View>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity style={{height: '100%'}}>
            <View style={styles.editFlex}>
              <Text style={styles.signOutBtn}>Sign Out</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </LinearGradient>
    </ScrollView>
  );
};

export default Profile;
