import React,{useState, useEffect} from 'react'
import { View, Text, FlatList, TextInput, Button } from 'react-native'
import firebase from '../firebase'

const Comments = (props) => {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState(null)

    // useEffect(()=>{

    //     if(props.route.params.postId !== postId){
    //         firebase.firestore().collection('feeds')
    //         .doc(props.route.params.postId)
    //         .collection('comments')
    //         .get()
    //         .then((snapshot)=>{
    //             let comments = snapshot.docs.map((doc)=>{
    //                 const data = doc.data();
    //                 const id = doc.id;
    //                 return{id, ...data}
    //             })
    //             setComments(comments)
    //             console.log('inside',comments)
    //         })
    //         setPostId(props.route.params.postId)
    //         console.log('outside',comments)
    //     }
    // },[props.route.params.postId])

    useEffect(()=>{
        let unsubscribe;
        if(props.route.params.postId) {
            unsubscribe = firebase.firestore()
            .collection('feeds')
            .doc(props.route.params.postId)
            .collection('comments')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc) => doc.data()))
            });
            setPostId(props.route.params.postId)
        }
        return () => {
            unsubscribe();
        };
    },[props.route.params.postId]);

    const onCommentSend=()=>{
        firebase.firestore().collection('feeds')
        .doc(props.route.params.postId)
        .collection('comments')
        .add({
            creator: firebase.auth().currentUser.uid,
            text
        }).then(()=>{
            setText('');
        })
        
    }
    return (
        <View style={{flex:1}}>
            <FlatList 
                numColumns={1}
                data={comments}
                horizontal={false}
                keyExtractor={item=>item.id}
                renderItem={({item})=>(
                    <View>
                        <Text>{item.text}</Text>
                    </View>
                )}
            />

            <TextInput 
                placeholder="Comment"
                onChangeText={(text)=>setText(text)}
            />
            <Button 
                onPress={()=>onCommentSend()}
                title="Send"
            />
        </View>
    )
}

export default Comments
