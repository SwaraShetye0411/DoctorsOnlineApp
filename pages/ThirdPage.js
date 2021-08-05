// React Native Navigation Drawer
// https://aboutreact.com/react-native-navigation-drawer/

import React, { useState, useEffect,useRef } from 'react';
import { Button, TextInput, Text } from 'react-native';
import firebase from "../firebase";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

export default function PhoneVerification() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  const [code, setCode] = useState('');
  const [verificationId, setVerificationId] = useState(null);
  const recaptchaVerifier = useRef(null);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle create account button press
  async function createAccount() {
    try {
      await firebase.auth().createUserWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!');
      console.log('User account created & signed in!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    }
  }

  // Handle the verify phone button press
  async function verifyPhoneNumber(phoneNumber) {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    const confirmation=await phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current);
    setConfirm(confirmation);
    setVerificationId(confirmation);
  }

  // Handle confirm code button press
  async function confirmCode() {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      console.log(credential);
      let userData = await firebase.auth().currentUser.linkWithCredential(credential);
      console.log(userData.user);
      setUser(userData.user);
    } catch (error) {
      if (error.code == 'auth/invalid-verification-code') {
        console.log('Invalid code.');
      } else {
        console.log(error);
      }
    }
  }

  if (initializing) return null;

  if (!user) {
    return <Button title="Login" onPress={() => createAccount()} />;
  } else if (!user.phoneNumber) {
    if (!confirm) {
      return (
        <>
        <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebase.app().options}
        />
        <Button
          title="Verify Phone Number"
          onPress={() => verifyPhoneNumber('+918329797175')}
        />
        </>
      );
    }
    return (
      <>
        <TextInput value={code} onChangeText={text => setCode(text)} />
        <Button title="Confirm Code" onPress={() => confirmCode()} />
      </>
    );
  } else {
    return (
      <Text>
        Welcome! {user.phoneNumber} linked with {user.email}
      </Text>
    );
  }
}