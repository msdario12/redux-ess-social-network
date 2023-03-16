import { sub } from 'date-fns'
import { client } from '../../api/client'

const { createSlice, nanoid, createAsyncThunk, createSelector } = require('@reduxjs/toolkit')

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost) => {
    // We send the initial data to the fake API server
    const response = await client.post('fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // The existing `postAdded` reducer and prepare callback were deleted
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const postToEdit = state.posts.find((post) => post.id === id)
      if (postToEdit) {
        postToEdit.title = title
        postToEdit.content = content
      }
    },
    reactionAdded: {
      reducer: (state, action) => {
        const { id, reaction } = action.payload
        const postToAddReaction = state.posts.find((post) => post.id === id)
        if (postToAddReaction) {
          postToAddReaction.reactions[reaction]++
        }
      },
      prepare: (id, reaction) => {
        return {
          payload: {
            id: id,
            reaction: reaction,
          },
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        // Creo que esto puede ser distinto
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.posts.push(action.payload)
      })
  },
})

export default postsSlice.reducer
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.user === userId)
)