import React, {useState,useRef,useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import firebase from '../firebase';


export default SignInPage = ({navigation}) => {
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    // useEffect(()=>{
    //     console.log('Ready to auth')
    //     verifyAuth();
    // },[])

    // const verifyAuth=()=>{
    //     firebase.auth().onAuthStateChanged((user) => {
    //         if (user) {
    //           // User is signed in, see docs for a list of available properties
    //           // https://firebase.google.com/docs/reference/js/firebase.User
    //           var uid = user.uid;
    //           navigation.navigate('FirstPageNavigation');
    //           // ...
    //         } else {
    //           // User is signed out
    //           // ...
    //         }
    //       });
    // }

    // Function to be called when requesting for a verification code
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
    };
    
    // Function to be called when confirming the verification code that we received
    // from Firebase via SMS
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId,code);
        firebase
        .auth()
        .signInWithCredential(credential)
        .then((result) => {
            // Do something with the results here
            console.log(result);
            //navigation.navigate('FirstPageNavigation')
        });
    }
    
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
            />
            {/* Phone Number Input */}
            <TextInput
                placeholder="Phone Number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                autoCompleteType="tel"
            />
            <TouchableOpacity onPress={sendVerification}>
                <Text>Send Verification</Text>
            </TouchableOpacity>
            {/* Verification Code Input */}
            <TextInput
                placeholder="Confirmation Code"
                onChangeText={setCode}
                keyboardType="number-pad"
            />
            <TouchableOpacity onPress={confirmCode}>
                <Text>Send Verification</Text>
            </TouchableOpacity>
        </View>
      
      
      
    );
  }