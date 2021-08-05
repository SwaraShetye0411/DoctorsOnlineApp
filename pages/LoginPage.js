import React,{useState,useEffect} from 'react';
import { View,Text, TextInput, StyleSheet,Pressable ,Image, TouchableOpacity,SafeAreaView} from 'react-native';
import FirstPageNavigation from '../navigation/FirstPageNavigation';
import Amplify from '@aws-amplify/core';
import {
    DrawerContentScrollView,
    DrawerItem,
    DrawerItemList
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
// import Analytics from '@aws-amplify/analytics';
// import Auth from '@aws-amplify/auth';
// import awsconfig from '../src/aws-exports';
// Amplify.configure(awsconfig);
// Auth.configure(awsconfig);

const NOTSIGNIN = 'You are NOT logged in';
const SIGNEDIN = 'You have logged in successfully';
const SIGNEDOUT = 'You have logged out successfully';
const WAITINGFOROTP = 'Enter OTP number';
const VERIFYNUMBER = 'Verifying number (Country code +XX needed)';

const LoginPage = ({navigation}) => {
    const [message, setMessage] = useState('Welcome to AWS Amplify Demo');
    const [user, setUser] = useState(null);
    
    const [session, setSession] = useState(null);
    const [otp, setOtp] = useState('');
    const [number, setNumber] = useState('');
    const password = Math.random().toString(10) + 'Abc#';
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        console.log('Ready to auth');
        // Auth.currentCredentials();
        // setTimeout(verifyAuth, 1500);
        // Analytics.autoTrack('session', {
        //   enable: true,
        // });
        //assessLoggedInState();
        verifyAuth();
    }, []);
    
    const verifyAuth = () => {
        Auth.currentAuthenticatedUser()
          .then((user) => {
            
            setUser(user);
            setSession(null);
            console.log('verifyAuth');
            navigation.navigate('FirstPageNavigation');
        })
        .catch((err) => {
            console.error(err);
            setMessage(NOTSIGNIN);
        });
        //navigation.navigate('FirstPageNavigation');
    };

    const assessLoggedInState = () => {
      Auth.currentAuthenticatedUser()
          .then(sess => {
              console.log('logged in');
              setLoggedIn(true);
              navigation.navigate('FirstPageNavigation');
          })
          .catch(() => {
              console.log('not logged in');
              setLoggedIn(false);
          });
    };
    
    const signOut = () => {
        if (user) {
          Auth.signOut();
          setUser(null);
          setOtp('');
          setMessage(SIGNEDOUT);
        } else {
          setMessage(NOTSIGNIN);
        }
    };
    setMessage(VERIFYNUMBER);
    const signIn = () => {
        
        
        Auth.signIn(number)
          .then((result) => {
            setSession(result);
            console.log(result);
            setMessage(WAITINGFOROTP);
        })
        .catch((e) => {
            if (e.code === 'UserNotFoundException') {
              signUp();
            } else if (e.code === 'UsernameExistsException') {
              setMessage(WAITINGFOROTP);
              signIn();
            } else {
              console.log(e.code);
              console.error(e);
            }
            
        });
    };
    
    const signUp = async () => {
        const result = await Auth.signUp({
          username: number,
          password,
          attributes: {
            phone_number: number,
          },
        }).then(() => signIn());
        return result;
    };
    
    const verifyOtp = () => {
        Auth.sendCustomChallengeAnswer(session, otp)
          .then((user) => {
            setUser(user);
            //setMessage(SIGNEDIN);
            setSession(null);
            navigation.navigate('FirstPageNavigation');
        })
        .catch((err) => {
            signIn();
            setMessage(err.message);
            setOtp('');
            console.log(err);
        });
        
    };
    return (
        <View style={{flex:1,marginTop: 20, alignItems:'center',justifyContent:'center'}}>
            
            {!user && !session &&  (
                <View>
                    <TextInput
                        style={styles.input}
                        onChange={(event) => {setNumber(event.nativeEvent.text);
                                              console.log(event.nativeEvent.text);}}
                        placeholder='Phone Number (+XX)'
                        //value={text}
                    />
                    <Pressable 
                        style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#086e5a' : '#33DFFF',
                            
                        },
                        styles.button,
                        
                        ]}
                        onPress={signIn}
                    >
                        <Text style={styles.buttonText}>Get OTP</Text>
                    </Pressable>
              </View>
            )}

            {!user && session && (
                <View>
                    <TextInput
                        style={styles.input}
                        onChange={(event) => setOtp(event.nativeEvent.text)}
                        value={otp}
                        placeholder="Your OTP:"
                        keyboardType="numeric"
                    />
                    <Pressable 
                        style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#086e5a' : '#33DFFF',
                            
                        },
                        styles.button,
                        
                        ]}
                        onPress={verifyOtp}
                    >
                        <Text style={styles.buttonText}>Confirm</Text>
                    </Pressable>
                </View>
            )}
        </View>
    )
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

export default LoginPage;