import React,{useState,useEffect} from "react"
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    FlatList,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ImageBackground
} from "react-native";
import {
    Octicons,
    MaterialCommunityIcons,
    MaterialIcons,
    FontAwesome5,
    Fontisto
  } from '@expo/vector-icons';
import {useRoute} from "@react-navigation/native"
import {icons, COLORS, SIZES, FONTS,images} from "../constants";
import ChatMessage from "./ChatMessage";
import { ScrollView } from "react-native";
import InputBox from "./InputBox"
//import { SendMessage, ReceiveMessage } from "../Firebase/Message";
import firebase from "../firebase";

const ChatRoom =({navigation}) => {
    const [message, setMessage] = React.useState('');
    const [currentUid,setCurrentUid] = useState('');
    const [guestUid, setGuestUid] = useState('');
    //const route = useRoute();

    //console.log(route.params)
    // const [chatrooms, setChatrooms] = React.useState(null);

    // React.useEffect(() => {
    //     let {item} = route.params;

    //     setChatrooms(item)
    // })

    useEffect(()=>{
        const currentUid = firebase.auth().currentUser.uid;
        //console.log(currentUid);
        //const guestUid = route.params;
        //console.log('guestuid',guestUid);
        setCurrentUid(currentUid);
        //setGuestUid(guestUid);
    },[])
    const SendMessage = async(currentUid, guestUid, message) => {
        try {
            return await firebase.firestore().collection('Messegess').doc(currentUid).collection('ChatMessages').doc(guestUid.guestUid)
            .add({
                message: {
                                sender: currentUid,
                                receiver: guestUid,
                                msg: message
                            },
            })
        }
        catch(error){
            console.log('sendMessage',error);
        }
        // try{
        //     var senddb= firebase.firestore().collection('Messages').doc(currentUid);
        //     var db= senddb.collection('SenderMessage');
        //     return await db.add({
        //         message: {
        //             sender: currentUid,
        //             receiver: guestUid,
        //             msg: message
        //         },
                
        //     });
        // } catch(error){
        //     console.log('sendMessage error', error)
        // }
        
    }

    const ReceiveMessage = async(currentUid, guestUid, message) => {
        console.log('inside guestuid',guestUid)
        try {
            return await firebase.firestore().collection('Messegess').doc(guestUid.guestUid).collection('ChatMessages').doc(currentUid)
            .add({
                message: {
                                sender: currentUid,
                                receiver: guestUid,
                                msg: message
                            },
            })
        }

        catch(error){
            console.log('receiveMessage',error);
        }
        
        // try{
        //     return await firebase.firestore().collection('Messages').doc(currentUid).collection('ReceiverMessage').add({
        //         message: {
        //             sender: currentUid,
        //             receiver: guestUid,
        //             msg: message
        //         },
        //     });
            
        // } catch(error){
        //     console.log('receiveMessage error', error)
        // }
    }
    const sendMessage = async() => {
        if(message){
            // await SendMessage(currentUid, guestUid, message).then(
            //     () => {
            //         setMessage('')
            //     }
            // ).catch((error)=>{
            //     alert(error)
            // })

            await ReceiveMessage(currentUid, guestUid, message).then(
                () => {
                    setMessage('')
                }
            ).catch((error)=>{
                alert(error)
            })
            await SendMessage(currentUid, guestUid, message).then(
                () => {
                    setMessage('')
                }
            ).catch((error)=>{
                alert(error)
            })
        }
    }
    return (
        <SafeAreaView style={styles.container}>
               
                
                <ScrollView>
                
                <ChatMessage guestUid={guestUid} />
                

                </ScrollView>
                
                {/* <InputBox /> */}
                <View style={{ bottom: 0, height: 50, width: '100%', position: 'absolute', flexDirection: 'row', backgroundColor:'white' }}>
                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginRight: 5 }} onPress={() => {}}>
                        {/* <Icons name="camera" size={30} color="#fff" /> */}
                        <Fontisto name="camera" size={22} color="grey" style={{marginHorizontal: 5}}/>
                    </TouchableOpacity>
                    <View style={{ width: '75%', justifyContent: 'center' }}>
                        <TextInput value={message} onChangeText={(message)=>setMessage(message)} placeholder="Enter Message" placeholderTextColor="#000" style={{ height: 40, borderRadius: 20, backgroundColor: '#ccc',paddingHorizontal:5 }} />
                    </View>
                    <TouchableOpacity style={{ width: '10%', justifyContent: 'center', alignItems: 'center', marginLeft: 5 }} onPress={() => {sendMessage()}}>
                        {/* <Icons name="send" size={30} color="#fff" /> */}
                        <MaterialIcons name="send" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
                
                
            
            
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray4,
        //paddingTop: SIZES.padding2*2
    },
})

export default ChatRoom