import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { db } from "../../firebase/config";
import { doc, addDoc, collection, onSnapshot, updateDoc } from "firebase/firestore"
import { useSelector } from "react-redux";

export const CommentsScreen = ({route}) => {
    const { postId } = route.params;
    const [comment, setComment] = useState("");
    const [ allComments, setAllComments ] = useState(null);
    const { nickName } = useSelector((state) => state.auth);

    useEffect(() => {
        getAllPosts();
    }, []);

    const createPost = async () => {
        await addDoc(collection(doc(db, "posts", postId), "comments"), { comment, nickName });
        await addCommentsNumber()
     };

    const getAllPosts = async () => {
        await onSnapshot(collection(doc(db, "posts", postId), "comments"), (data) => {
            setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        })
        
        addCommentsNumber()
   
    }
    // console.log(allComments)
    const addCommentsNumber = async () => {
        if (allComments === 0 || allComments !== null) {
            const number = await allComments.length;
            console.log(number)
           return await updateDoc(doc(db, "posts", postId), { commentsNumber: number })
        }
    }
    // console.log(allComments)
    return (
        <View >
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={allComments}
                    renderItem={({ item }) =>
                        <View>
                            <Text>{item.nickName }</Text>
                            <Text>{item.comment }</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>

            <View style={{marginTop: "auto"}}>
                <TextInput style={styles.input } placeholder="Комментировать..." onChangeText={setComment}/>
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.7} onPress={createPost}>
                     <Image source={require('../Images/arrow-top.png')} />
            </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    input: {
        position: 'relative',
        // justifyContent: 'flex-end',
        height: 50,
        paddingLeft: 16,
        color: "#BDBDBD",
        backgroundColor: "#F6F6F6",
        borderRadius: 100,
        borderWidth: 1,
        borderColor: "#E8E8E8"
    },
    sendBtn: {
        position: 'absolute',
        right: 8,
        bottom: 8,
        backgroundColor: "#FF6C00",
        width: 34,
        height: 34,
        borderRadius: 100,
        paddingLeft: 11,
        paddingTop: 8,
    },
})
