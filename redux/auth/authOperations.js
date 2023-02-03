import {auth} from "../../firebase/config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { authSlice } from "./authReducer";
import { onAuthStateChanged } from "firebase/auth";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const {updateUserProfile, authStateChange, authSignOut, adduserPhoto } = authSlice.actions;

export const authSingUpUser = ({nickName, email, password, image}) => async (dispatch, getState) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = await auth.currentUser;

        await updateProfile(user, {
            displayName: nickName,
            photoURL: image,
        })
        
        if (image) {
            const response = await fetch(image);
            const file = await response.blob();

            const storageRef = await ref(storage, `image/${nickName}`);

            await uploadBytes(storageRef, file);

            const img = await getDownloadURL(storageRef);
            await updateProfile(user, {
            photoURL: img,
        })}

        const { uid, displayName, photoURL } = await auth.currentUser;
        console.log(photoURL)
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
                email: user.email,
            }
            const userUpdatePhoto = {
                userPhoto: user.photoURL
            }

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(userUpdateProfile));
            dispatch(adduserPhoto(userUpdatePhoto))
       }
    });
};
 
export const addPhoto = () => async (dispatch, getState) => {
    
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            const userUpdatePhoto = {
                userPhoto: photoURL,
            }

            dispatch(adduserPhoto(userUpdatePhoto))
        }
    })
}