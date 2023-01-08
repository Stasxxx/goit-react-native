import { StatusBar } from 'expo-status-bar';
import RegistrationScreens from './Screens/RegistrationScreen';
import LoginScreen from './Screens/LoginScreen';

export default function App() {
  return (
    <>
      <RegistrationScreens />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </>
   
  );
}
