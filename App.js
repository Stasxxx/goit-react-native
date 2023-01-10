import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import RegistrationScreens from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';



const AuthStack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
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
      </AuthStack.Navigator>
    </NavigationContainer>
   
  );
}
