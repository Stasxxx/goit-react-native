import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useDispatch } from 'react-redux';

import { authSingUpUser } from '../redux/auth/authOperations'
const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreens({navigation}) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [image, setImage] = useState(null);
  const [login, setLogin] = useState(false);
  const [pass, setPass] = useState(false);
  const [email, setEmail] = useState(false);
  const [showPass, setShowPass] = useState(true);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

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

    dispatch(authSingUpUser(state))
    // navigation.navigate("Home");
    setState(initialState)
  }

  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1,
    });
    const uri = _image.assets[0].uri 
    console.log(JSON.stringify(_image.canceled));
  if (!_image.canceled) {
    setImage(uri);
  }
  };

  return (
      <TouchableWithoutFeedback onPress={() => {setIsShowKeyboard(false);
    Keyboard.dismiss();}}>
        <View style={styles.container}>
          
        <ImageBackground
                style={styles.image}
                source={require('./Images/PhotoBG.jpg')}
        >
          <View style={{
            ...styles.backGround,
            marginBottom: isShowKeyboard ? -100 : 0,
            paddingBottom: isShowKeyboard ? 0 : 78,
            height: isShowKeyboard ? 470 : 549,
          }}>
          <View style={styles.addFoto}>
            <View style={styles.contFoto}>
              {
                image  && <Image source={{ uri: image }} style={{ width: 120, height: 120 }} />
              }
              
            </View>
            <TouchableOpacity onPress={addImage}>
                <Image
                style={styles.img}
                source={require('./Images/add.png')}
                />
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
        </ImageBackground>
        
          
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
    // alignItems: "center",
  },
  backGround: {
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: 549,
  },
  contFoto: {
    overflow:'hidden',
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  // imgPos: {
  //   position:'relative',
  // },
  img: {
    position: 'absolute',
    bottom: 15,
    right: -10,
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