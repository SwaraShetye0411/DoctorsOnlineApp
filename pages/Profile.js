import React from 'react'
import { View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, icons, images, SIZES, FONTS } from "../constants";
import UserList from '../components/UserList';


const Profile=({navigation})=> {
    const categoryData = [
        {
            id: 1,
            name: "Ajay",
            icon: images.avatar_1,
        },
        {
            id: 2,
            name: "Add Mom",
            icon: 'plus-circle-outline',
        },
        {
            id: 3,
            name: "Add Dad",
            icon: 'plus-circle-outline',
        },
        {
            id: 4,
            name: "Add Husband",
            name1: "Add Wife",
            icon: 'plus-circle-outline',
        },
        {
            id: 5,
            name: "Add Daughter",
            icon: 'plus-circle-outline',
        },
        {
            id: 6,
            name: "Add Son",
            icon: 'plus-circle-outline',
        },
        {
            id: 7,
            name: "Add Sister",
            icon: 'plus-circle-outline',
        },
        {
            id: 8,
            name: "Add Brother",
            icon: 'plus-circle-outline',
        },

    ]
    const [categories, setCategories] = React.useState(categoryData);
    

    
    return (
        <SafeAreaView style={{backgroundColor: '#fff',flex:1}}>
            <FlatList 
                data={categories}
                renderItem={({item}) => <UserList user={item} navigation={navigation}/>}
                keyExtractor={item=> item.id}
                horizontal
                showsHorizontalScrollIndicator={false}

            />
            
        </SafeAreaView>
    )
}

export default Profile;
