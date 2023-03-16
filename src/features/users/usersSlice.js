import { client } from '../../api/client'

const { createSlice, createAsyncThunk, createEntityAdapter } = require('@reduxjs/toolkit')

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})


const usersAdapter = createEntityAdapter()

const initialState = usersAdapter.getInitialState()

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll)
  },
})

export default userSlice.reducer
// export const selectAllUsers = (state) => state.users
// export const selectUserById = (state, userId) =>
//   state.users.find((user) => user.id === userId)

export const {selectAll: selectAllUsers,
        selectById: selectUserById} = usersAdapter.getSelectors(state => state.users)
