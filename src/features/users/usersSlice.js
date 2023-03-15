const { createSlice } = require("@reduxjs/toolkit");


const initialState = [
    {id: '0', name: 'Tianna Jenkis'},
    {id: '1', name: 'Pedro Lopez'},
    {id: '2', name: 'Raquel Cruz'},
]


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    }
})

export default userSlice.reducer;