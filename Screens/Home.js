import React, { useEffect, useRef, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  CheckBox,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Pressable,
} from "react-native";
//import { dataBase } from "../data/convertedData";
import { DataTable } from "react-native-paper";
import AwesomeAlert from "react-native-awesome-alerts";

import Icon from "react-native-vector-icons/FontAwesome";
//var DATA = removeEmptyString(dataBase);
function removeEmptyString(object) {
  var newObj = object;
  const keys = Object.keys(newObj[0]);
  for (let i = 0; i < newObj.length; i++) {
    for (let k = 0; k < keys.length; k++) {
      //this is adding isChecked to the object

      newObj[i].isChecked = false;
      if (newObj[i][keys[k]] == "") {
        newObj[i][keys[k]] = "NA";
      }
    }
  }
  return newObj;
}

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Home = ({ uploadedData }) => {
  const [tempDataGetter, tempDataSetter] = React.useState(() => {
    return removeEmptyString(uploadedData);
  });
  console.log("temp data getter--->", tempDataGetter);
  const [isBoxChecked, setCheck] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState();
  const [getDataKeys, setDataKeys] = React.useState(() => {
    let tempKeys = Object.keys(tempDataGetter[0]);
    tempKeys.splice(-1, 1);
    console.log("tempKeys", tempKeys);
    return tempKeys;
  });
  const [getDeleteIndex, setDeleteIndex] = React.useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [getTempList, setTempList] = React.useState([]);

  function convertToCSV(objArray) {
    let tempKeys = Object.keys(tempDataGetter[0]);
    tempKeys.splice(-1, 1);

    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = `${tempKeys}  \r\n`;

    for (var i = 0; i < array.length; i++) {
      delete array[i]["isChecked"];
    }

    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line != "") line += ",";

        line += array[i][index];
      }

      str += line + "\r\n";
    }

    //Download the file as CSV
    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", str]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "DataDump.csv"; //Name the file here
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    //return str;
  }

  const upButton = () => {
    let tempData = tempDataGetter;
    let elementAtIndex = tempData[selectedIndex];
    let previousElement = tempData[selectedIndex - 1];
    tempData[selectedIndex] = previousElement;
    tempData[selectedIndex - 1] = elementAtIndex;
    setSelectedIndex(selectedIndex-1);
    tempDataSetter(tempData);
    console.log("UP------>", tempDataGetter);
  };

  const deleteItem = (item) => 
  {
    let temp=tempDataGetter;
    temp.splice(tempDataGetter.indexOf(item),1);
    tempDataSetter([...temp]);
    console.log("tem",temp);
  };

  const downButton = () => {
    let tempData = tempDataGetter;
    let elementAtIndex = tempData[selectedIndex];
    let nextElement = tempData[selectedIndex + 1];
    tempData[selectedIndex] = nextElement;
    tempData[selectedIndex + 1] = elementAtIndex;
    setSelectedIndex((prevCount) => {
      return prevCount + 1;
    });
    tempDataSetter(tempData);
    console.log("DOWN------>", tempDataGetter);
  };

  const handleChange = (item) => {
    setSelectedIndex(tempDataGetter.indexOf(item));

    let temp = tempDataGetter.map((data) => {
      if (item.Item_ID === data.Item_ID) {
        setCheck(!isBoxChecked);
        return { ...data, isChecked: !data.isChecked };
      }
      return data;
    });
    tempDataSetter(temp);
  };

  let selected = tempDataGetter.filter((data) => data.isChecked);

  function addtotemparray(listData) {
    setTempList(tempDataGetter.splice(2, 2));
  }

  function checkForPresence(Item_ID) {
    if (Item_ID in tempDataGetter) {
      return 1;
    } else {
      return 0;
    }
  }

  const tableHeader = () => {
    return (
      <DataTable.Header style={{ borderWidth: 0, padding: 0, margin: 0 }}>
        <DataTable.Title style={{ flex: 0.3 }}> </DataTable.Title>
        <DataTable.Title style={{ flex: 0.3 }}> </DataTable.Title>
        <DataTable.Title>{getDataKeys[1]}</DataTable.Title>
        <DataTable.Title>{getDataKeys[3]}</DataTable.Title>
        <DataTable.Title style={{ flex: 1.5 }}>
          {getDataKeys[9]}
        </DataTable.Title>
        <DataTable.Title>{getDataKeys[5]}</DataTable.Title>
        <DataTable.Title>{getDataKeys[6]}</DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>{getDataKeys[7]}</DataTable.Title>
        <DataTable.Title> </DataTable.Title>
      </DataTable.Header>
    );
  };

  const renderItemTable = ({ item }) => (
    
    
    <View
      style={
        item === tempDataGetter[selectedIndex]
          ? styles.selectedItem
          : styles.unSelectedItem
      }
    >
      <DataTable style={{ borderWidth: 0, padding: 0, margin: 0 }}>
        {/* {tableHeader()}  */}
        <DataTable.Row style={{ borderWidth: 0, padding: 0, margin: 0 }}>
          <DataTable.Cell style={{ flex: 0.3 }}>
            <CheckBox
              //addtotemparray.bind(this,item)
              value={item.isChecked}
              onValueChange={() => {
                handleChange(item);
              }}
            />
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 0.3 }}>
            {item["Sequence"]}
          </DataTable.Cell>
          <DataTable.Cell>{item["Item_ID"]}</DataTable.Cell>
          <DataTable.Cell>{item["Product"]}</DataTable.Cell>
          <DataTable.Cell>{item["Priority"]}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 1.5 }}>
            {item["Task Owner"]}
          </DataTable.Cell>

          <DataTable.Cell>{item["Type"]}</DataTable.Cell>
          <DataTable.Cell style={{ flex: 5 }}>
            {item["Task Name"]}
          </DataTable.Cell>
          <DataTable.Cell style={{ flex: 0.3 }}>
            <Icon
              name="trash"
              size={18}
              color="black"
              style={{ cursor: "pointer" }}
              onPress={()=>{

deleteItem(item)
              }}
            />
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>

     
    </View>
    
  );

  const renderItem = ({ item }) => (
    <View
      style={
        item === tempDataGetter[selectedIndex]
          ? styles.selectedItem
          : styles.unSelectedItem
      }
    >
      <View>
        <CheckBox
          //addtotemparray.bind(this,item)
          value={item.isChecked}
          onValueChange={() => {
            handleChange(item);
          }}
          style={styles.checkbox}
        />
      </View>
      <Text
        numberOfLines={1}
        style={{ fontSize: 15, textAlign: "left", flex: 1 }}
      >
        {item["Sequence"] +
          "\t| " +
          item["Item_ID"] +
          "\t| " +
          item["Product"] +
          "\t| " +
          item["Priority"] +
          "\t| " +
          item["Type"] +
          "\t| " +
          item["Task Name"] +
          "\t| " +
          item["Task Owner"]}
      </Text>
      <Icon
        name="pencil"
        size={18}
        color="black"
        style={{ cursor: "pointer", marginHorizontal: 10 }}
      />
      <Icon
        name="trash"
        size={18}
        color="black"
        style={{ cursor: "pointer" }}
        onPress={() => {}}
      />
    </View>
  );

  return (
    
    <View>


      <FlatList
        style={{ marginBottom: 60 }}
        data={tempDataGetter}
        renderItem={renderItemTable}
        keyExtractor={(item) => "" + item["Item_ID"]}
      />



      <View
        style={[
          /*!isBoxChecked && selectedIndex==undefined?{display:"none"}:*/ styles.topDownButtonContainer,
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            upButton();
          }}
          style={styles.arrowButtons}
        >
          <Icon name="chevron-up" size={20} backgroundColor="#3b5998" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            downButton();
          }}
          style={styles.arrowButtons}
        >
          <Icon name="chevron-down" size={20} backgroundColor="#3b5998" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={convertToCSV.bind(this, tempDataGetter)}
          style={[styles.arrowButtons, { backgroundColor: "black" }]}
        >
          <Icon name="download" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    fontSize: 15,
    textAlign: "left",
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: "#767676",
  },
  checkbox: {
    marginRight: 5,
  },
  arrowButtons: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 100,
    backgroundColor: "orange",
    marginHorizontal: 10,
  },

  topDownButtonContainer: {
    width: 100,
    height: 50,
    justifyContent: "space-around",
    alignItems: "center",
    position: "fixed",
    bottom: 10,
    right: 50,
    display: "flex",
    flexDirection: "row",
  },
  unSelectedItem: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderWidth: 1,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: "#767676",
  },
  selectedItem: {
    backgroundColor: "#3AB0FF",
    padding: 10,
    flexDirection: "row",
    borderWidth: 1,
    marginVertical: 3,
    marginHorizontal: 10,
    borderRadius: 8,
    borderColor: "#767676",
  },
});

export default Home;
