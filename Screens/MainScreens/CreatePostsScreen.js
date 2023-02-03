import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { storage, db } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore"; 
// import { set, push } from "firebase/database";

export const CreatePostsScreen = ({ navigation }) => {
    const [camera, setCamera] = useState(null);
    const [photo, setPhoto] = useState("");
    const [fotoName, setFotoName] = useState("");
    const [locationName, setLocationName] = useState("");
    const [location, setLocation] = useState(null);

    const { userId, nickName } = useSelector((state) => state.auth);

    useEffect(() => {
    (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
        let location = await Location.getCurrentPositionAsync({});
        
        setLocation(location);
        
    })();
    }, []);

    const takePhoto = async () => {
        const {uri} = await camera.takePictureAsync();
        // const location = await Location.getCurrentPositionAsync({});
        
        setPhoto(uri);
    };
    
    const sendPhoto = () => {
        // uploadPhotoToServer()
        uploadPostToServer();
        navigation.navigate('DefaultScreen')
    };

    const uploadPostToServer = async () => {
        const photo = await uploadPhotoToServer();
        const uniquePostId = Date.now().toString();
        const createPost = await addDoc(collection(db, "posts"), {photo, fotoName, locationName, location: location.coords, userId, nickName});
        
    }
    
    const uploadPhotoToServer = async () => {
        const response = await fetch(photo);
        const file = await response.blob();
        const uniquePostId = Date.now().toString();

        const storageRef = await ref(storage, `image/${uniquePostId}`);

        await uploadBytes(storageRef, file);

        const img = await getDownloadURL(storageRef);
        return img;
    }

    
    
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
                
                <TextInput style={styles.textName} placeholder="Название..." onChangeText={setFotoName}/>
                 
                <View style={{marginTop: 30}} >
                     <TextInput style={styles.textPlace} placeholder="Местность..." onChangeText={setLocationName}/>
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
        marginHorizontal: 150,
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