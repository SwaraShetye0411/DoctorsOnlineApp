import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainFeed from './MainFeed';
import { Octicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import Comments from './Comments';

const HomeStack = createStackNavigator();


const Feeds = ({navigation}) => (
  <HomeStack.Navigator screenOptions={{
          headerStyle: {
          backgroundColor: '#086e5a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
          <HomeStack.Screen name="MainFeed" component={MainFeed} options={{
            // headerRight: () => (
            //   <View style={{marginRight: 10}}>
            //     <FontAwesome5.Button
            //       name="plus"
            //       size={22}
            //       backgroundColor="#086e5a"
            //       color="#fff"
            //       onPress={() => navigation.navigate('AddPostScreen')}
            //     />
            //   </View>
            // ),
          }}/>
          {/* <HomeStack.Screen name="Comments" component={Comments} /> */}
          {/* <HomeStack.Screen name="AddPostScreen" component={AddPostScreen} /> */}
          <HomeStack.Screen name="Comments" component={Comments} />
          
  </HomeStack.Navigator>
    
  );


export default Feeds;
