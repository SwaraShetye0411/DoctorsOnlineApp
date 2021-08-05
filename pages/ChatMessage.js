import React,{useState,useEffect} from 'react';
import {
    Text,
    View,
    FlatList,
    ImageBackground
} from "react-native";
import moment from "moment";
import InputBox from './InputBox';
import {COLORS, FONTS, SIZES, images} from '../constants';
import firebase from '../firebase';
import {useRoute} from "@react-navigation/native"






const ChatMessage = (guestUid) => {
    const route = useRoute();
      // const [userInfo, setUserInfo] = useState(null);
      // const [messages, setMessages] = useState([]);

      // useEffect(() => {
      //   Auth.currentUserInfo().then((userInfo) => {
      //     setUserInfo(userInfo)
      //     console.log('userInfor',userInfo);
      //   })
      // }, [])

      // useEffect(() => {
      //   const fetchMessages = async() => {
      //     try{
      //       await API.graphql(
      //         graphqlOperation(
      //           messagesByChannelID, {
      //             channelID: '1',
      //             //sortDirection: 'DESC'
      //           }
      //         )).then((response) => {
      //           const items = response.data.messagesByChannelID.items;
      //           console.log('response',response);
      //           console.log(items);
      //           if (items) {
      //             setMessages(items);
      //           }
      //         });
      //     } catch(e){
      //       console.log(e);
      //     }
      //   }
      //   fetchMessages();
      // }, []);

      // useEffect(() => {
      //   const subscription = API
      //     .graphql(graphqlOperation(onCreateMessage))
      //     .subscribe({
      //       next: (event) => {
      //         setMessages([...messages, event.value.data.onCreateMessage]);
      //         //console.log(event.nativeEvent);
      //       }
      //     });
          
        
      //   return () => {
      //     subscription.unsubscribe();
      //   };
      // }, [messages]);
    const chats = {
        id: '1',
        users: [{
          id: 'u1',
          name: 'Vadim',
          imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
        }, {
          id: 'u2',
          name: 'Lukas',
          imageUri: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
        }],
        messages: [{
          id: 'm1',
          content: 'How are you, Lukas!',
          createdAt: '2020-10-10T12:48:00.000Z',
          user: {
            id: 'u1',
            name: 'Vadim',
          },
        }, {
          id: 'm2',
          content: 'I am good, good',
          createdAt: '2020-10-03T14:49:00.000Z',
          user: {
            id: 'u2',
            name: 'Lukas',
          },
        }, {
          id: 'm3',
          content: 'What about you?',
          createdAt: '2020-10-03T14:49:40.000Z',
          user: {
            id: 'u2',
            name: 'Lukas',
          },
        }, {
          id: 'm4',
          content: 'Good as well, preparing for the stream now.',
          createdAt: '2020-10-03T14:50:00.000Z',
          user: {
            id: 'u1',
            name: 'Vadim',
          },
        }, {
          id: 'm5',
          content: 'How is your uni going?',
          createdAt: '2020-10-03T14:51:00.000Z',
          user: {
            id: 'u1',
            name: 'Vadim',
          },
        }, {
          id: 'm6',
          content: 'It is a bit tough, as I have 2 specializations. How about yours? Do you enjoy it?',
          createdAt: '2020-10-03T14:49:00.000Z',
          user: {
            id: 'u2',
            name: 'Lukas',
          },
        }, {
          id: 'm7',
          content: 'Big Data is really interesting. Cannot wait to go through all the material.',
          createdAt: '2020-10-03T14:53:00.000Z',
          user: {
            id: 'u1',
            name: 'Vadim',
          },
        }]
      }
    const [chatData, setChatData] = React.useState(chats.messages);
    const [allMessages, setAllMessages] = useState([]);
    const [currentUid,setCurrentUid] = useState('');
    const [guesttUid,setGuestUid] = useState('');
    const [senderUid,setSenderUid] = useState('');
    const [receiverUid,setReceiverUid] = useState('');

    useEffect(()=>{
      const currentUid=firebase.auth().currentUser.uid;
      setCurrentUid(currentUid);
      console.log('chatmessage currentuid',currentUid);
      const guestUid = route.params.guestUid;
      console.log(guestUid);
      setGuestUid(guestUid);
      console.log('guesttUid',guesttUid);
      // try{
      //   firebase.firestore().collection('Messages').doc(currentUid).collection('SenderMessage').
      //   onSnapshot((querySnapshot)=>{
      //     let allMessages = [];
      //     querySnapshot.forEach((documentSnapshot)=>{
      //       let senduid=documentSnapshot.data().message.sender;
      //       console.log(senduid)
      //       let receiveuid=documentSnapshot.data().message.receiver.guestUid;
      //       allMessages.push({
      //         sendBy: documentSnapshot.data().message.sender,
      //         recievedBy: documentSnapshot.data().message.receiver,
      //         message: documentSnapshot.data().message.msg,
      //       })
      //       setSenderUid(senduid);
      //       setReceiverUid(receiveuid);
      //     })
      //     setAllMessages(allMessages);
      //     console.log('allmessages', allMessages);
          
      //     console.log('senderuid',senderUid);
          
      //     console.log('receiver uid',receiverUid);
      //     console.log('guets uid', guestUid);
      //   })
      // }
      // catch(error){
      //   console.log('chat message ', error)
      // }
      try{

      }
      catch(error){
        console.log('chat message',error)
      }
    }, [])

    

    function renderMessage() {
        console.log('inside', guesttUid);
        const renderItem =({item}) => (
          
            <View 
                style={{
                    padding: 10
                }}
            >
                <View
                    style={{
                        backgroundColor:item.sendBy === currentUid?'grey': 'white',
                        marginLeft: item.sendBy === currentUid? 50 : 0,
                        marginRight: item.sendBy === currentUid? 0: 50 ,
                        borderRadius: 5,
                        padding: 10
                    }}
                >
                    
                        {/* <Text
                            style={{
                                color: COLORS.primary,
                                fontWeight: 'bold',
                                marginBottom: 5
                            }}
                        >
                            {item.user.name}
                        </Text> */}
                    
                    <Text>{item.recievedBy.guestUid === guesttUid ? item.message:null}</Text>
                    <Text style={{ alignSelf: 'flex-end', color: 'black'}}>{moment(item.createdAt).fromNow()}</Text>
                </View>

            </View>
            
        )
        
        return (
            <ImageBackground
                source={images.bg_image}
                style={{
                    width:'100%',
                    height: '100%' ,
                    marginBottom: 50,
                }}
            >
              
                <FlatList 
                data={allMessages}
                //keyExtractor={index => index.toString()}
                renderItem={renderItem}
                inverted
                />
              
                
                

            </ImageBackground>
            
        )
    }
    return(
        <View style={{flex:1}}>
          
            {renderMessage(guesttUid)}
              
        </View>

    )
}

export default ChatMessage;