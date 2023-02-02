import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { useFonts } from 'expo-font';
import { Router } from './router';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase/config';
import {Main} from './components/Main';


export default function App() {

  const [fontsLoaded] = useFonts({
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
    return null;
  };
  
  // const routing = Router(user);

  return (
    <Provider store={store} >
      <Main/>
      {/* <NavigationContainer>{routing}</NavigationContainer> */}
    </Provider>
  );
}
