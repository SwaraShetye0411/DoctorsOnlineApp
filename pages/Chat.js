import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, InputToolbar,Actions,Composer } from 'react-native-gifted-chat'
import { View, Text,Image } from 'react-native'
import {COLORS, FONTS, SIZES, images} from '../constants';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermission'
import ImgToBase64 from 'react-native-image-base64';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
//import Fire from '../utilities/Fire'
import * as FileSystem from 'expo-file-system';
import { v4 as uuidv4 } from 'uuid';

import { Entypo } from '@expo/vector-icons';
import firebase from '../firebase'
import * as DocumentPicker from 'expo-document-picker';
// import DocumentPicker from 'react-native-document-picker';

const Chat = ({route}) => {
    const [messages, setMessages] = useState([]);
    const userUid = firebase.auth().currentUser.uid;  
    const [image, setImage] = useState(null)
    const {guestKey} = route.params;
    //console.log(guestKey)

    const getAllMessages = async()=>{
        const docid = guestKey > userUid ? userUid+'-'+guestKey : guestKey+'-'+userUid;
        const querySnap = await firebase.firestore().collection('chatrooms')
                            .doc(docid)
                            .collection('messages')
                            .orderBy('createdAt','desc')
                            .get()
        const allmsg=querySnap.docs.map(docSnap=>{
            return {
                ...docSnap.data(),
                createdAt: docSnap.data().createdAt.toDate()
            }
        })
        setMessages(allmsg)
    }

    
    
    useEffect(() => {
        const docid = guestKey > userUid ? userUid+'-'+guestKey : guestKey+'-'+userUid;
        
        const messageRef=firebase.firestore().collection('chatrooms')
                            .doc(docid)
                            .collection('messages')
                            .orderBy('createdAt','desc')
        messageRef.onSnapshot((querySnap)=>{
            const allmsg=querySnap.docs.map(docSnap=>{
                const data = docSnap.data()
                //console.log(data)
                if(data.createdAt){
                    return {
                        ...docSnap.data(),
                        createdAt: docSnap.data().createdAt.toDate()
                    }
                } else{
                    return {
                        ...docSnap.data(),
                        createdAt: new Date()
                    }
                }
                
            })
            setMessages(allmsg)
        })
        //UserPermissions.getPermissionAsync()

        
                            
        // getAllMessages()
        // setMessages([
        //   {
        //     _id: 1,
        //     // text: 'Ajay',
        //     image:'https://placeimg.com/140/140/any',
        //     createdAt: new Date(),
        //     user: {
        //       _id: 2,
        //       name: 'React Native',
        //       avatar: 'https://placeimg.com/140/140/any',
        //     },
        //   },
        // ])
      }, [])


      function openGallery() {
        launchImageLibrary('photo', (response) => {
            //this.setState({ loader: true });

            ImgToBase64.getBase64String(response.uri)
                .then(async (base64String) => {
                    let source = "data:image/jpeg;base64," + base64String;
                    setImage(source);
                    // SendMessage(this.state.currentUid, this.state.guestUid, "", source).
                    //     then((res) => {
                    //         this.setState({ loader: false })
                    //     }).catch((err) => {
                    //         alert(err)
                    //     })

                    // RecieveMessage(this.state.currentUid, this.state.guestUid, "", source).
                    //     then((res) => {
                    //         this.setState({ loader: false })
                    //     }).catch((err) => {
                    //         alert(err)
                    //     })
                    onSend("",source).then((res)=>{
                        console.log('Image submitted successfully',res);
                    }).catch((err)=>{
                        alert(err)
                    })
                })
                .catch(err => console.log('open gallery',err));
        })
    }
      
    //   const upload = () => {
    //       console.log('image',image)
    //       Fire.shared.addPhoto(image).then(()=>{
    //         setImage(null)
    
    //     })
    //     .catch(err=>{
    //       alert(err.message)
    //     })
    //   }

      const pickImage = async () => {
        setImage(null)
        console.log('imgeeee',image);
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          //allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5
        });
        
        console.log(result);
        
        if (!result.cancelled) {
            console.log('result')
            
            console.log('result image',result.uri)
            const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' });
            //console.log(base64);
            let text;
            const source = "data:image/jpeg;base64," + base64;
            setImage(source)
            onSend('',source).then((res)=>{
                        console.log('Image submitted successfully');
                        setImage(null)
                    }).catch((err)=>{
                        alert(err)
                    })
            // ImgToBase64.getBase64String(result.uri).then(async (base64String) =>{
            //     let source = "data:image/jpeg;base64," + base64String;
            //     setImage(source)
            //     onSend("",source).then((res)=>{
            //         console.log('Image submitted successfully',res);
            //     }).catch((err)=>{
            //         alert(err)
            //     })
            // }).catch(err => console.log('pick image',err));
        //     Fire.shared.addPhoto(result.uri).then(()=>{
        //     setImage(null)
      
        // })
        //   .catch(err=>{
        //     alert(err.message)
        //   })
        }
      };

      
        // const pickFile = async () => {
        //     let result = await DocumentPicker.getDocumentAsync({});
        //       console.log(result.uri);
        //       console.log(result);
        // }
        const pickFile=async()=> {
            try {
              const res = await DocumentPicker.getDocumentAsync({
                type: '*/*',
              });
              console.log('selectOneFile() : ' + JSON.stringify(res));
            //   this.setState({ singleFile: res });
            }
            catch (err) {
            console.log(err)
            }
          }
    
    
      const onSend = (messageArray,source) => {
        console.log('onsend image',image);
        console.log('msg',messageArray)
        const msg = messageArray[0]
        const mymsg = {
            ...msg,
            _id:uuidv4(),
            image: source,
            sentBy:userUid,
            sentTo:guestKey,
            user:{
                _id:userUid
            },
            createdAt: new Date()
        }  
        console.log(mymsg);
        setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg))
        const docid = guestKey > userUid ? userUid+'-'+guestKey : guestKey+'-'+userUid

        firebase.firestore().collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .add({...mymsg, createdAt:firebase.firestore.FieldValue.serverTimestamp()})


      }
    // const onSend=(messages)=>{
        
    //     setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    // };
      const renderActions = (props) => (
        <>
          <Actions
            {...props}
            icon={() =>
            <Entypo name="images" size={24} color="black" />}
            onPressActionButton={pickImage}
            //onSend={image=>onSend('',image)}
          />
          <Actions
            {...props}
            icon={() =>
            <Entypo name="attachment" size={24} color="black" />}
            onPressActionButton={pickFile}
            //onSend={image=>onSend('',image)}
          />
          
        </>
      )
      const renderComposer = (props) => (
        <Composer {...props}  >
            {image === null? null: <View><Image source={{uri:image}} style={{width:'100%', height:'100%'}}></Image>
            </View>}
        </Composer>
      )
    return (
        <View style={{flex:1}}>
            <GiftedChat
                messages={messages}
                onSend={(messages,image)=>onSend(messages,'')}
                user={{
                    _id: userUid,
                }}
                // user={{
                //     _id: 1,
                // }}
                renderBubble={(props)=>{
                    return <Bubble
                        {...props}
                        wrapperStyle={{
                            right: {
                                backgroundColor: '#086e5a'
                            },
                            left: {
                                backgroundColor: '#ddd',
                            }
                            
                        }}
                        
                    />
                }}
                renderInputToolbar={(props)=>{
                    return <InputToolbar {...props}
                     containerStyle={{ borderTopColor: 'green'}} 
                     textInputStyle={{ color: "black" }}
                     >
                         {/* {image === null? <Text>hi</Text>: <View style={{flex:1}}><Image source={{uri:image}} style={{width:'100%', height:'100%'}}></Image>
            </View>} */}
                     </InputToolbar>
                }}
                renderActions={renderActions}
                alwaysShowSend
                renderComposer={renderComposer}
                // isKeyboardInternallyHandled={false}
                parsePatterns={linkStyle => [
                    {
                      pattern: /#(\w+)/,
                      style: { ...linkStyle, color: 'lightgreen' },
                      onPress: props => alert(`press on ${props}`),
                    },
                  ]}
            />

        </View>
    )
}

export default Chat
