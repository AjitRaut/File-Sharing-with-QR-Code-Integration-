import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const shareFile = createAsyncThunk("file/shareFile", async ({ fileName }) => {
    const response = await axios.post("http://localhost:5000/files/share", { fileName });
    return response.data;
});

const fileSlice = createSlice({
    name: "file",
    initialState: { secureLink: "", qrCode: "", status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(shareFile.fulfilled, (state, action) => {
                state.secureLink = action.payload.secureLink;
                state.qrCode = action.payload.qrCode;
                state.status = "succeeded";
            })
            .addCase(shareFile.pending, (state) => {
                state.status = "loading";
            })
            .addCase(shareFile.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default fileSlice.reducer;
