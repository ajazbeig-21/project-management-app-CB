
import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
  
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const ArrowButtons = () => {
    return(

<View style={styles.topDownButtonContainer}>
  

  
      <TouchableOpacity
       // onPress={buttonClickedHandler}
        style={styles.arrowButtonUp}>
        <Icon
    name="chevron-up"
    backgroundColor="#3b5998"
  />
    
      </TouchableOpacity>
      
      <TouchableOpacity
       // onPress={buttonClickedHandler}
        style={styles.arrowButtonDown}>
        <Icon
    name="chevron-down"
    backgroundColor="#3b5998"
  />
      </TouchableOpacity>
     
</View>)
}
      
  


const styles = StyleSheet.create({
  arrowButtonUp: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',                                   
position: 'fixed',                                          
bottom: 10,                                                    
right: 60
  },
  arrowButtonDown: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',                                   
position: 'fixed',                                          
bottom: 10,                                                    
right: 0
  },
  topDownButtonContainer:{
   
  }
});

export default ArrowButtons;
