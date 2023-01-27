import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { Router } from "../router";
import { auth } from '../firebase/config';
import { authStateChangeUser } from '../redux/auth/authOperations'; 

export const Main = () => {
    // const [user, setUser] = useState(null);
    
    const dispatch = useDispatch();

    const {stateChange} = useSelector((state) => state.auth)
    //  console.log(state)
    // onAuthStateChanged(auth, (user) => { setUser(user) });

    useEffect(() => {
        dispatch(authStateChangeUser());
    },[])
    const routing = Router(stateChange);

    return (
        <NavigationContainer>{routing}</NavigationContainer>
    )
}
