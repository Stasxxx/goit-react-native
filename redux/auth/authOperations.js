import {auth} from "../../firebase/config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authSlice } from "./authReducer";
import { onAuthStateChanged } from "firebase/auth";

const {updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSingUpUser = ({nickName, email, password, image}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = await auth.currentUser;

        await updateProfile(user, {
            displayName: nickName,
            photoURL: image,
        })
        console.log(image)
        console.log(user)
        const { uid, displayName, photoURL } = await auth.currentUser;
        
        dispatch(
            updateUserProfile({
                userId: uid,
                nickName: displayName,
                userPhoto: photoURL
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
 
export const authSingOutUser = () => async (dispatch, getState) => {
    signOut(auth);
    dispatch(authSignOut());
 };

export const authStateChangeUser = () => async (dispatch, getState) => {

    await onAuthStateChanged(auth, (user) => { 
        if (user) {
            const userUpdateProfile = {
                nickName: user.displayName,
                userId: user.uid,
            }
            
            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userUpdateProfile));
       }
    });
 };