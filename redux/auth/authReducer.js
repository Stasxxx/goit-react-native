import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        nickName: null,
        stateChenge: false,
    },
    reducers: {
        updateUserProfile: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            nickName: payload.nickName,
        }),
        authStateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        })
    },
})
// console.log(authSlice.getInitialState(authSlice))