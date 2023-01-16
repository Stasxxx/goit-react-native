import { createStackNavigator } from "@react-navigation/stack";
import RegistrationScreens from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';
import {Home} from "./Screens/MainScreens/Home";


const AuthStack = createStackNavigator();

export const Router = (isAuth) => {
    if (!isAuth) {
        return (
            <AuthStack.Navigator>
                <AuthStack.Screen options={{
                        headerShown: false,
                }}
                    name="Login"
                    component={LoginScreen} />
                <AuthStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Register"
                    component={RegistrationScreens} />
                <AuthStack.Screen
                    options={{
                        headerShown: false,
                    }}
                    name="Home"
                    component={Home} />
            </AuthStack.Navigator>
        );
    }
    // return (<Home/>)
    
}
