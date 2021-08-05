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
//import mainContext from '../context/mainContext';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';


const EmailLogin = ({ navigation }) => {
    // const { handleLogin } = useContext(mainContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmResult, setConfirmResult] = useState(null);
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

      const handleLogin = async (email, password) => {
        //setIsLoading(true);
        
        firebase.auth()
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error));
      };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email-Id"
              onChangeText={(email) => {setEmail(email)}}
              value={email}
              label="Email"
              keyboardType={'email-address'}
              mode="outlined"
            />
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
        <Button
          onPress={() => handleLogin(email,password)}
          mode="contained"
          icon="login"
        >
          Login Button
        </Button>

        <Button
          title='Sign-Up'
          onPress={() => navigation.navigate('PhoneOtp')}
        >
          Login through Phone-OTP
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

export default EmailLogin;