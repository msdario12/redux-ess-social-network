import { client } from '../../api/client'

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const initialState = []

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload
    })
  },
})

export default userSlice.reducer
export const selectAllUsers = (state) => state.users
export const selectUserById = (state, userId) =>
  state.users.find((user) => user.id === userId)
