import { StatusBar } from 'expo-status-bar';
import RegistrationScreens from './RegistrationScreen';
import LoginScreen from './LoginScreen';

export default function App() {
  return (
    <>
      <RegistrationScreens />
      {/* <LoginScreen/> */}
      <StatusBar style="auto" />
    </>
   
  );
}
