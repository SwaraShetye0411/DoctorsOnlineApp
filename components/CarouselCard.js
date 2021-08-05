import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.99)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* <Text style={styles.header}>{item.title}</Text>
      <Text style={styles.body}>{item.body}</Text> */}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: SLIDER_WIDTH,
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 3,
    //   },
    //   shadowOpacity: 0.29,
    //   shadowRadius: 4.65,
    //   elevation: 7,
  },
  image: {
    width: ITEM_WIDTH,
    height: 180,
    borderRadius: 5,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
})

export default CarouselCardItem