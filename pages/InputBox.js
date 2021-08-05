import React,{useState,useEffect} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto, MaterialIcons} from "@expo/vector-icons"
import { TextInput } from "react-native";
import { SIZES,images, COLORS } from "../constants";
import { ImageBackground } from "react-native";



const InputBox = () => {
    const [messageBody, setMessageBody] = useState('');
    const [message, setMessage] = React.useState('');
    // const [userInfo, setUserInfo] = useState(null);

    // useEffect(() => {
    //     Auth.currentUserInfo().then((userInfo) => {
    //       setUserInfo(userInfo)
    //     })
    //   }, [])

    // const handleChange = (event) => {
    //     console.log('event',event);
    //     setMessageBody(event);
    // };

    const onMicrophonePress =() => {
        console.warn('Microphone')
    }

    const onSendPress =() => {
        console.warn(`Sending: ${message}`)
        setMessage('');
    }

    
      


    const onPress =() => {
        if(!message) {
            onMicrophonePress();
        } else {
            onSendPress();
        }
    }
    return (
        <ImageBackground
            source={images.bg_image}
            style={{
                width:'100%'
            }}
        >
            <View
            style={{
                flexDirection: 'row',
                margin: 10,
                alignItems: 'flex-end'
               
                
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    padding: 10,
                    borderRadius: 25,
                    marginRight: 10,
                    flex: 1,
                    alignItems: 'flex-end'
                }}
            >
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput 
                    style={{
                        flex: 1,
                        marginHorizontal: 10
                    }}
                    multiline
                    onChangeText={setMessage(message)}
                    value={message}
                    placeholder={'Type a message'}
                />
                <Entypo name="attachment" size={24} color="grey" style={{marginHorizontal: 5}}/>
                {!message && <Fontisto name="camera" size={24} color="grey" style={{marginHorizontal: 5}}/>}
            </View>
            <TouchableOpacity onPress={onPress}>
                <View
                    style={{
                        backgroundColor: COLORS.tint,
                        borderRadius: 50,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    {
                        !message ? 
                        <MaterialCommunityIcons name="microphone" size={28} color="white" />
                        :
                        <MaterialIcons name="send" size={28} color="white" />
                    }
                
                </View>

            </TouchableOpacity>
            
        </View>

        </ImageBackground>
        
    )
}

export default InputBox;