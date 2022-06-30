import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  CheckBox,
  TouchableOpacity,
  Alert,
} from "react-native";
import Home from "./Screens/Home";
import UploadPage from "./Screens/UploadPage";
import Login from "./Screens/Login";
import { dataBase } from "./data/convertedData";
import AwesomeAlert from 'react-native-awesome-alerts';


const App = () => {
const [csvData,setCSVData]=React.useState([]);
const [loggedIn,setLogin]=React.useState(false);
const [invalidLogin,setInvalid]=React.useState(false);
const [showAlert,setAlert]=React.useState(false);

function hideAlert() {
  setAlert(false);
  };

function pickedFileHandler(chosenFile)
{
  console.log('chosen File---->',chosenFile);
  console.log('keys of chosen file---->',);
setCSVData(chosenFile);
}

function handleUserInput(username,password)
{
if(username==="admin" && password==="123")
{
  setLogin(true);
}
else{
 setInvalid(true);
 setAlert(true);
}
}

let curretComponent=<Login loginHandler={handleUserInput}/>;
let alertBox='';
if(invalidLogin==true)
{
 alertBox=<AwesomeAlert
 show={showAlert}
 showProgress={true}
 title="Incorrect Credentials"
 message="May be your Username or Password is incorrect"
 closeOnTouchOutside={true}
 showCancelButton={true}
 cancelText="Ok"
 onCancelPressed={() => {
  hideAlert();
}}
 />;
}

  if(loggedIn!==true)
  {
    //curretComponent=<UploadPage fileSelected={pickedFileHandler} />;
  curretComponent=<Login loginHandler={handleUserInput}/>
  }

  if(loggedIn==true)
  {
    curretComponent=<UploadPage fileSelected={pickedFileHandler} />;
  }

  if(csvData.length>1)
  {
curretComponent= <Home uploadedData={csvData} />;
  }

  return (
    <>
     
    <View>
      {/* <Home uploadedData={dataBase} />
      <UploadPage /> */}
      {curretComponent}

    </View>
    {alertBox}
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
