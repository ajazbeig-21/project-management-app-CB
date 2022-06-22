import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  CheckBox,
  TouchableOpacity
  
} from "react-native";
import { dataBase } from "./data/convertedData";
import Icon from 'react-native-vector-icons/FontAwesome';

var DATA=removeEmptyString(dataBase);


function removeEmptyString(object)
{
  var newObj = object;
  const keys=Object.keys(newObj[0]);
   for(let i=0;i<newObj.length;i++)
   {
     
        for(let k=0;k<keys.length;k++)
        {
          //this is adding isChecked to the object
 
          newObj[i].isChecked=false;         
          if(newObj[i][keys[k]]=='')
          {
            newObj[i][keys[k]]='NA';
          }
       }
     
   }  
  return newObj;
}


function convertToCSV(objArray)
{

  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';

  for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

   //Download the file as CSV
   var downloadLink = document.createElement("a");
   var blob = new Blob(["\ufeff", str]);
   var url = URL.createObjectURL(blob);
   downloadLink.href = url;
   downloadLink.download = "DataDump.csv";  //Name the file here
   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);

  //return str;
}


const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);



const App = () => {
  const [tempDataGetter,tempDataSetter]=React.useState(()=>{
    
    console.log('rendering in main');
    return DATA;
  });
  const [isBoxChecked, setCheck] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();
  

  const upButton=()=>{
    console.log('in upButton index',selectedIndex);
     let tempData=tempDataGetter;
     console.log("before swap-->",tempDataGetter);
     let elementAtIndex=tempData[selectedIndex];
     console.log('elementAtIndex ',elementAtIndex);
  
     let previousElement=tempData[selectedIndex-1];
     console.log('previousElement',previousElement);
  
     tempData[selectedIndex]=previousElement;
     tempData[selectedIndex-1]=elementAtIndex;
  
     console.log("after swap-->",tempData);
  
     console.log("selectedIndex previous-->",selectedIndex);

    setSelectedIndex((prevCount)=>{return prevCount-1;})
     tempDataSetter(tempData);
     console.log("selectedIndex After-->",selectedIndex);

  
    }

  const handleChange=(item)=>{
    setSelectedIndex(tempDataGetter.indexOf(item))
    console.log("94 ajaz------>  ",selectedIndex);

    if(item.isChecked===false)
    {
      console.log("selected item index -->",tempDataGetter.indexOf(item) , selectedIndex,'\t and status-->',item.isChecked);
    }
    
    let temp=tempDataGetter.map((data)=>{
      if(item.Item_ID===data.Item_ID)
      { 
         
          setCheck(!isBoxChecked); 
        return {...data, isChecked:!data.isChecked};
      }
      return data;
    });
    tempDataSetter(temp);
  }



  function downButton()
  {
    console.log('Hey... You selected...Down', selectedIndex);
  }

  let selected=tempDataGetter.filter((data)=>data.isChecked);

  function addtotemparray(listData)
{
  console.log(tempDataGetter.indexOf(listData));
setTempList(tempDataGetter.splice(2,2));
}


function checkForPresence(Item_ID)
{   
  if(Item_ID in tempDataGetter)
  {
    return 1;
  }
  else{
    return 0;
  }
}
 
console.log('134 ajaz selected index--->',selectedIndex);

  console.log("tempDataGetter-->",tempDataGetter);
  const [getTempList,setTempList]=React.useState([]);

  const renderItem = ({ item }) => (
    <View
      
        style={{
          padding: 10,
          backgroundColor: '#fff',
          flexDirection: "row",
          borderWidth:1,
          marginVertical:3,
          marginHorizontal:10,
          borderRadius:8,
          borderColor:'#767676'
        }}
      >
        

        <View>

        <CheckBox
        //addtotemparray.bind(this,item)
          value={item.isChecked}
          onValueChange={ ()=>{
            handleChange(item);
          }}
          style={styles.checkbox}
         
        />


          
        </View>
        <Text numberOfLines={1} style={{ fontSize: 15, textAlign: "left", flex: 1 }}>
        {item['Sequence']+'\t| ' + item['Item_ID']+'\t| '+item['Product']+'\t| '+item['Priority']+'\t| '+item['Type']+'\t| '+item['Task Name']+'\t| '+item['Task Owner']}
        </Text>
      </View>
    
  );

  return (
    <View>
     
<FlatList
        data={tempDataGetter}
        renderItem={renderItem}
        keyExtractor={item => item['Item_ID']}
      />
     
<View>

<Button
title="export"
onPress={convertToCSV.bind(this,tempDataGetter)}
/> 

 </View>

<View style={[ /*!isBoxChecked && selectedIndex==undefined?{display:"none"}:*/styles.topDownButtonContainer]}   >
  

  
      <TouchableOpacity
        onPress={()=>{
          upButton()
        }}
        style={styles.arrowButtons}
        >
        <Icon
    name="chevron-up"
    backgroundColor="#3b5998"
  />
    
      </TouchableOpacity>
      
      <TouchableOpacity      
         style={styles.arrowButtons}
      >

        <Icon
    name="chevron-down"
    backgroundColor="#3b5998"
  />
      </TouchableOpacity>
     
</View>


    </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center"
  },
  listContainer:{
     fontSize: 15,
      textAlign: "left",
       flex: 1,
       padding: 10,
      backgroundColor: '#fff',
              flexDirection: "row",
              borderWidth:1,
              marginVertical:3,
              marginHorizontal:10,
              borderRadius:8,
              borderColor:'#767676',
  },
  checkbox:{
    marginRight:5
  },
  arrowButtons: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'orange',  
    marginHorizontal:10                                 

  },

  topDownButtonContainer:{
    width: 100,
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',                                   
position: 'fixed',                                          
bottom: 10,                                                    
right:30,
display:'flex',
flexDirection:'row'
  }
});

export default App;
