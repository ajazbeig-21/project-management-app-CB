import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  CheckBox,
  TouchableOpacity,
} from "react-native";
import Home from "./Screens/Home";
import UploadPage from "./Screens/UploadPage";
import { dataBase } from "./data/convertedData";

const App = () => {
const [csvData,setCSVData]=React.useState([]);

function pickedFileHandler(chosenFile)
{
  console.log('chosen File---->',chosenFile);
  console.log('keys of chosen file---->',);
setCSVData(chosenFile);
}

  let curretComponent= <Home uploadedData={csvData} />;

  if(csvData.length<1)
  {
    curretComponent=<UploadPage fileSelected={pickedFileHandler} />;
  }
  return (
    <View>
      {/* <Home uploadedData={dataBase} />
      <UploadPage /> */}
      {curretComponent}
    </View>
  );
};

const styles = StyleSheet.create({});

export default App;
