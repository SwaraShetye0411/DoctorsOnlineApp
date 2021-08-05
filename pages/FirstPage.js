import React,{ useState, useEffect } from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  Pressable
  
  
} from 'react-native';

import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCard, { SLIDER_WIDTH, ITEM_WIDTH } from '../components/CarouselCard';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import data from '../data/data';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';



const FirstPage = ({ navigation }) => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const categoryData = [
    {
        id: 1,
        name: "24*7 Consultation",
        icon: <MaterialCommunityIcons name="hours-24" size={22} color="#086e5a" />,
    },
    {
        id: 2,
        name: "Book An Appointment",
        icon: <MaterialIcons name="book-online" size={22} color="#086e5a" />,
    },
    {
        id: 3,
        name: "Lab Tests",
        icon: <Fontisto name="laboratory" size={22} color="#086e5a" />,
    },
    {
        id: 4,
        name: "Medicines",
        icon: <MaterialIcons name="medical-services" size={22} color="#086e5a" />,
    },
  

    
    
  ]
  const covidCategoryData = [
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
        name: "Period Issues",
        icon: images.period2,
    },
    {
        id: 4,
        name: "Hairfall",
        icon: icons.salad,
    },
    {
      id: 5,
      name: "Pregnancy Issues",
      icon: icons.salad,
  },
    
    
  ]

  const bookingCategoryData = [
    {
        id: 1,
        name: "Vaccination Related",
        icon: icons.rice_bowl,
    },
    {
        id: 2,
        name: "Covid Symptoms",
        icon: icons.noodle,
    },
    {
        id: 3,
        name: "Covid Consultation",
        icon: icons.hotdog,
    },
    {
        id: 4,
        name: "FAQs and Articles",
        icon: icons.salad,
    },
    
    
  ]

  const symptomsCategoryData = [
    {
        id: 1,
        name: "Cough",
        icon: images.cough_icon,
    },
    {
        id: 2,
        name: "Fever",
        icon: images.fever,
    },
    {
        id: 3,
        name: "Period Issue",
        icon: images.period,
    },
    {
        id: 4,
        name: "Hairfall",
        icon: icons.salad,
    },
    {
        id: 5,
        name: "Depression",
        icon: icons.hamburger,
    },
    {
        id: 6,
        name: "Anxiety",
        icon: icons.pizza,
    },
    {
        id: 7,
        name: "Diabetes",
        icon: icons.fries,
    },
    {
        id: 8,
        name: "Weight loss",
        icon: icons.sushi,
    },
    {
        id: 9,
        name: "Acne/Pimples",
        icon: icons.donut,
    },
    {
        id: 10,
        name: "Pregnancy Queries",
        icon: icons.drink,
    },

]

  const [categories, setCategories] = React.useState(categoryData);
  const [covidCategories, setCovidCategories] = React.useState(covidCategoryData);
  const [symptomsCategories, setSymptomsCategories] = React.useState(symptomsCategoryData);
  const [bookingCategories, setBookingCategories] = React.useState(bookingCategoryData);

  function renderCategoryList(){
    const renderItem=({item}) =>{
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
            // ...styles.shadow,
            alignItems: 'center',
            
          }}
          onPress={()=> {}}
        >
                    {item.icon}
                    <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 15, lineHeight: 18, flexShrink:1,fontWeight:'bold'}}>{item.name}</Text>
                </TouchableOpacity>
        

      )
    }
    return(
      <View 
        style={{
          marginTop:5,
          //marginHorizontal:10,
          flex: 1,
          ...styles.shadow,
          height: '100%',
          backgroundColor: '#e9eaef',
          marginTop: 5,
          //marginHorizontal:20,
            
          borderRadius: 10,
          margin: 2
          }}>
        <FlatList 
        data={categories}
        renderItem={renderItem}
        keyExtractor={item=> `${item.id}`}
        numColumns={2}
      />

      </View>
      
    )
  }

  function renderCovidItems() {
    const renderItem=({item}) =>{
      return(
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            flex: 1,
            margin: 5,
            paddingVertical: SIZES.padding,
            paddingHorizontal: SIZES.padding,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            ...styles.shadow
          }}
          onPress={()=> {}}
        >
                    <Image 
                        source={item.icon}
                        style={{
                            width:18,
                            height:18,
                            tintColor: item.color
                        }}
                    />
                    <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 12, lineHeight: 18, flexShrink:1}}>{item.name}</Text>
                </TouchableOpacity>

      )
    }
    return(
      <View style={{marginHorizontal:15, marginBottom:20}}>
        <FlatList 
        data={covidCategories}
        renderItem={renderItem}
        keyExtractor={item=> `${item.id}`}
        numColumns={2}
      />

      </View>
      
    )
  }

  function renderSymptomsList(){
    const renderItem =({item}) => {
      return (
        <View 
          
        >
           <TouchableOpacity
                    style={{
                        padding: SIZES.padding2,
                        // paddingBottom: SIZES.padding * 2,
                        backgroundColor: COLORS.white,
                        borderRadius: 50,
                        alignItems:"center",
                        justifyContent: "center",
                        marginRight: SIZES.padding2,
                        ...styles.shadow,
                        //width:63,
                        height:63
                        
                    }}
                    onPress={() =>{}}
                >
                    <View 
                        style={{
                            width: 40,
                            height: 40,
                            //borderRadius: 35,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor:  COLORS.white
                        }}
                    >
                        <Image 
                            source={item.icon}
                            resizeMode="cover"
                            style={{
                                width: 40,
                                height: 40,
                                
                            }}
                        />

                    </View>

                    {/* <Text 
                        style={{
                            marginTop: SIZES.padding,
                            color: COLORS.black,
                            fontSize: SIZES.body5,
                            
                            
                        }}
                    >
                        {item.name}
                    </Text> */}

                </TouchableOpacity>
                <View 
                  style={{
                    alignItems:'center',
                    justifyContent:'center',
                    width: 65
                  }}
                >
                  <Text 
                    style={{
                        marginTop: 4,
                        color: COLORS.black,
                        fontSize: SIZES.body5,
                        alignItems:'center',
                        justifyContent:'center',
                        textAlign: 'center',
                        marginBottom: 10 
                    }}
                  >
                    {item.name}
                  </Text>

                </View>
                

        </View>
       

      )
    }
    return(
      <View 
        
      >
                <FlatList 
                    data={symptomsCategories}
                    //horizontal
                    //showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding *2}}
                    numColumns={5}
                />

            </View>
    )
  }

  function renderSymptomsList2(){
    const renderItem=({item}) =>{
      return(
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            //flex: 1,
            margin: 5,
            paddingVertical: 15,
            paddingHorizontal: 5,
            height: 60,
            borderRadius: 30,
            backgroundColor: COLORS.white,
            // ...styles.shadow,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 5
          }}
          onPress={()=> {}}
        >
          {item.icon}
          <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 15, lineHeight: 18, flexShrink:1}}>{item.name}</Text>
                    {/* <Image 
                            source={item.icon}
                            resizeMode="cover"
                            style={{
                                width: 40,
                                height: 40,
                                
                            }}
                        /> */}
                    {/* <Text style={{marginLeft: 5, color: COLORS.black,fontSize: 15, lineHeight: 18, flexShrink:1}}>{item.name}</Text> */}
        </TouchableOpacity>
        

      )
    }
    return(
      <View 
        style={{
          //marginTop:5,
          //marginHorizontal:10,
          //flex: 1,
          //...styles.shadow,
          //height: '100%',
          //backgroundColor: '#e9eaef',
          //marginTop: 5,
          //marginHorizontal:20,
          //borderRadius: 10,
          margin: 2
          }}>
        <FlatList 
        data={categories}
        renderItem={renderItem}
        keyExtractor={item=> `${item.id}`}
        numColumns={5}
      />

      </View>
      
    )
  }

  // function renderBoxes(){
  //   const renderItem=({item})=> {
  //     return (
  //       <View
  //         style={{
  //           flex: 1,
  //         ...styles.shadow,
  //         backgroundColor: 'white',
  //         marginTop: 15,
  //         marginHorizontal:20,
  //         borderRadius: 10,
  //         margin: 5,
  //         marginBottom: 15
  //         }}
  //       >
  //         <View 
  //           style={{
  //             width:250,
  //             height:120,
  //             backgroundColor:COLORS.lightGray,
  //             borderRadius: 10,
  //             padding:SIZES.padding
  //           }}
  //         >
  //           <Text>{item.name}</Text>
  //         </View>
          

  //       </View>
  //     )
  //   }
  //   return (
  //     <View>
  //       <FlatList 
  //         data={bookingCategories}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={item => `${item.id}`}
  //         renderItem={renderItem}
          
  //       />
  //     </View>
  //   )
  // }

  function renderCategoryList1(){
    const renderItem=({item}) =>{
      return(
        
          <TouchableOpacity
          style={{
            flexDirection: 'column',
            flex: 1,
            margin: 5,
            paddingVertical: 7,
            paddingHorizontal: 5,
            //height: 60,
            borderRadius: 10,
            backgroundColor: COLORS.white,
            borderColor:'#fff',
            borderWidth:1,
            ...styles.shadow,
            alignItems: 'center',
            justifyContent:'center'
            
          }}
          onPress={()=> {navigation.navigate('DoctorsPage')}}
        >
          <Image 
            source={item.icon}
            resizeMode='cover'
            style={{
              width:45,
              height:45
            }}
          />
                    {/* {item.icon} */}
                    
                </TouchableOpacity>
        
          
                
                  
               
                
        
        


        

      )
    }
    return(
      <View 
        style={{
          marginTop:5,
          //marginHorizontal:10,
          //flex: 1,
          //...styles.shadow,
          //height: '100%',
          //backgroundColor: '#e9eaef',
          marginTop: 5,
          //marginHorizontal:20,
            
          borderRadius: 10,
          margin: 2
          }}>
        <FlatList 
        data={covidCategories}
        renderItem={renderItem}
        keyExtractor={item=> `${item.id}`}
        numColumns={5}
      />

      </View>
      
    )
  }

  function renderCategoryNames() {
    const renderItem =({item}) => {
      return(
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent:'space-between'
          }}
        >
          <Text style={{fontSize:9,paddingHorizontal: 10,textAlign:'center'}}>{item.name}</Text>
        </View>
        
      )
    }
    return (
      <View
      >
        <FlatList 
          data={covidCategories}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          numColumns={5}
        />
      </View>
    )
  }
  
  return (
    <SafeAreaView style={{ flex: 1 , backgroundColor: '#fff'}}>
      <ScrollView>
      <View style={{marginTop:10}}>
        <Carousel
          layout="tinder"
          layoutCardOffset={9}
          ref={isCarousel}
          data={data}
          renderItem={CarouselCard}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          useScrollView={true}
          loop
          autoplay
          autoplayDelay={2000}
        />

        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
          containerStyle={{position:'absolute',bottom:-20,left:'35%'}}
        />
      </View>

      <View>
        {renderCategoryList()}

      </View>
      {/* <View
        style={{
          flex: 1,
          ...styles.shadow,
          height: '100%',
          backgroundColor: 'white',
          marginTop: 25,
          marginHorizontal:20,
          
          borderRadius: 10,
          margin: 5
        }}
      >
        <View style={{
          width: '100%',
          height: 120
        }}>
          

        </View>
        
      </View> */}
      <View>
        <View
          style={{
            flex: 1,
            ...styles.shadow,
            height: '100%',
            backgroundColor: 'white',
            marginTop: 5,
            //marginHorizontal:20,
            
            borderRadius: 10,
            margin: 2
          }}
        >
          <Image 
            source={{uri:'https://www.clinicaltrialsarena.com/wp-content/uploads/sites/33/2020/09/coronavirus-1509.jpg'}}
            resizeMode="cover"
            style={{
              width:'100%',
              height:150,
            borderRadius:10}}
          
          />
          <View style={{position:'absolute',paddingVertical: SIZES.padding,marginLeft:10}}>
            <Text style={{color: COLORS.white,fontSize: SIZES.h4, lineHeight: 18}}>Symptoms of COVID-19?</Text>
            {/* <Text style={{paddingVertical: SIZES.padding,color: COLORS.white,fontSize: SIZES.h4, lineHeight: 18,textAlign:'center'}}>OR</Text> */}
            <Text style={{paddingVertical: SIZES.padding,color: COLORS.white,fontSize: SIZES.h4, lineHeight: 18}}>Queries on COVID-19?</Text>
            <View style={{paddingVertical: SIZES.padding2*2}}>
              <Pressable 
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#086e5a' : '#33DFFF',
                    
                  },
                  styles.button,
                  
                ]}
              >
                <Text style={styles.buttonText}>Consult Now!</Text>
              </Pressable>

            </View>
            
          </View>
          
          {/* <View>
            {renderCovidItems()}

          </View> */}
          

        </View>
      </View>


      <View
        style={{
          marginTop:5,
          //marginHorizontal:10,
          flex: 1,
          ...styles.shadow,
          height: '100%',
          backgroundColor: '#e9eaef',
          marginTop: 5,
          //marginHorizontal:20,
            
          borderRadius: 10,
          margin: 2
        }}
      >
      <View style={{marginTop: 5,marginHorizontal:2,}}>
        <View style={{flexDirection: 'row', alignItems:'center',marginHorizontal:5}}>
          <Text style={{fontSize: 18,fontWeight:'bold'}}>Common Symptoms</Text>
          {/* <Button 
            title="See More"
            color="#086e5a"
          /> */}
        </View>
        <View 
          style={{
            marginTop:5,
          //marginHorizontal:10,
          flex: 1,
          ...styles.shadow,
          height: '100%',
          backgroundColor: '#e9eaef',
          marginTop: 5,
          //marginHorizontal:20,
            
          borderRadius: 10,
          margin: 2
          }}
        >
          {/* {renderSymptomsList()} */}
          {/* {renderSymptomsList2()} */}
        </View>

      </View>

      <View>
      {renderCategoryList1()}
      {renderCategoryNames()}
      </View>

      <View>
      {renderCategoryList1()}
      {renderCategoryNames()}
      </View>
      <View style={{marginTop:8,marginHorizontal:5, marginBottom:5,borderRadius:15}}>
      {/* <Button 
            title="See More"
            color="#086e5a"
          /> */}
          <Pressable 
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? '#086e5a' : '#fff',
                    
                  },
                  styles.button1,
                  
                ]}
                onPress={()=>{navigation.navigate('Symptoms')}}
              >
                <Text style={styles.buttonText1}>See More</Text>
              </Pressable>
      </View>
      </View>
      
      

     

      </ScrollView>
      
    </SafeAreaView>
  );
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

export default FirstPage;