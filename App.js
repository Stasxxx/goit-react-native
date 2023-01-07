import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import RegistrationScreens from './RegistrationScreen';
import LoginScreen from './LoginScreen';

export default function App() {
  return (
    <>
      <RegistrationScreens />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  backGround: {
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: "#fff",
    
    width: 'auto',
    height: 549,
  },
  contFoto: {
    width: 120,
    height: 120,
    borderRadius: 16,
    
    
    backgroundColor: "#F6F6F6",
  },
  addFoto: {

  },
  img: {
    marginLeft: 105,
    marginTop: 81,

  },
  regTitle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,

    marginTop: 32,
    color: "#212121",
  },
  login: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    marginTop: 33,
    paddingHorizontal: 16,
  },
  email: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    marginTop: 16,
    paddingHorizontal: 16,
  },
  showPassTitle: {
    fontFamily: 'Roboto',
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    marginTop: -35,
    marginRight: -160,
    textAlign: 'right',
    

    color: "#1B4371",
  },
  password: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    marginTop: 16,
    paddingHorizontal: 16,
  },
  regBtn: {
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 30,

    marginTop: 43,
    paddingHorizontal: 94,
    paddingVertical: 16,
  },
  regBtnTitle: {
    color: "#FFFFFF"
  },
  btnlogIn: {
    marginTop: 16,
  },
  logInTitle: {
    fontFamily: 'Roboto',
    // fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",

    marginBottom: 66,
  },
});
