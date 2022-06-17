import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
  Button
} from "react-native";
import dataBase from "./data/convertedData";

const JSONFormat=[{"Sequence":"1","Item_ID":"CC1-T22","Zoho Project":"CarIQ Core Products","Product":"Deviceless","Customer":"","Type":"Feature","Task Name":"BAGIC Device_less app - Auto start/stop (A4 implementation)","Task Owner":"Sagar Yadav","Priority":"High","Custom Status":"To be Tested"},
{"Sequence":"2","Item_ID":"CC1-T8","Zoho Project":"CarIQ Core Products","Product":"Platform","Customer":"","Type":"Feature","Task Name":"End of the day Probe Report - Single Email containing status of all domains for all probes.","Task Owner":"Sagar Yadav","Priority":"Low","Custom Status":"Open"},
{"Sequence":"3","Item_ID":"CC1-T6","Zoho Project":"CarIQ Core Products","Product":"FleetIQ","Customer":"","Type":"Feature","Task Name":"High-Provide tools for Rajashree to debug these(Varroc Fleet) issues/problems","Task Owner":"Santosh Bansode","Priority":"Low","Custom Status":"Open"},
{"Sequence":"4","Item_ID":"CC1-T2","Zoho Project":"CarIQ Core Products","Product":"Driven Admin","Customer":"","Type":"Feature","Task Name":"Allow downloading of data for billing purposes","Task Owner":"Santosh Bansode","Priority":"None","Custom Status":"Open"},
{"Sequence":"5","Item_ID":"CC1-T61","Zoho Project":"CarIQ Core Products","Product":"Platform","Customer":"","Type":"Feature","Task Name":"Heatsink based data dump for ICICI","Task Owner":"Datta Lohar","Priority":"Medium","Custom Status":"Open"},
{"Sequence":"6","Item_ID":"NC1-I56","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Customer is not receiving Ignition ON / OFF alerts in his NC App. (VIN No : MDHFBADD0M9034200)","Task Owner":"Major","Priority":"Datta","Custom Status":"Open"},
{"Sequence":"7","Item_ID":"NC1-I48","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Customer was facing issue with Smart Drive Score feature.","Task Owner":"Major","Priority":"Hrishi","Custom Status":"Open"},
{"Sequence":"8","Item_ID":"LE1-T15","Zoho Project":"L3 Engineering","Product":"","Customer":"","Type":"","Task Name":"Wrong timing-Trip start/stop, Ignition On/Off #81442","Task Owner":"Sagar Yadav","Priority":"High","Custom Status":"Open"},
{"Sequence":"9","Item_ID":"NC1-I11","Zoho Project":"Renault Nissan Support","Product":"Platform","Customer":"Nissan","Type":"Bug","Task Name":"Dinesh san to confirm : Engine Overheating alert algorithm revisit & changes","Task Owner":"Major","Priority":"Dinesh","Custom Status":"Open"},
{"Sequence":"10","Item_ID":"CC1-T52","Zoho Project":"CarIQ Core Products","Product":"BAGIC","Customer":"","Type":"Feature","Task Name":"DriveSmart - Missing entries in the report- https://admin.drivesmart.co.in/","Task Owner":"Nitin Umdale","Priority":"High","Custom Status":"In Progress"}];


function removeEmptyString(object)
{
  var newObj = object;
  const keys=Object.keys(newObj[0]);
   for(let i=0;i<newObj.length;i++)
   {
     
        for(let k=0;k<keys.length;k++)
        {
          if(newObj[i][keys[k]]=='')
          {
            newObj[i][keys[k]]='NA';
          }
       }
     
   }  
  return newObj;
}



export default class App extends React.Component {
  state = {
    data:removeEmptyString(JSONFormat),
    keys:JSON.stringify(Object.keys(JSONFormat[0]))
  };

  constructor(props) {
    super(props);

  }

  convertToCSV=(objArray)=>
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


 downloadToCSV=(str)=>
 {
   //Download the file as CSV
   var downloadLink = document.createElement("a");
   var blob = new Blob(["\ufeff", str]);
   var url = URL.createObjectURL(blob);
   downloadLink.href = url;
   downloadLink.download = "DataDump.csv";  //Name the file here
   document.body.appendChild(downloadLink);
   downloadLink.click();
   document.body.removeChild(downloadLink);
 }



  render() {
    const { data, dragging, draggingIdx,keys } = this.state;
console.log("@@@@@@@@@@@@@@@@@@@@@@",data);
    // const renderItem = ({ item, index }, noPanResponder = false) => (
    //   <View
    //     onLayout={e => {
    //       this.rowHeight = e.nativeEvent.layout.height;
    //     }}
    //     style={{
    //       padding: 10,
    //       backgroundColor: '#fff',
    //       flexDirection: "row",
    //       borderWidth:1,
    //       marginVertical:3,
    //       marginHorizontal:10,
    //       borderRadius:8,
    //       borderColor:'#767676',
    //       opacity: draggingIdx === index ? 0 : 1
    //     }}
    //   >
        

    //     <View {...(noPanResponder ? {} : this._panResponder.panHandlers)}>
    //       <Text style={{ fontSize: 15,cursor:'pointer', marginRight:10 }}>
    //       Box Here

    //       </Text>
    //     </View>
        
    //   </View>
    // );

    return (
      <View style={styles.container}>
          
      
        <FlatList
          scrollEnabled={true}
          style={{ width: "100%" }}
          data={data}
          renderItem={
            <Text numberOfLines={1} style={{ fontSize: 15, textAlign: "left", flex: 1 }}>
        {item['Sequence']+'\t| ' + item['Item_ID']+'\t| '+item['Product']+'\t| '+item['Priority']+'\t| '+item['Type']+'\t| '+item['Task Name']+'\t| '+item['Task Owner']}
        </Text>
          }
          keyExtractor={item => item['Item_ID']}
        />

<View>

 <Button
title="export"
onPress={this.convertToCSV.bind(this,data)}
/> 

  </View>


      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center"
  }
});

