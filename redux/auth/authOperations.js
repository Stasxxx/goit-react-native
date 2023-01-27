import {auth} from "../../firebase/config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authSlice } from "./authReducer";
import { onAuthStateChanged } from "firebase/auth";

export const authSingUpUser = ({nickName, email, password}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = await auth.currentUser;

        await updateProfile(user, {
            displayName: nickName,
        })

        const { uid, displayName } = await auth.currentUser;
        
        dispatch(
            authSlice.actions.updateUserProfile({
                userId: uid,
                nickName: displayName,
            }));
    } catch(error) {
        console.log("error", error);
        console.log("error.message", error.message);
    }
};
 
export const authSingInUser = ({email, password}) => async (dispatch, getState) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch(error) {
        console.log("error", error);
        console.log("error.message", error.message);
    }
};
 
const authSingOutUser = () => async (dispatch, getState) => { };

export const authStateChangeUser = () => async (dispatch, getState) => {

    await onAuthStateChanged(auth, (user) => { 
        if (user) {
            const userUpdateProfile = {
                nickName: user.displayName,
                userId: user.uid,
            }
            
            dispatch(authSlice.actions.authStateChange({ stateChange: true }));
            dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
       }
    });
 };