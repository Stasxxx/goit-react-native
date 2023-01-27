import {auth} from "../../firebase/config";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { authSlice } from "./authReducer";

export const authSingUpUser = ({login, email, password}) => async (dispatch, getState) => {
    try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password);
        dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));
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