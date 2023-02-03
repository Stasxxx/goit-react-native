import { StatusBar } from 'expo-status-bar';
import { useState, useEffect} from 'react';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Keyboard, TouchableWithoutFeedback, SafeAreaView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase/config';
import { authSingOutUser } from '../../redux/auth/authOperations';
import { collection, query, where, onSnapshot } from "firebase/firestore";

export const ProfileScreen = ({navigation}) => {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [image, setImage] = useState(null);
    const [userPosts, setUserPosts] = useState([])
    
    const dispatch = useDispatch();
    const { userId, nickName, userPhoto } = useSelector((state) => state.auth);

    useEffect(() => {
        getUserPosts();
    }, []);

    const getUserPosts = async () => {
        const postsRef = await collection(db, "posts")
        await onSnapshot(query(postsRef, where("userId", "==", userId)), (data) => {
            setUserPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
    };

    const lognOut = () => {
        dispatch(authSingOutUser());
    }

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
                            userPhoto  && <Image source={{ uri: userPhoto }} style={{ width: 120, height: 120 }} />
                        }                    
                        </View>
                        <TouchableOpacity onPress={addImage}>
                            <Image
                            style={styles.img}
                            source={require('../Images/add.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.logout} activeOpacity={0.6} onPress={lognOut}>
                            <Image style={{width: 24,height: 24,}} source={require('../Images/log-out.png')}/>
                    </TouchableOpacity>
                    <Text style={styles.name}>{nickName}</Text>

                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={userPosts}
                            keyExtractor={(item, indx) => indx.toString()}
                            renderItem={({ item }) =>
                                <View style={styles.post}>
                                    <Image
                                        style={styles.postImg}
                                        source={{ uri: item.photo }}
                                    />
                                    <Text style={styles.postName}>{item.fotoName}</Text>    
                                    <View style={styles.comentCont}>
                                        <View style={{ flex: 1, flexDirection: 'row'}}>
                                            <View style={{flexDirection: 'row', marginRight: 24}}>
                                                <TouchableOpacity style={{marginRight: 9, flexDirection: 'row'}} activeOpacity={0.6} onPress={()=> navigation.navigate('Comments', {postId: item.id})}>
                                                    <Image style={{width: 18,height: 18, marginRight: 9}} source={require('../Images/Coment.png')}/>
                                                    <Text>{item.commentsNumber}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <TouchableOpacity style={{marginRight: 10, flexDirection: 'row'}} activeOpacity={0.6} >
                                                    <Image style={{width: 18,height: 18, marginRight: 10}} source={require('../Images/Like.png')}/>
                                                    <Text>15</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{ flexDirection: 'row'}}>
                                            <TouchableOpacity style={{ marginRight: 4, flexDirection: 'row',alignItems: "center" }} activeOpacity={0.6} onPress={() => navigation.navigate('Map', {location:item.location})}>
                                                <Image style={{width: 16,height: 18, marginRight: 8}} source={require('../Images/map-pin.png')}/>
                                                <Text style={{borderBottomWidth: 1, borderColor: "#212121"}}>{item.locationName}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            }
                            
                        />
                    </SafeAreaView>

               
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