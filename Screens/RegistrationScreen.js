import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreens({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [login, setLogin] = useState(false);
  const [pass, setPass] = useState(false);
  const [email, setEmail] = useState(false);
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

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState)
  }
  return (
      <TouchableWithoutFeedback onPress={() => {setIsShowKeyboard(false);
    Keyboard.dismiss();}}>
        <View style={styles.container}>
          
            <ImageBackground
                style={styles.image}
                source={require('./Images/PhotoBG.jpg')}
            ></ImageBackground>
        
          <View style={{
            ...styles.backGround,
            marginBottom: isShowKeyboard ? -100 : 78,
          }}>
          <View style={styles.contFoto}>
            <TouchableOpacity style={styles.addFoto}>
              <Image
              style={styles.img}
              source={require('./Images/add.png')}
              ></Image>
          </TouchableOpacity>
          </View>
          <View>
              <Text style={styles.regTitle}>Регистрация</Text>
            <TextInput placeholder="Логин" onFocus={() => { setIsShowKeyboard(true), setLogin(true)}} 
              style={{ ...styles.login, borderColor: !login ? "#E8E8E8" : "#FF6C00" }}
              value={state.login}
              onBlur={() => setLogin(false)}
              onChangeText={(value) => setState((prevState) => ({...prevState, login: value}))}
          />
            <TextInput selectionColor={{ borderColor: "#FF6C00" }} placeholder="Адрес электронной почты" onFocus={() => { setIsShowKeyboard(true),setEmail(true) }}
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
              <TouchableOpacity style={styles.regBtn} onPress={keyboardHide}>
                  <Text style={styles.regBtnTitle} activeOpacity={0.8}>Зарегистрироваться</Text>
            </TouchableOpacity>
          </View>
              <TouchableOpacity style={styles.btnlogIn} onPress={()=> navigation.navigate("Login")}>
                  <Text style={styles.logInTitle} activeOpacity={0.8}>Уже есть аккаунт? Войти</Text>
              </TouchableOpacity>
        </View>
        <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    )
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
    borderRadius: 20,
    
    height: 470,
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

    textAlign: 'center',
    marginTop: 32,
    color: "#212121",
  },
  login: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    marginTop: 33,
    paddingHorizontal: 16,
  },
  email: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#F6F6F6",

    marginTop: 16,
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
    marginRight: 15,
    textAlign: 'right',
    

    color: "#1B4371",
  },
  password: {
    width: 343,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
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
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",

    color: "#1B4371",
  },
});