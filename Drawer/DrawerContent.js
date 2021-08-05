import React,{useState,useContext} from 'react';
import { View,Text, Image, TouchableOpacity, StyleSheet , SafeAreaView} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import mainContext from '../context/mainContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// import Auth from '@aws-amplify/auth';
// import { useHistory } from "react-router-native";
import firebase from '../firebase';
// import { getAuth, signOut } from "firebase/auth";


const CustomSidebarMenu = (props) => {

  const { signOutUser } = useContext(mainContext);
  // const history = useHistory();

  //const [otp, setOtp] = useState('');

//   const signOut = () => {
//     if (user) {
//       Auth.signOut();
//       setUser(null);
//       setOtp('');
//       onSignOut();
//     } else {
//       console.log('error');
//     }
// };

  
    return (
      <SafeAreaView style={{flex: 1, }}>
        
        <DrawerContentScrollView {...props}>
        
          <View style={{flex: 1}}>

          
          <View style={styles.drawerContent}>
            <View style={styles.userInfoSection}>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <MaterialCommunityIcons name="face-profile" size={50} color="#086e5a" />
                <View style={{alignItems: 'center',justifyContent: 'center', marginLeft: 10}}>
                  <Text style={styles.title}>UserName</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.border}>

          </View>
          <View >
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Appointments"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Test Bookings"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Orders"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Consultations"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="My Doctors"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Medical Records"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Reminders"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Payments & HealthCash"
              onPress={() => {}}
            />

          </View>
          <View style={styles.border}>

          </View>
          <View>
          <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Read about health"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Help Center"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Settings"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Like us? Give us 5 star"
              onPress={() => {}}
            />
            <DrawerItem 
              icon={() => (
                <Octicons name="project" size={24} color="#086e5a" />
              )}
              
              label="Are you a doctor?"
              onPress={() => {}}
            />
            
          </View>
          <View style={styles.border}>

          </View>
          </View>
        </DrawerContentScrollView>
        <View style={styles.bottomDrawerSection}>
          <DrawerItem 
            label="Sign Out"
            onPress={()=>{firebase.auth().signOut();
              props.navigation.closeDrawer();}}
          />

        </View>
      </SafeAreaView>
    );
  };



const styles= StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
        
    },
    title: {
        fontSize: 20,
        marginTop: 3,
        fontWeight: 'bold',
        
      },
      caption: {
        fontSize: 14,
        lineHeight: 14,
      },
      row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
      },
      section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
      },
      paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
      },
      drawerSection: {
        marginTop: 15,
      },
      bottomDrawerSection: {
          marginBottom: 15,
          borderTopColor: '#f4f4f4',
          borderTopWidth: 1
      },
      border: {
        borderTopColor: '#f4f4f4',
        borderTopWidth: 15,
        marginTop: 15

      },
      preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
      },
      sideMenuProfileIcon: {
            resizeMode: 'center',
            width: 100,
            height: 100,
            borderRadius: 100 / 2,
            alignSelf: 'center',
          },
          iconStyle: {
            width: 15,
            height: 15,
            marginHorizontal: 5,
          },
          customItem: {
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
          },
});

export default CustomSidebarMenu;