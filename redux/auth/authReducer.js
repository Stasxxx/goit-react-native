import { createSlice } from '@reduxjs/toolkit';

const state = {
    userId: null,
    nickName: null,
    email: null,
    userPhoto: null,
    stateChenge: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickName: payload.nickName,
            email: payload.email,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),
        authSignOut: () => state,
        adduserPhoto: (state, { payload }) => ({
            ...state,
            userPhoto: payload.userPhoto,
        })
    },
})
// console.log(authSlice.getInitialState(authSlice))