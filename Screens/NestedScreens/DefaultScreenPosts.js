import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector } from 'react-redux';
import { authSingOutUser } from "../../redux/auth/authOperations";
import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

export const DefaultScreenPosts = ({route, navigation}) => {
    const [posts, setPosts] = useState([]);
    const { email, nickName,userPhoto } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        getAllPosts()
    }, [])
    
    const getAllPosts = async () => {
        await onSnapshot(collection(db, "posts"), (data) => {
            setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
        // console.log(posts )
    }

    const lognOut = () => {
        dispatch(authSingOutUser());
    }

    
    
    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>
                    Публикации
                </Text>
                <TouchableOpacity style={styles.logout} activeOpacity={0.6} onPress={lognOut}>
                    <Image source={require('../Images/log-out.png')}/>
                 </TouchableOpacity>
            </View>
                
            <View style={styles.publicationCont}>
                <View style={styles.user}>
                    <View style={styles.img}>
                          { userPhoto && <Image source={{uri: userPhoto}} style={{ width: 60, height: 60 }}/>}
                    </View>
                    <View style={styles.userData}>
                        <Text style={styles.userName}>
                        {nickName}
                        </Text>
                        <Text style={styles.userEmail}>
                        {email}
                        </Text>
                    </View> 
                </View>

                
                    <FlatList data={posts}
                    keyExtractor={(item, indx) => indx.toString()}
                    renderItem={({ item }) => (
                    <View style={styles.imgCont}>
                        <Image
                            source={{ uri: item.photo }}
                            style={{ width:343, height: 240, borderRadius: 8}}
                        />    
                        <Text style={styles.postName}>{item.fotoName}</Text>
                        <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 11}}>
                            <View>
                                <TouchableOpacity style={{flexDirection: "row"}} activeOpacity={0.6} onPress={() => navigation.navigate('Comments', {postId: item.id})}>
                                    <Image style={{width: 18,height: 18,}} source={require('../Images/Shape.png')}/>
                                        {item.commentsNumber ?
                                            <Text style={{ marginLeft: 9 }}>{item.commentsNumber}</Text> :
                                            <Text style={{ marginLeft: 9 }}>0</Text>
                                        }
                                </TouchableOpacity>
                                
                            </View>
                            <View>
                                <TouchableOpacity style={{flexDirection: "row"}} activeOpacity={0.6} onPress={()=> navigation.navigate('Map', {location:item.location})}>
                                    <Image style={{width: 24,height: 24,}} source={require('../Images/map-pin.png')}/>
                                    <Text style={{marginLeft: 9}}>{item.locationName}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    )}
                    />
            </View>
            <StatusBar style="auto" />
        </View>
       
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 88,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontFamily: 'Roboto-Medium',
        fontStyle: "normal",
        fontSize: 17,
        lineHeight: 22,
        textAlign: 'center',
        paddingTop: 55,
        paddingBottom: 11,
        position:'relative',

        color: '#212121',
    },
    logout: {
        position: 'absolute',
        right: 16,
        bottom: 10,
    },
    publicationCont: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 32,
        paddingBottom:45,
    },
    user: {
        flexDirection: 'row',
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: "#F6F6F6",
        overflow:'hidden',
    },
    userData: {
        marginLeft: 8,
        justifyContent: 'center',
    },
    userName: {
        fontFamily: 'Roboto-Bold',
        fontStyle: 'normal',
        // fontWeight: 700,
        fontSize: 13,
        lineHeight: 15,
        color: '#212121',
    },
    userEmail: {
        fontFamily: 'Roboto-Regular',
    },
    imgCont: {
        marginTop: 32,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    postName: {
        marginTop: 8,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#212121"
    },
    imgPost: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent:'center',
        marginVertical: 90,
        marginHorizontal: 141,
    },
})