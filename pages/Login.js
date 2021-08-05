import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import firebase from '../firebase';
import { TextInput, Button } from 'react-native-paper';
import mainContext from '../context/mainContext';


const LoginScreen = ({ navigation }) => {
  const { handleLogin } = useContext(mainContext);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
              placeholder="+91XXXXXXXXXX"
              onChangeText={(phone) => setPhone(phone)}
              value={phone}
              label="Phone Number"
              keyboardType={'phone-pad'}
              autoCompleteType="tel"
              mode="outlined"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="OTP-CODE"
              onChangeText={(otp) => setOtp(otp)}
              value={password}
              secureTextEntry={true}
              label="Password"
              mode="outlined"
            />
          </View>
        {/* <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            onChangeText={(email) => setEmail(email)}
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
        </View> */}
        <Button
          onPress={() => handleLogin(email, password)}
          mode="contained"
          icon="login"
        >
          Login Button
        </Button>

        <Button
          title='Sign-Up'
          onPress={() => navigation.navigate('SignUp')}
        >
          Sign-up
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