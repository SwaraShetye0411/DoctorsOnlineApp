import React from 'react'
import { View, Text, StyleSheet, Button, Image, TouchableOpacity } from 'react-native'
import { Ionicons } from 'react-native-vector-icons'

const PostCard = ({item, navigation}) => {
    const likeIcon = item.liked? 'heart': 'heart-outline'
    const likeIconColor = item.liked ? '#2e64e5': "#333";

    if(item.likes == 1){
        likeText='1 Like';
    } else if(item.likes > 1){
        likeText =item.likes + ' Likes';
    } else {
        likeText= 'Like'
    }

    if(item.comments == 1){
        commentText='1 Comment';
    } else if(item.comments > 1){
        commentText =item.comments + ' Comments';
    } else {
        commentText= 'Comment'
    }
    return (
        <View style={styles.card}>
                <View style={styles.userInfo}>
                    <Image 
                        style={styles.userImage}
                        source={{uri:item.userImg}}
                    />
                    <View style={styles.userInfoText}>
                        <Text style={styles.userName}>{item.userName}</Text>
                        {/* <Text style={styles.PostTime}>{item.createdAt.nanoseconds}</Text> */}
                    </View>
                </View>
                <Text style={styles.PostText}>{item.post}</Text>
                {item.downloadURL != null? <Image 
                    source={{uri:item.downloadURL}}
                    style={styles.PostImage}
                />:<View style={styles.Divider}></View> }
                
                {/* <View style={styles.Divider}></View> */}
                <View style={styles.InteractionWrapper}>
                    <TouchableOpacity style={styles.Interaction}>
                        <Ionicons name={likeIcon} size={23} color={likeIconColor}/>
                        <Text style={styles.InteractionText}>Likes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Interaction} onPress={()=>navigation.navigate('Comments',{postId: item.id})}>
                        <Ionicons name="md-chatbubble-outline" size={23}/>
                        <Text style={styles.InteractionText} >Comments</Text>
                    </TouchableOpacity>
                </View>
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

export default PostCard
