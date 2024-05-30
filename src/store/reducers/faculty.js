/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { facultyApi } from 'api/facultyApi';

const initialState = {
    loading: {},
    setting: {}
};

export const getFaculty = createAsyncThunk("faculties/get", async (payload) => {
    try {
        const result = await facultyApi.getAllFaculty();
        return result.data;
    }
    catch (e) {
        console.log("Loi: " + e.message)
    }
})

export const getFacultyByName = createAsyncThunk("faculties/getByName", async (payload) => {
    const result = await topicApi.getTopicByAccount(payload);
    return JSON.stringify(result.data);
})

export const faculty = createSlice({
    name: 'faculty',
    initialState,
    reducers: {
        // logout(state) {
        //     state.current = {}
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFaculty.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            .addCase(getFaculty.rejected, (state, action) => {
                // reducer logic here
                state.current = "error";
            })
            .addCase(getFacultyByName.fulfilled, (state, action) => {
                // reducer logic here
                state.current = action.payload
            })
            ;
    }
})

export default faculty.reducer;
// export const { logout } = topic.actions;