import { StyleSheet, View, Text, Image,TextInput,TouchableOpacity } from "react-native";
import { StatusBar } from 'expo-status-bar';


export const CreatePostsScreen = ({navigation}) => {
     return (
        <View style={styles.container}>
             <View style={styles.header}>
                <Text style={styles.title}>
                    Создать публикацию
                </Text>
                 <TouchableOpacity style={styles.btnArrow} activeOpacity={0.7} onPress={() =>navigation.navigate('Post')}>
                   <Image style={styles.imgArrow} source={require('../Images/arrow-left.png')} />  
                 </TouchableOpacity>
                 
            </View>
                
             <View style={styles.publicationCont}>
                 <View style={styles.imgCont}>
                        <Image style={styles.img} source={require('../Images/camera.png')} />
                 </View>
                 <Text style={styles.addFoto}>Загрузите фото</Text>
                <TouchableOpacity style={styles.titlePlace} activeOpacity={0.7}>
                  <Text style={styles.textName}>Название...</Text>
                 </TouchableOpacity>
                <TouchableOpacity style={styles.place} activeOpacity={0.7}>
                     <Text style={styles.textPlace}>Местность...</Text>
                     <Image style={styles.textPlaceImg} source={require('../Images/map-pin.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.regBtn} activeOpacity={0.8}>
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
    imgCont: {
        width: 343,
        height: 240,
        backgroundColor: '#F6F6F6',
        border: 1,
        borderColor: '#E8E8E8',
        borderRadius: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    img: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignContent:'center',
        marginVertical: 90,
        marginHorizontal: 141,
    },
    addFoto: {
        marginTop: 8,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD"
    },
    titlePlace: {
        marginTop: 48,
        position: 'relative',
        // borderWidth: 5,
        // borderRadius: 30,
        // backgroundColor: "#F6F6F6",
    },
    textName: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#a9a9a9',
    },
    textPlace: {
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
        paddingLeft: 26,
        paddingBottom: 15,
        marginTop: 32,
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
        marginTop: 120,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    
})