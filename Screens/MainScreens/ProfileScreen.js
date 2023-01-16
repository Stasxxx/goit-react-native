import { StatusBar } from 'expo-status-bar';
import { useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';



export const ProfileScreen = ({navigation}) => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [image, setImage] = useState(null);
    

    const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4,3],
    quality: 1,
    });
    const uri = _image.assets[0].uri 
    if (!_image.canceled) {
        setImage(uri);
    }
        };
    
    return (
        <View style={styles.container}>
          
            <ImageBackground
                style={styles.image}
                source={require('../Images/PhotoBG.jpg')}
            >
                <View style={styles.backGround}>
                    <View style={styles.addFoto}>
                        <View style={styles.contFoto}>
                        {
                            image  && <Image source={{ uri: image }} style={{ width: 120, height: 120 }} />
                        }                    
                        </View>
                        <TouchableOpacity onPress={addImage}>
                            <Image
                            style={styles.img}
                            source={require('../Images/add.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logout} activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>
                            <Image style={{width: 24,height: 24,}} source={require('../Images/log-out.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>Natali Romanova</Text>
                <View style={styles.post}>
                        <Image style={styles.postImg}/>
                        <Text style={styles.postName}>Ім'я посту</Text>    
                        <View style={styles.comentCont}>
                            <View style={{ flex: 1, flexDirection: 'row'}}>
                                <View style={{flexDirection: 'row', marginRight: 24}}>
                                    <TouchableOpacity style={{marginRight: 9}} activeOpacity={0.6} onPress={()=> navigation.navigate('Comments')}>
                                        <Image style={{width: 18,height: 18,}} source={require('../Images/Coment.png')}/>
                                    </TouchableOpacity>
                                    <Text>0</Text>
                                </View>
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity style={{marginRight: 10}} activeOpacity={0.6} >
                                        <Image style={{width: 18,height: 18,}} source={require('../Images/Like.png')}/>
                                    </TouchableOpacity>
                                    <Text>15</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row'}}>
                                <TouchableOpacity style={{ marginRight: 4 }} activeOpacity={0.6} onPress={() => navigation.navigate('Map')}>
                                <Image style={{width: 18,height: 18,}} source={require('../Images/map-pin.png')}/>
                                </TouchableOpacity>
                                <Text>Розташування</Text>
                            </View>
                        </View>
                </View>
            </View>

            </ImageBackground>
        <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
   image: {
       flex: 1,
       resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
    },
    backGround: {
    flex: 0.7,
    position: 'relative',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    paddingLeft: 16,
    paddingRight: 16,
    },
    logout: {
        position: 'absolute',
        right: 16,
        top: 22,
    },
    addFoto: {
        marginTop: -60,
    },
   contFoto: {
    overflow:'hidden',
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
  },
  img: {
    position: 'absolute',
    bottom: 15,
    right: -10,
    },
  name: {
      marginTop: 32,
    fontFamily: 'Roboto-Medium',
    fontSize: 30,
    lineHeight: 35,
    textAlign: 'center',
      letterSpacing: 0.01,
    color: "#212121",
    },
    post: {
        marginTop: 33,
        alignItems: 'center',
    },
    postImg: {
        height: 240,
        width: 343,
        backgroundColor: "#F6F6F6",
        borderRadius: 8,
    },
    postName: {
        fontFamily: 'Roboto-Medium',
        fontSize: 16,
        lineHeight: 19,
        color: '#212121',

        marginTop: 8,
        marginRight: 'auto',
    },
    comentCont: {
        flexDirection: 'row',
        marginTop: 11,
        
    },
});