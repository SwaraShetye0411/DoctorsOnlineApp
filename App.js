// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

import React,{useState, useEffect, useMemo} from 'react';

import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Pressable,
  TextInput,
  Appearance
} from 'react-native';


import { NavigationContainer,DarkTheme,DefaultTheme, } from '@react-navigation/native';
import {
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
  ActivityIndicator,
} from 'react-native-paper';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import mainContext from './context/mainContext';


// import SignInPage from './pages/SignInPage';
import  CustomSidebarMenu  from './Drawer/DrawerContent';
import FirstPageNavigation from './navigation/FirstPageNavigation';
import SecondPageNavigation from './navigation/SecondPageNavigation';
import firebase from "./firebase";
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import LoginPageNavigation from './navigation/LoginPageNavigation';


const CombinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...DefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...DefaultTheme.colors,
    primary: '#718E57',
  },
};
const CombinedDarkTheme = {
  ...PaperDarkTheme,
  ...DarkTheme,
  dark: true,
  colors: { ...PaperDarkTheme.colors, ...DarkTheme.colors, primary: '#718E57' },
};

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
// if (Appearance.getColorScheme() === 'dark') {
//    status = true;
// } else {
//    status = false;
// }

function App({navigation}) {
  //const [isDarkTheme, setIsDarkTheme] = useState(status);
  const [userLogged, setUserLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  //const [isUser, setIsUser] = useState(null);

  //const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;

  useEffect(() => {
    const authListener = firebase.auth().onAuthStateChanged((user) => {
      setUserLogged(user ? true : false);
      setIsLoading(false);
      //setUserProfile(user);
      console.log(user);
      
    });
   


    
    return authListener;
    

  }, []);

  // const mainC = useMemo(
  //   () => ({
      
  //     signOutUser: (props) => {firebase.auth().signOut();
  //                         props.navigation.closeDrawer();
  //       },
      
  //   }),
  //   []
  // );
  const doLogin = async (email, password) => {
    setIsLoading(true);
    
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };

  const doSignup = async (email, password) => {
    setIsLoading(true);
    try{
      const {user} = await firebase.auth().createUserWithEmailAndPassword(email,password);
      console.log(user);
      createUserDocument(user);
    }
    catch(error) {
      alert('error',error);
    }
  };
  const mainC = useMemo(
    () => ({
      userProfile: { userProfile },
      signOutUser: () => firebase.auth().signOut(),
      handleLogin: (email, password) => {
        doLogin(email, password);
      },
      handleSignup: (email, password) => {
        doSignup(email, password);
      },
    }),
    []
  );

  if (isLoading) {
    // Checking if already logged in
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={true} size="large" />
      </View>
    );
  }

  // const verifyAuth=()=>{
  //     firebase.auth().onAuthStateChanged((user) => {
  //         if (user) {
  //           setIsUser(user);
  //           var uid = user.uid;
            
  //         } else {
            
  //         }
  //       });
  // }
  return (
    <mainContext.Provider value={mainC}>
      <PaperProvider >
        {/* {isDarkTheme ? <StatusBar style="light" /> : <StatusBar style="dark" />} */}
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => <CustomSidebarMenu {...props}/>}
          >
            {/* <Drawer.Screen
                name="LoginPageNavigation"
                component={LoginPageNavigation}
            />
            <Drawer.Screen
                  name="FirstPageNavigation"
                  component={FirstPageNavigation} 
            /> */}
            {userLogged == false ? (
              <>
                <Drawer.Screen
                name="LoginPageNavigation"
                component={LoginPageNavigation}
                />

              </>
            ) : (
              <>
                <Drawer.Screen
                  name="FirstPageNavigation"
                  component={FirstPageNavigation} 
                />
              </>
            )
            }
            {/* {userLogged == false ? (
              <>
                <Drawer.Screen
                name="SignInPage"
                component={SignInPage}
                />  
              </>
            ) : (
              <>
                <Drawer.Screen
                  name="FirstPageNavigation"
                  component={FirstPageNavigation} 
                />
              </>
            )
            } */}
              
            {/* <Drawer.Screen
              name="SignInPage"
              component={SignInPage}
              
              />
            <Drawer.Screen
              name="FirstPageNavigation"
              component={FirstPageNavigation} /> */}
            {/* <Drawer.Screen
              name="SecondPageNavigation"
              component={SecondPageNavigation} /> */}
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </mainContext.Provider>
    
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  button: {
      borderRadius: 8,
      padding: 6,
      height: 40,
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
});

export default App;