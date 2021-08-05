import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'

const Symptoms = ({navigation}) => {
    const [search,setSearch] = React.useState('');

    const updateSearch = (search) => {
        setSearch( search );
    };

    const symptomsCategoryData = [
        {
            id: 1,
            name: "Cough",
            icon: images.cold,
        },
        {
            id: 2,
            name: "Fever",
            icon: images.fever2,
        },
        {
            id: 3,
            name: "Period Issue",
            icon: images.period2,
        },
        {
            id: 4,
            name: "Hairfall",
            icon: images.cold,
        },
        {
            id: 5,
            name: "Depression",
            icon: images.fever2,
        },
        {
            id: 6,
            name: "Anxiety",
            icon: images.period2,
        },
        {
            id: 7,
            name: "Diabetes",
            icon: images.cold,
        },
        {
            id: 8,
            name: "Weight loss",
            icon: images.fever2,
        },
        {
            id: 9,
            name: "Acne/Pimples",
            icon: images.period2,
        },
        {
            id: 10,
            name: "Pregnancy Queries",
            icon: images.cold,
        },
        {
            id: 11,
            name: "Cough",
            icon: images.cold,
        },
        {
            id: 12,
            name: "Fever",
            icon: images.fever2,
        },
        {
            id: 13,
            name: "Period Issue",
            icon: images.period2,
        },
        {
            id: 14,
            name: "Hairfall",
            icon: images.cold,
        },
        {
            id: 15,
            name: "Depression",
            icon: images.fever2,
        },
        {
            id: 16,
            name: "Anxiety",
            icon: images.period2,
        },
        {
            id: 17,
            name: "Diabetes",
            icon: images.cold,
        },
        {
            id: 18,
            name: "Weight loss",
            icon: images.fever2,
        },
        {
            id: 19,
            name: "Acne/Pimples",
            icon: images.period2,
        },
        {
            id: 20,
            name: "Pregnancy Queries",
            icon: images.cold,
        },
    
    ]

    const [symptoms,setSymptoms] = React.useState(symptomsCategoryData)
    const renderSymptomsItem=({item})=>{
        return(
                <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    flex: 1,
                    margin: 5,
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                    height: 60,
                    borderRadius: 10,
                    backgroundColor: COLORS.white,
                    ...styles.shadow,
                    alignItems: 'center',
                    
                }}
                onPress={()=> {navigation.navigate('DoctorsPage')}}
                >
                    <Image 
                        source={item.icon}
                        resizeMode='contain'
                        style={{
                            width:40,
                            height:40
                        }}
                    />
                    <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 15, lineHeight: 18, flexShrink:1}}>{item.name}</Text>
                </TouchableOpacity>
            )
    }
    return (
        <View style={{flex:1,backgroundColor:'#fff'}}>
            <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',marginTop:10,color:'#086e5a'}}>What are your Symptoms?</Text>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search} 
                containerStyle={{
                    backgroundColor:'#fff',
                    borderTopWidth:0,
                    borderBottomWidth:0  
                }}  
            />
            
                <FlatList 
                    data={symptoms}
                    keyExtractor={item=>item.id}
                    renderItem={renderSymptomsItem}
                    numColumns={2}
                />
            
        </View>

        
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
      height: 40,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      
    },
    buttonText1: {
      fontSize: 16,
      color: 'black',
      fontWeight:'bold'
    },
  });

export default Symptoms;
