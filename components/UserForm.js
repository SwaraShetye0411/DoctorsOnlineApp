import React, {useState} from 'react';
import {View, Text, Image, TextInput,StyleSheet, Button,ScrollView} from 'react-native';
import { COLORS, icons, images, SIZES, FONTS } from "../constants";
import { RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

function UserForm() {
    const [selectedLanguage, setSelectedLanguage] = useState();
    // const pickerRef = React.useRef();

    // function open() {
    // pickerRef.current.focus();
    // }

    // function close() {
    // pickerRef.current.blur();
    // }
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Mother', value: 'mom'},
        {label: 'Father', value: 'dad'},
        {label: 'Brother', value: 'brother'},
        {label: 'Sister', value: 'sister'},
        {label: 'Wife', value: 'wife'},
        {label: 'Husband', value: 'husband'},
        {label: 'Son', value: 'son'},
        {label: 'Daughter', value: 'daughter'},
        {label: 'Relative', value: 'relative'},
        {label: 'Friend', value: 'friend'},
    ]);

    const [openOption,setOpenOption] = useState(false);
    const [valueOption, setValueOption] = useState(null);
    const [itemsOption, setItemsOption] = useState([
        {label: 'A+', value: 'A+'},
        {label: 'A-', value: 'A-'},
        {label: 'B+', value: 'B+'},
        {label: 'B-', value: 'B-'},
        {label: 'AB+', value: 'AB+'},
        {label: 'AB-', value: 'AB-'},
        {label: 'O+', value: 'O+'},
        {label: 'O-', value: 'O-'},
        
    ]);
    
    return (
        <ScrollView style={styles.container}>
        <View>
            <View style={{flexDirection: 'row', marginTop:20}}>
                <Image 
                    source={images.avatar_4}
                    resizeMode="contain"
                    style={{
                        width:70,
                        height:70, 
                    }}
                />
                <View style={{flex: 1}}>
                    <Text>Name*</Text>
                    <TextInput style={styles.inputStyle}/>
                </View>
            </View>
            <View style={{marginTop: 20}}>
                <Text>Gender*</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop: 10}}>
                    <View style={{
                        width: '30%',
                        height: 60,
                        borderColor: 'black',
                        borderRadius:10,
                        borderWidth: 2,
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image 
                            source={images.avatar_1}
                            resizeMode="contain"
                            style={{
                                width:40,
                                height:40
                            }}
                        
                        />
                        <Text>Female</Text>
                    </View>
                    <View style={{
                        width: '33%',
                        height: 60,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius:10,
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image 
                            source={images.avatar_2}
                            resizeMode="contain"
                            style={{
                                width:40,
                                height:40
                            }}
                        
                        />
                        <Text>Male</Text>
                    </View>
                    <View style={{
                        width: '33%',
                        height: 60,
                        borderColor: 'black',
                        borderWidth: 2,
                        borderRadius:10,
                        flexDirection:'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image 
                            source={images.avatar_5}
                            resizeMode="contain"
                            style={{
                                width:40,
                                height:40
                            }}
                        
                        />
                        <Text>Other</Text>
                    </View>
                </View>
            </View>
            <View style={{marginTop:20}}>
                <Text>Age*</Text>
                <TextInput 
                    style={{width: 120,height: 40,
                        paddingHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        borderWidth: 2,
                        marginTop: 10
                        }}
                />
            </View>

            <View style={{marginTop: 20}}>
                <Text>Relation</Text>
                <View style={{marginTop: 10}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    style={{backgroundColor: '#fff',
                    borderWidth: 2,height: 50}}
                />
                
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={{marginTop:20,flex:1}}>
                    <Text>Height (in cm)</Text>
                    <TextInput 
                        style={{width: "90%",height: 40,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            borderWidth: 2,
                            marginTop: 10
                            }}
                    />
                </View>
                <View style={{marginTop:20,flex:1}}>
                    <Text>Weight (in kg)</Text>
                    <TextInput 
                        style={{width: "90%",height: 40,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            backgroundColor: '#fff',
                            borderWidth: 2,
                            marginTop: 10
                            }}
                    />
                </View>

            </View>

            <View style={{marginTop: 20}}>
                <Text>Blood Group</Text>
                <View style={{marginTop: 10}}>
                <DropDownPicker
                    open={openOption}
                    value={valueOption}
                    items={itemsOption}
                    setOpen={setOpenOption}
                    setValue={setValueOption}
                    setItems={setItemsOption}
                    style={{backgroundColor: '#fff',
                    borderWidth: 2,height: 50}}
                />
                
                </View>
            </View>

            <View style={{marginTop:20,paddingHorizontal: 100}}>
                <Button
                style={{height:60}}
                title="Create Profile"
                color="orange"
                onPress={() => alert('Profile Created Successfully')}
                /> 
            </View>
            
            
            

            
            {/* <TextInput placeholder="Email" style={styles.inputStyle} />
            <TextInput
            secureTextEntry={true}
            placeholder="Password"
            style={styles.inputStyle}
            />
            
            
            
            <Button
            title="Submit"
            color="#000"
            onPress={() => alert('Simple Button pressed')}
            /> */}
      </View>
    </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: '#356859',
      backgroundColor: '#fff',
      borderTopLeftRadius:25,
      borderTopRightRadius: 25,
      paddingHorizontal: 15
      
    },
  
    formLabel: {
      fontSize: 20,
      color: '#fff',
    },
    inputStyle: {
      marginTop: 10,
      width: '100%',
      height: 40,
      paddingHorizontal: 10,
      borderRadius: 10,
      //backgroundColor: '#b9e4c9',
      //backgroundColor: '#25c472'
      backgroundColor: '#fff',
      borderWidth: 2,
    },
    formText: {
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: 20,
    },
    text: {
      color: '#fff',
      fontSize: 20,
    },
  });
export default UserForm
