import {client} from '../../api/client'

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await client.get('/fakeApi/users');
    return response.data

})

const initialState = [
    {id: '0', name: 'Tianna Jenkis'},
    {id: '1', name: 'Pedro Lopez'},
    {id: '2', name: 'Raquel Cruz'},
]


const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state = action.payload
            })
    }
})

export default userSlice.reducer;