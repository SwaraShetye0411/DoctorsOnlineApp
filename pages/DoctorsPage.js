import React,{useState, useEffect} from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Pressable,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { icons, images, SIZES, COLORS, FONTS } from '../constants';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firebase from '../firebase';





const DoctorsPage = ({navigation}) => {
    const categoryData = [
        {
            id: 1,
            name: "Dr. Pratik Rajendra Verma",
            field:'MBBS, MD (Dermatology)',
            years:'13 years exp',
            icon: images.doc1,
        },
        {
            id: 2,
            name: "Dr. Pratik Rajendra Verma",
            field:'MBBS, MD (Dermatology)',
            years:'13 years exp',
            icon: images.doc2,
        },
        {
            id: 3,
            name: "Dr. Pratik Rajendra Verma",
            field:'MBBS, MD (Dermatology)',
            years:'13 years exp',
            icon: images.doc1,
        },
        {
            id: 4,
            name: "Dr. Pratik Rajendra Verma",
            field:'MBBS, MD (Dermatology)',
            years:'13 years exp',
            icon: images.doc1,
        },
        {
          id: 5,
          name: "Dr. Pratik Rajendra Verma",
          field:'MBBS, MD (Dermatology)',
          years:'13 years exp',
          icon: images.doc2,
      },
      ]
      const [category,setCategory] = React.useState(categoryData);
      const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
      const [dateValue, setDateValue] = React.useState('');
      const [rooms, setRooms] = useState([]);

      const [loading, setLoading] = useState(true);
      const [users, setUsers] = useState([]);

      useEffect(()=> {
        const subscriber = firebase.firestore().collection('Users')
        .onSnapshot((querySnapshot)=>{
          const users = [];
          const phone = firebase.auth().currentUser.phoneNumber;
          const uid = firebase.auth().currentUser.uid;
          console.log('current user phone', phone);
          console.log('current user id', uid);
          querySnapshot.forEach(documentSnapshot => {
            console.log('document data',documentSnapshot.data().phoneNumber);
            console.log('guest uid', documentSnapshot.id,documentSnapshot.data().displayName)
            if(phone == documentSnapshot.data().phoneNumber || uid == documentSnapshot.id){

            }
            else{
              users.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
              
            }
            
          });
          setUsers(users);
          console.log('users',users);
          setLoading(false);
        });
        return () => subscriber()
      },[])

      if (loading) {
        return <ActivityIndicator />;
      }

      


        const showDatePicker = () => {
          setDatePickerVisibility(true);
        };

        const hideDatePicker = () => {
          setDatePickerVisibility(false);
        };

        const handleConfirm = (date) => {
          setDateValue(date);
          Alert.alert("You have booked successfully");
          hideDatePicker();
        };
      
      

      function renderDoctors(){
        const CreateRoom=async({item})=>{
          const Cuid = firebase.auth().currentUser.uid;
          const roomRef = firebase.firestore().collection('Rooms').doc(item.key)
          console.log('item key',item.key);
          // const roomRef = firebase.firestore().collection('rooms').doc(item.key);
          // const snapshot = await roomRef.get();

          // if(!snapshot.exists){
          //   try{
          //     roomRef.add({
          //       DocName: 'Ram',
          //       CurrentUserId: Cuid,
          //     }).then(
          //       console.log('Successfully created a room')
          //     )
          //   }
          //   catch(error) {
          //     console.log('error in creating room', error);
          //   }
          //   }
            
          // firebase.firestore().collection('rooms').doc(item.key).add(
          //   {
          //     DocName: 'Ram',
          //     CurrentUserId: Cuid,
          //   }
          // ).then(
          //   console.log('Successfully created a room')
          // ).catch((error)=>{console.log('Room Creation Error',error)})
          // navigation.navigate('ChatRoom')
        }
        const renderItem=({item}) => {
          return(
            // <TouchableOpacity
            //   style={{
                
                
            //     flex: 1,
            //     margin: 5,
            //     paddingVertical: 5,
            //     paddingHorizontal: 5,
            //     height: '100%',
            //     borderRadius: 10,
            //     backgroundColor: COLORS.white,
            //      ...styles.shadow,
            //     alignItems: 'center',
                
            //   }}
            //   onPress={()=> {}}
            // >
            //   <View
            //     style={{
            //       flexDirection: 'row',
            //     }}
            //   >
            //   <Image 
            //     source={item.icon}
            //     resizeMode='cover'
            //     style={{
            //       width:90,
            //       height:100,
            //       borderRadius: 10,
            //     }}
            //   />
            //   <View 
            //     style={{
            //       alignItems:'flex-start',
            //       justifyContent:'flex-start',
            //       paddingTop: 5
            //     }}
            //   >
                
            //     <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 22, lineHeight: 22, flexShrink:1,fontWeight:'bold'}}>{item.name}</Text>
            //     <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 18, lineHeight: 22, flexShrink:1,}}>{item.field}</Text>
            //     <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 18, lineHeight: 22, flexShrink:1,}}>{item.years}</Text>
            //   </View>
            //   </View>
              
              
            // </TouchableOpacity>
            <Card 
              containerStyle={{
                borderRadius:10,
                flex:1,
                marginBottom:5
              }}
            >
              {/* <Card.Title>HELLO WORLD</Card.Title>
              <Card.Divider/> */}
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom:5
                }}
              >
              <Image 
                source={images.doc1}
                resizeMode='cover'
                style={{
                  width:90,
                  height:100,
                  borderRadius: 10,
                }}
              />
              <View 
                style={{
                  alignItems:'flex-start',
                  justifyContent:'flex-start',
                  paddingTop: 5,
                  //width:'100%',
                  flex:1
                }}
              >
                
                <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 22, lineHeight: 22, flexShrink:1,fontWeight:'bold'}}>{item.displayName}</Text>
                <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 18, lineHeight: 22,}}>MBBS, MD (Dermatology)</Text>
                <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 18, lineHeight: 22, flexShrink:1,}}>13 years exp</Text>
              </View>
              </View>
              <Card.Divider/>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Pressable 
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#086e5a' : '#fff',
                      color: pressed ? '#fff' : '#000',
                    },
                    styles.button1,
                    
                  ]}
                  onPress={showDatePicker}
                >
                  <Text style={styles.buttonText1}>Book Appointment</Text>
                </Pressable>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Pressable 
                  style={({pressed}) => [
                    {
                      backgroundColor: pressed ? '#086e5a' : '#fff',
                    },
                    styles.button1,
                    
                    
                  ]}
                  onPress={()=>navigation.navigate('Chat',{guestKey:item.key})}
                >
                  <Text style={
                    styles.buttonText1
                  }>Consult Now</Text>
                </Pressable>
              </View>
              
              {/* <Card.Image source={item.icon} />
                <Text style={{marginBottom: 10}}>
                  The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                  icon={<Icon name='code' color='#ffffff' />}
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='VIEW NOW' /> */}
              
            </Card>

          )
        }
        return(

            <FlatList 
                  data={users}
                  renderItem={renderItem} 
              /> 
          
          
        )
      }
    return (
      
        <ScrollView style={{
            //marginTop:5,
            //marginHorizontal:10,
            //flex: 1,
            //...styles.shadow,
            height: '100%',
            backgroundColor: '#fff',
            //paddingTop: 5, 
            //borderRadius: 10,
            //margin: 2
            }}>
              <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold'}}>Choose Your Doctor</Text>
              <View style={{flex:1}}>
                {renderDoctors()}
              </View>
                 
        </ScrollView>
      
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 130
    },
    contentContainer: {
      alignItems: 'center',
      marginBottom: 20
    },
    image: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
      marginBottom: 20
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      color: '#FD0139'
    },
    text: {
      fontSize: 20,
      fontWeight: '400',
      color: '#000'
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
          width: 10,
          height:10,
      },
      shadowOpacity: 1,
      shadowRadius: 3.84,
      elevation: 3.5,
  },
    button: {
      borderRadius: 8,
      padding: 6,
      height: 40,
      width: '70%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      
    },
    buttonText: {
      fontSize: 16,
      color: 'white',
    },
    button1: {
      borderRadius: 8,
      padding: 6,
      height: 45,
      width: '45%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      
      
    },
    buttonText1: {
      fontSize: 14,
      //color: 'black',
      fontWeight:'bold'
    },
})

export default DoctorsPage
