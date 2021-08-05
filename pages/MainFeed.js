import React from 'react'
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'
import PostCard from './PostCard';
import firebase from '../firebase'

const Posts = [
    {
        id: '1',
        userName: 'JennyDoe',
        userImg: 'https://placeimg.com/140/140/any',
        postTime:'4 mins ago',
        post: 'Hey There, this is my test for a post of my social app in React Native',
        postImg:'https://placeimg.com/140/140/any',
        liked: true,
        likes: '14',
        comments: '5',
    },
    {
        id: '2',
        userName: 'JohnDoe',
        userImg: 'https://placeimg.com/140/140/any',
        postTime:'2 hours ago',
        post: 'Hey There, this is my test for a post of my social app in React Native',
        postImg:'none',
        liked: false,
        likes: '8',
        comments: '0',
    },
]

const MainFeed = ({navigation}) => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        const fetchPosts = async() =>{
            
            try{
                const list = [];

                await firebase.firestore()
                .collection('feeds')
                .get()
                .then((querySnapshot)=>{
                    querySnapshot.forEach((doc) => {
                        const {
                          userId,
                          post,
                          downloadURL,
                          createdAt,
                          likesCount,
                        } = doc.data();
                        list.push({
                          id: doc.id,
                          userId,
                          userName: 'Test Name',
                          userImg:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
                          createdAt,
                          post,
                          downloadURL,
                          likesCount,
                        });
                      });
                })
                setPosts(list);

                if(loading){
                    setLoading(false);
                }
                console.log('Posts',list)
            } catch(err){
                console.log(err)
            }
        }
        fetchPosts()
    },[loading])
    // useEffect(()=>{
        
    //     firebase.firestore().collection('feeds')
    //      .onSnapshot(snapshot=>{
    //         const list = []
    //          snapshot.docs.map((doc)=>({id:doc.id,list:doc.data()}))
             
    //      })
         
    // },[])

    // useEffect(()=>{
    //     const list = [];
    //     firebase.firestore().collection('feeds')
    //     .onSnapshot(snapshot=>{
    //         setPosts(snapshot.docs.map((doc) => {
    //                                 const {
    //                                   userId,
    //                                   post,
    //                                   downloadURL,
    //                                   createdAt,
    //                                   likesCount,
    //                                 } = doc.data();
    //                                 const id = doc.id;
    //                                 list.push({
    //                                   id: id,
    //                                   userId,
    //                                   userName: 'Test Name',
    //                                   userImg:'https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg',
    //                                   createdAt,
    //                                   post,
    //                                   downloadURL,
    //                                   likesCount,
    //                                 });
    //                               }))
                                  
            
            
    //     })
        

    //             if(loading){
    //                 setLoading(false);
    //             }
    // },[])
    return (
        <View style={styles.container}>
             <FlatList 
                data={posts}
                renderItem={({item}) => <PostCard item={item} navigation={navigation}/>}
                keyExtractor={item=>item.id}
                showsVerticalScrollIndicator={false}
             />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20,
    },
    card:{
        backgroundColor: '#f8f8f8',
        width: '100%',
        marginBottom: 20,
        borderRadius: 10
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 15,
    },
    userImage:{
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userInfoText: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10,
    },
    userName:{
        fontSize: 14,
        fontWeight: 'bold',
    },
    PostTime:{
        fontSize: 12,
        color: '#666',
    },
    PostText:{
        fontSize: 14,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 15,
    },
    PostImage:{
        width:'100%',
        height: 250,
    },
    Divider:{
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
        width: '92%',
        alignSelf: 'center',
        marginTop: 15
    },
    InteractionWrapper:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
    },
    Interaction:{
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:5,
        paddingVertical:2,
        paddingHorizontal: 5,
        // background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
    },
    InteractionText:{
        fontSize: 12,
        fontWeight: 'bold',
        // color: ${props => props.active ? '#2e64e5' : '#333'};
        marginTop: 5,
        marginLeft: 5,
    }
})

export default MainFeed