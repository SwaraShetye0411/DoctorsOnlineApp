import React, {useState,useEffect} from 'react';
import {
    Button,
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
  } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from './Tabs';
import * as Location from 'expo-location';
import Symptoms from '../pages/Symptoms';
import Home from './Home';
import FirstPage from '../pages/FirstPage';
import ThirdPage from '../pages/ThirdPage';

const Stack = createStackNavigator();

const NavigationDrawerStructure = (props)=> {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
      //Props to open/close the drawer
      props.navigationProps.toggleDrawer();
    };
  
    const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
      'location...'
    );
  
    useEffect(() => {
      CheckIfLocationEnabled();
      GetCurrentLocation();
    }, []);
  
    const GetCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
    
      if (status !== 'granted') {
        Alert.alert(
          'Permission not granted',
          'Allow the app to use location service.',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      }
    
      let { coords } = await Location.getCurrentPositionAsync();
    
      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });
  
        console.log(response);
    
        for (let item of response) {
          
          let address1 = `${item.subregion}, ${item.city}`;
          let address = `${item.district}, ${item.city}`;
  
          if(item.district==null) {
            
            setDisplayCurrentAddress(address1);
          }
          else{
            setDisplayCurrentAddress(address);
          }
        }
      }
    };
  
    const CheckIfLocationEnabled = async () => {
      let enabled = await Location.hasServicesEnabledAsync();
  
      if (!enabled) {
        Alert.alert(
          'Location Service not enabled',
          'Please enable your location services to continue',
          [{ text: 'OK' }],
          { cancelable: false }
        );
      } else {
        setLocationServiceEnabled(enabled);
      }
    };
    return (
      <View style={{ flexDirection: 'row', flexShrink:1}}>
        <TouchableOpacity onPress={()=> toggleDrawer()}>
          {/*Donute Button Image */}
          <Image
            source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
            style={{
              width: 30,
              height: 35,
              marginLeft: 20,
              tintColor: 'black'
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginLeft: 25,
            
          }}
        >
          <Text style={{fontWeight:'bold'}}>Your Location</Text>
          <Text style={{fontWeight: 'bold', width:160,flexShrink:1,fontSize:11}}>{displayCurrentAddress}</Text>
        </View>
      </View>
    );
  }
  
  const NavigationRight = () => {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginRight: 20}}>
        <View style={{marginRight: 18}}>
          <TouchableOpacity>
            <Fontisto name="wallet" size={22} color="#086e5a" />
          </TouchableOpacity>
          
        </View>
        <View style={{marginRight: 18}}>
          <TouchableOpacity>
            <Ionicons name="ios-notifications" size={22} color="#086e5a" />
          </TouchableOpacity>
        </View>
  
        <View>
          <TouchableOpacity>
            <FontAwesome name="user" size={22} color="#086e5a" />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

const SecondPageNavigation=({navigation})=>{
    return(
        
            <Stack.Navigator
                initialRouteName={"Symptoms"}
                screenOptions={{
                    //title: 'First Page', //Set Header Title
                    headerStyle: {
                      elevation: 0, // remove shadow on Android
                      shadowOpacity: 0, // remove shadow on iOS
                      borderBottomWidth: 0 ,
                      shadowColor:'transparent',// Just in case.
                      
                  },
                    
                    headerLeft: ()=>
                      <NavigationDrawerStructure
                        navigationProps={navigation}
                      />,
                      headerRight: () => <NavigationRight />,
                    // headerStyle: {
                    //   backgroundColor: '#fff',
                    // },
                    headerTintColor: 'transparent', //Set Header text color
                    headerTitleStyle: {
                      fontWeight: 'bold', //Set Header text style
                    },
                }}  
            >
           
             <Stack.Screen 
                name="ThirdPage"
                component={ThirdPage}
            />
            </Stack.Navigator>
        
    )
}

export default SecondPageNavigation;