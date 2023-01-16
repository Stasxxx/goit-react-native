import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PostsScreen } from './PostsScreen';
import { CreatePostsScreen } from './CreatePostsScreen';
import { ProfileScreen } from './ProfileScreen';
import { CommentsScreen } from './CommentsScreen';
import { MapScreen } from './MapScreen'


const MainTab = createBottomTabNavigator()

export const Home = ({navigation}) => {
    return (
            <MainTab.Navigator screenOptions={{
  "tabBarShowLabel": false,
  "tabBarStyle": [
    {
        "display": "flex",
        "height": 83,
    },
    null
  ]
}}>
            <MainTab.Screen options={
                {
                    headerShown: false , tabBarIcon: () => {
                    return <Image style={styles.img}
                                source={require('../Images/Post.png')}
                        />
                    }
                }}
                name='Post' component={PostsScreen} />
            <MainTab.Screen options={
                {
                    headerShown: false,
                    tabBarIcon: () => {
                    return <Image style={styles.create}
                                source={require('../Images/create.png')}
                        />
                    },
                    tabBarStyle: { display: "none" }
                }}
                name='Create' component={CreatePostsScreen} />
            <MainTab.Screen options={
                {
                headerShown: false , tabBarIcon: () => {
                    return <Image style={styles.img}
                                source={require('../Images/user.png')}
                        />
                    }
                }}
                name='Profile' component={ProfileScreen} />
            <MainTab.Screen  detachInactiveScreens={false} options={
                { tabBarButton: ()=> null ,tabBarStyle: { display: "none" }, headerShown: false}}
                name='Comments' component={CommentsScreen} />
             <MainTab.Screen  detachInactiveScreens={false} options={
                { tabBarButton: ()=> null ,tabBarStyle: { display: "none" }, headerShown: false}}
                name='Map' component={MapScreen} />
            </MainTab.Navigator>
    )
}


const styles = StyleSheet.create({
    img: {
        height: 24,
        width: 24,
    },
    create: {
        height: 40,
        width: 70,
        borderRadius: 20
    },
})

