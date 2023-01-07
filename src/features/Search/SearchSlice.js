import { createSlice } from "@reduxjs/toolkit";
import { CreateApi } from "@reduxjs/toolkit/dist/query";

const initialState = {
    searchList:[]
}

const searchSlice = createSlice({
    name:"searchSlice",
    initialState,
    reducers:{

    }
})



export default searchSlice.reducer