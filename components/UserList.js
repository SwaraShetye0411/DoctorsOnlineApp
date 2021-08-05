import React from 'react'
import {View, Text, TouchableOpacity,Image} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, icons, images, SIZES, FONTS } from "../constants";
import { useNavigation } from '@react-navigation/native';
import { withNavigation } from 'react-navigation';
import UserForm from './UserForm';


function UserList({user,navigation}) {
    

    
    //console.log(user.name)
    return (
        <View
            style={{
                paddingHorizontal: SIZES.padding *2 ,
                alignItems: 'center',
                marginTop:10,
                
            }}
        >
            <TouchableOpacity 
                onPress={() => navigation.navigate('UserForm')}
            >
                {user.icon==images.avatar_1 ? <Image source={user.icon}  style={{width:50, height:50}} />:<MaterialCommunityIcons name={user.icon} size={50} color="black" />}
                
            </TouchableOpacity>
            <Text>{user.name}</Text>
            
            
        </View>
    )
}

export default UserList
