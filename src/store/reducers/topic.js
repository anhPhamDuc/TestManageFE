/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { topicApi } from 'api/topicApi';

export const getTopic = createAsyncThunk("topic/get", async (payload) => {
    try {
        const result = await topicApi.getAllTopic();
        return result.data;
    }
    catch (e) {
        console.log(e.message)
    }
})

export const getTopicByAccount = createAsyncThunk("topic/getByAccount", async (payload) => {
    const result = await topicApi.getTopicByAccount(payload);
    return JSON.stringify(result.data);
})

export const registerTopic = createAsyncThunk("topic/registerTopic", async (payload) => {
    const result = await topicApi.registerTopic(payload);
    return JSON.stringify(result.data);
})

// initial state
const initialState = {
    loading: {},
    setting: {}
};

export const topic = createSlice({
    name: 'topic',
    initialState,
    reducers: {
        logout(state) {
            state.current = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTopic.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            .addCase(getTopic.rejected, (state, action) => {
                // reducer logic here
                state.current = "error";
            })
            .addCase(getTopicByAccount.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            .addCase(registerTopic.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            ;
    }
})

export default topic.reducer;
export const { logout } = topic.actions;