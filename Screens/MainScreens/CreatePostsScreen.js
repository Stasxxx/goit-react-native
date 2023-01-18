import { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';


export const CreatePostsScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        const location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude)
        console.log(location.coords.longitude)

        setPhoto(photo.uri);
    };
    
    const sendPhoto = () => {
        navigation.navigate('DefaultScreen', photo)
    }
    
    useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })();
  }, []);
     return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>
                    Создать публикацию
                </Text>
                 <TouchableOpacity style={styles.btnArrow} activeOpacity={0.7} onPress={() =>navigation.navigate('DefaultScreen')}>
                   <Image style={styles.imgArrow} source={require('../Images/arrow-left.png')} />  
                 </TouchableOpacity>
                 
            </View>
                
             <View style={styles.publicationCont}>
                 
                 <Camera style={styles.cameraCont} ref={setCamera}>
                    <TouchableOpacity onPress={takePhoto}  activeOpacity={0.9}>
                         <Image style={styles.cameraImg} source={require('../Images/camera.png')} />
                    </TouchableOpacity>
                 </Camera>
                 <Text style={styles.addFoto}>Загрузите фото</Text>
                
                  <TextInput style={styles.textName} placeholder="Название..."/>
                 
                <View style={{marginTop: 30}} >
                     <TextInput style={styles.textPlace} placeholder="Местность..."/>
                     <Image style={styles.textPlaceImg} source={require('../Images/map-pin.png')} />
                </View>
                <TouchableOpacity style={styles.regBtn} activeOpacity={0.8} onPress={sendPhoto}>
                  <Text style={styles.regBtnTitle} >Опубликовать</Text>
                </TouchableOpacity>
                
                 <TouchableOpacity style={styles.trashBtn} activeOpacity={0.7}>
                     <Image style={{width: 70, height: 40}} source={require('../Images/trash.png')} />
                </TouchableOpacity>
             </View>
             <StatusBar style="auto" />
        </View>
       
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    header: {
        height: 88,
        backgroundColor: '#FFFFFF',
        position: 'relative',
    },
    btnArrow: {
        position: 'absolute',
        top: 54,
        left: 16,
    },
    imgArrow: {
        width:24,
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontStyle: "normal",
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        letterSpacing: -0.408,
        paddingTop: 55,
        paddingBottom: 11,

        color: '#212121',
    },
    publicationCont: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 32,
    },
    cameraCont: {
        height: 240,
        borderRadius: 8,
    },
    cameraImg: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent:'center',
        marginVertical: 90,
        marginHorizontal: 141,
        opacity: 0.3,
    },
    addFoto: {
        marginTop: 8,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD"
    },
    textName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#212121",
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#a9a9a9',
        marginTop: 48,
    },
    textPlace: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        paddingLeft: 26,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#a9a9a9',
    },
    textPlaceImg: {
        position: 'absolute',
        bottom:15,
    },
    regBtn: {
        backgroundColor: "#F6F6F6",
        borderRadius: 30,
        marginTop: 32,
        paddingHorizontal: 118,
        paddingVertical: 16,
    },
    regBtnTitle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        color:'#BDBDBD',
    },
    trashBtn: {
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    
})