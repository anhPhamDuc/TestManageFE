/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { accountApi } from 'api/accountApi';

export const login = createAsyncThunk("account/get", async (payload) => {
    const result = await accountApi.getAccountByName(payload.Name, payload.Password, payload.TypeAccount);
    localStorage.setItem("User", JSON.stringify(result.data));
    return result.data;
})

export const updateAccount = createAsyncThunk("account/update", async (payload) => {
    const result = await accountApi.updateAccount(payload);
    return JSON.stringify(result.data);
})


// initial state
const initialState = {
    current: JSON.stringify(localStorage.getItem("User") || {}),
    loading: {},
    setting: {}
};

export const account = createSlice({
    name: 'account',
    initialState,
    reducers: {
        logout(state) {
            localStorage.removeItem("User");
            console.log("Logout run");
            state.current = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                // reducer logic here
                state.current = "error";
            })
            .addCase(updateAccount.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            .addCase(updateAccount.rejected, (state, action) => {
                // reducer logic here
                state.current = "error"
            })
            ;
    }
})

export default account.reducer;
export const { logout } = account.actions;
