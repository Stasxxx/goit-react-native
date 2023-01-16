import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';

export const PostsScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>
                    Публикации
                </Text>
                <TouchableOpacity style={styles.logout} activeOpacity={0.6} onPress={() => navigation.navigate('Login')}>
                    <Image source={require('../Images/log-out.png')}/>
                 </TouchableOpacity>
            </View>
                
            <View style={styles.publicationCont}>
                <View style={styles.user}>
                    <View style={styles.img}>
                        <Image />
                    </View>
                    <View style={styles.userData}>
                        <Text style={styles.userName}>
                        Name
                        </Text>
                        <Text style={styles.userEmail}>
                        Email@email
                        </Text>
                    </View> 
                </View>
                <View >
                    <View style={styles.imgCont}>
                            <Image style={styles.imgPost} source={require('../Images/camera.png')} />
                    </View>
                    <Text style={styles.postName}>Имя</Text> 
                    <View style={{flexDirection: "row", justifyContent: 'space-between', marginTop: 11}}>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={{marginRight: 9}} activeOpacity={0.6} >
                                <Image style={{width: 18,height: 18,}} source={require('../Images/Shape.png')}/>
                            </TouchableOpacity>
                            <Text>0</Text>
                        </View>
                        <View style={{flexDirection: "row"}}>
                            <TouchableOpacity style={{marginRight: 9}} activeOpacity={0.6} >
                                <Image style={{width: 24,height: 24,}} source={require('../Images/map-pin.png')}/>
                            </TouchableOpacity>
                            <Text>Розташування</Text>
                        </View>
                    </View>
                    
                </View>
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
    },
    user: {
        flexDirection: 'row',
    },
    img: {
        width: 60,
        height: 60,
        borderRadius: 16,
        backgroundColor: "#F6F6F6",
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
        width: 343,
        height: 240,
        backgroundColor: '#F6F6F6',
        border: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
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