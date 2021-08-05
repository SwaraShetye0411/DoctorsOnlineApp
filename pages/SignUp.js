import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';

import { TextInput, Button } from 'react-native-paper';
import mainContext from '../context/mainContext';
//import { firestore } from '../firebase';
import firebase from '../firebase';

const SignUp = ({ navigation }) => {
  const { handleSignup } = useContext(mainContext);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPhone,setConfirmPhone] = useState(false);
  const [confirmEmail,setConfirmEmail] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  //console.log(mainContext);
  const createUserDocument = async (user, name, phone) => {
    if (!user) {
      return
    }
    

    const userRef = firebase.firestore().collection('/Users').doc(user.uid);

    const snapshot = await userRef.get();
    console.log('snapshot',snapshot);
    console.log('before name',name);

    if(!snapshot.exists) {
      const {email} = user;
      const displayName = name;
      const phoneNumber = phone;

      console.log('after snapshot email',email);
      console.log('after snapshot displayname',displayName);
      console.log('after snapshot phonenumber',phoneNumber);

      try {
        
              userRef.set({
                displayName: displayName,
                email: email,
                phoneNumber: phoneNumber,
                createdAt: new Date()
              })
            
      } catch(error) {
        console.log('error in creating user', error);
      }
    }
  }

  const Signup = async (email, password) => {
    //setIsLoading(true);
    console.log(confirmPhone);
    
      try{
        const {user} = await firebase.auth().createUserWithEmailAndPassword(email,password)
        var current = firebase.auth().currentUser;
        console.log('current',current);
        console.log('signup user',user);
        console.log('signup name',name);
        console.log('signup-phone',phone);
        await createUserDocument(user,name,phone);
      }
      catch(error) {
        setConfirmEmail(true);
        setEmail('');
        console.log('error signup',error);
        //alert(error);
      }
    
    // else{
    //   alert('Please feed in correct details')
    // }
    
  };

  const validatePhoneNumber = () => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(phone)
  }

  const phoneCheck= async(phone) => {
    setPhone(phone);
    setConfirmPhone(false);
    if(validatePhoneNumber()){
      
      await firebase.firestore().collection('/Users').where('phoneNumber','==',phone).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log('User exists: ', doc.exists);
          if(doc.exists){
            //alert('Phone number already in use');
            setConfirmPhone(true);
            setPhone('')
          }
          else{
            setConfirmPhone(false);
          }
          // setConfirmPhone(doc.exists ? true : false);
          // if(doc.exists){
          //     alert('Phone number already in use');
          //     setPhone('')
          //   }
        });
      }) 
    }
    

  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            onChangeText={(name) => {setName(name)
                                     console.log(name)   }}
            value={name}
            label='Full Name'
            mode="outlined"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="+91XXXXXXXXXX"
            onChangeText={(phone)=>phoneCheck(phone)}
            value={phone}
            label='Phone Number'
            keyboardType={'phone-pad'}
            mode="outlined"
          />
          {confirmPhone? <Text>Phone Number Already Exists</Text>: null }
        </View>
        

        
        
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            onChangeText={(email) => {setConfirmEmail(false);
                                      setEmail(email)
                          }}
            value={email}
            label="Email"
            keyboardType={'email-address'}
            mode="outlined"
          />
          {confirmEmail? <Text>Email Already Exists</Text>: null }
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            value={password}
            secureTextEntry={true}
            label="Password"
            mode="outlined"
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
            value={confirmPassword}
            secureTextEntry={true}
            label="Confirm Password"
            mode="outlined"
          />
        </View> */}

        <Button
          mode="contained"
          icon="login"
          onPress={() => Signup(email, password)}
        >
          Sign-Up
        </Button>
        <Button
          // mode="contained"
          // icon="login"
          onPress={() => navigation.goBack()}
        >
          Already have an account? Login
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SignUp;