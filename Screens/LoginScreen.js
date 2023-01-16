import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground,Keyboard, TouchableWithoutFeedback } from 'react-native';

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  // const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  const [email, setEmail] = useState(false);
  const [pass, setPass] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
       setIsShowKeyboard(false);
    });

    return () => {
      hideSubscription.remove();
    };
  },[])

  const togge = () => {
    setShowPass(!showPass)
  }

  const logIn = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    navigation.navigate("Home")
    setState(initialState)
  }

  return (
    <TouchableWithoutFeedback onPress={() => {setIsShowKeyboard(false);
        Keyboard.dismiss();}}>
      <View style={styles.container} >
        <ImageBackground
            style={styles.image}
            source={require('./Images/PhotoBG.jpg')}
        >
            <View style={{
            ...styles.backGround,
              paddingBottom:  isShowKeyboard ? 0 : 144,
              marginBottom: isShowKeyboard ? -100 : 0,
              height: isShowKeyboard ? 350 : 489,
            }}>
            <View>
              <Text style={styles.title}>Войти</Text>
            <TextInput placeholder="Адрес электронной почты" onFocus={() => { setIsShowKeyboard(true), setEmail(true) }}
              style={{ ...styles.email, borderColor: !email ? "#E8E8E8" : "#FF6C00" }}
              value={state.email}
              onBlur={() => setEmail(false)}
              onChangeText={(value) => setState((prevState) => ({...prevState, email: value}))}
            />
            <TextInput placeholder="Пароль" onFocus={() => { setIsShowKeyboard(true), setPass(true) }} secureTextEntry={showPass}
              style={{ ...styles.password, borderColor: !pass ? "#E8E8E8" : "#FF6C00" }}
              value={state.password}
              onBlur={() => setPass(false)}
              onChangeText={(value) => setState((prevState) => ({...prevState, password: value}))}
            />
              <TouchableOpacity style={styles.showPas} onPress={togge}>
                  <Text style={styles.showPassTitle} activeOpacity={0.8}>Показать</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.logInBtn} onPress={logIn}>
              <Text style={styles.logInBtnTitle} activeOpacity={0.8}>Войти</Text>
              </TouchableOpacity>
            </View>
              <TouchableOpacity style={styles.btnlogIn} onPress={()=> navigation.navigate("Register")}>
                  <Text style={styles.reg} activeOpacity={0.8}>Нет аккаунта? Зарегистрироваться</Text>
              </TouchableOpacity>
              
          </View>
        </ImageBackground>
          
        <StatusBar style="auto" />
      </View>
    </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
  },
   image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
   backGround: {
    backgroundColor: '#fff',
    justifyContent: "flex-end",
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    // height: 489,
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    textAlign: 'center',
    
    color: "#212121",
  },
  email: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    marginTop: 33,
    paddingHorizontal: 16,
  },
  showPas: {
    marginLeft:'auto',
  },
  showPassTitle: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    marginTop: -35,
    marginRight: 16,
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
  logInBtn: {
    backgroundColor: "#FF6C00",
    alignItems: "center",
    borderRadius: 30,

    marginTop: 43,
    paddingHorizontal: 148,
    paddingVertical: 16,
  },
  logInBtnTitle: {
    color: "#FFFFFF"
  },
  btnlogIn: {
    marginTop: 16,
  },
  reg: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",
  },
});