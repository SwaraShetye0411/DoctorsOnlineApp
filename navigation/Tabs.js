import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import Svg, {Path} from "react-native-svg";
import { isIphoneX } from "react-native-iphone-x-helper";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';



import { COLORS, icons } from "../constants";
import FirstPage from "../pages/FirstPage";
import SecondPage from "../pages/SecondPage";
import ThirdPage from "../pages/ThirdPage";
import Profile from "../pages/Profile";
import Symptoms from "../pages/Symptoms";
import DoctorsPage from "../pages/DoctorsPage";
import ChatMessage from "../pages/ChatMessage";
import ChatRoom from "../pages/ChatRoom";
import Feeds from "../pages/Feeds";


const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({onPress,children}) => {
    

   
        return (
            <View style={{ flex: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", position: "absolute", top: 0 }}>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                    <Svg
                        width={75}
                        height={61}
                        viewBox="0 0 75 61"
                    >
                        <Path
                            d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
                            fill={COLORS.white}
                        />
                    </Svg>
                    <View style={{ flex: 1, backgroundColor: COLORS.white }}></View>
                </View>

                <TouchableOpacity
                    style={{
                        top: -22.5,
                        width: 60,
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 30,
                        backgroundColor: COLORS.white,
                        
                    }}
                    onPress={onPress}
                >
                    {children}
                </TouchableOpacity>

            </View>


        )

}

const CustomTabBar = (props) => {
    if(isIphoneX()){
        return (
            <View>
                <View
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 30,
                        backgroundColor: COLORS.white
                    }}
                >
    
                </View>
                <BottomTabBar {...props.props} />
    
            </View>
            
        ) 
    } else {
        return(
            <BottomTabBar {...props.props} />
        )
        
    }
}

const Tabs = () => {
    return (
        <Tab.Navigator 
            
            tabBarOptions={{
                //showLabel: false,
                style:{
                    borderTopWidth: 0,
                    shadowOpacity:0,
                    
                    backgroundColor: "white",
                    elevation: 0,
                    height: 65,
                    paddingVertical: 10,
                    paddingBottom: 10
                }
            }}
            tabBar={(props) => (
                <CustomTabBar 
                    props={props}
                />
            )}

        >
            <Tab.Screen 
                name="FirstPage"
                component={FirstPage}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5 name="home" size={25} style={{color: focused ? '#086e5a' : COLORS.secondary}}/>
                    ),   
                    }}
            />
            <Tab.Screen 
                name="Feeds"
                component={Feeds}
                options={{
                    tabBarLabel: 'Feeds',
                    tabBarIcon: ({focused}) => (
                        <MaterialIcons name="feedback" size={25} style={{color: focused ? '#086e5a' : COLORS.secondary}} />
                        ),
                    }}
            />
            <Tab.Screen 
                name="Consult"
                component={Symptoms}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Fontisto name="doctor" size={25} 
                        style={{color: focused ? '#086e5a' : COLORS.secondary}} />
                        ),      
                    }}
            />
            <Tab.Screen 
                name="Health Records"
                component={FirstPage}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Feather name="file-text" size={25} style={{color: focused ? '#086e5a' : COLORS.secondary}} />
                        ),     
                    }}
            />
            <Tab.Screen 
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => (
                        <FontAwesome5 name="user" size={25} style={{color: focused ? '#086e5a' : COLORS.secondary}} />
                        ),     
                    }}
            />
        </Tab.Navigator>
        
    )
}

export default Tabs;