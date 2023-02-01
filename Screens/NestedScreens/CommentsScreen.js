import { useState } from "react";
import { View, Text } from "react-native";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";

export const CommentsScreen = ({route}) => {
    const { postId } = route.params;
    const [ comment, setComment ] = useState("");
    const { nickName } = useSelector((state) => state.auth);

    const createPost = () => { };
    // console.log(postId)
    return (
        <View>
            <Text>Hi</Text>
        </View>
    )
}