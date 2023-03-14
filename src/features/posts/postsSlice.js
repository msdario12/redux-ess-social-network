const { createSlice } = require("@reduxjs/toolkit");

const initialState = [
    {id: '1', title: 'First Post', content: 'Hello!',},
    {id: '2', title: '2First Post', content: '2Hello!',},
    {id: '3', title: '3First Post', content: '3Hello!',},
    {id: '4', title: '4First Post', content: '4Hello!',},
]


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: (state, action) => {
            state.push(action.payload)
        }
    },
})

export default postsSlice.reducer;
export const {postAdded} = postsSlice.actions;