import React, { useState, useContext ,useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Text
} from 'react-native';
import firebase from '../firebase';
import { TextInput, Button } from 'react-native-paper';
import mainContext from '../context/mainContext';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


const LoginScreen = ({ navigation }) => {
    const { handleLogin } = useContext(mainContext);
    const [phone, setPhone] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmResult, setConfirmResult] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [message, setMessage] = useState('Phone Number Doest Exist');
    const [displayMessage, setDisplayMessage] = useState(false);

    const validatePhoneNumber = () => {
        var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
        return regexp.test(phone)
    }
    const handleSendCode = () => {
        // Request to send OTP
        setDisplayMessage(true);
        if (validatePhoneNumber()) {
            //var applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            //var user = firebase.auth().currentUser;
            //console.log('user',user);
            firebase.firestore().collection('/Users').where('phoneNumber', '==', phone).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                setMessage('OTP Sent');
                console.log('User exists: ', doc.exists);
                if(doc.exists){
                  console.log(doc.id, " => ", doc.data());
                  firebase
                .auth()
                .signInWithPhoneNumber(phone,recaptchaVerifier.current)
                .then(confirmResult => {
                    setConfirmResult(confirmResult);
                    
                })
                .catch(error => {
                alert(error.message)
                console.log(error)
                })
                }
                
              });
          })
          .catch((error) => {
              console.log("Error getting documents: ", error);
              alert('phone doest exists')
          });
            
          } else {
            alert('Invalid Phone Number');
          }
    }
    const handleVerifyCode = () => {
        // Request for OTP verification
        if (otp.length == 6) {
          confirmResult
            .confirm(otp)
            .then(user => {
              console.log(`Verified! ${user.uid}`)
            })
            .catch(error => {
              alert(error.message)
              console.log(error)
            })
        } else {
          alert('Please enter a 6 digit OTP code.')
        }
      }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <FirebaseRecaptchaVerifierModal
                    ref={recaptchaVerifier}
                    firebaseConfig={firebase.app().options}
        />
        <View style={styles.inputContainer}>
            <TextInput
              placeholder="+91XXXXXXXXXX"
              onChangeText={(phone) => {setPhone(phone)
              setDisplayMessage(false)}}
              value={phone}
              label="Phone Number"
              keyboardType={'phone-pad'}
              autoCompleteType="tel"
              mode="outlined"
            />
        </View>
        <Button
            onPress={() => handleSendCode()}
            mode="contained"
            icon="login"
        >
            Send OTP
        </Button>
        {!displayMessage ? null : <Text>{message}</Text>}
        
        <View style={styles.inputContainer}>
            <TextInput
              placeholder="OTP-CODE"
              onChangeText={(otp) => setOtp(otp)}
              value={otp}
              //secureTextEntry={true}
              label="OTP"
              mode="outlined"
            />
        </View>
        <Button
          onPress={() => handleVerifyCode()}
          mode="contained"
          icon="login"
        >
          Login Button
        </Button>

        <Button
          title='Sign-Up'
          onPress={() => navigation.navigate('EmailLogin')}
        >
          Login through email
        </Button>
        <Button
          title='Sign-Up'
          onPress={() => navigation.navigate('SignUp')}
        >
          New user? Sign-up
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

export default LoginScreen;