import { sub } from 'date-fns'

const { createSlice, nanoid } = require('@reduxjs/toolkit')

const initialState = {
  posts: [],
  status: 'idle',
  erro: null,
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: (title, content, userId) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            user: userId,
            date: new Date().toISOString(),
            reactions: {thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0}
          },
        }
      },
    },
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const postToEdit = state.find((post) => post.id === id)
      if (postToEdit) {
        postToEdit.title = title
        postToEdit.content = content
      }
    },
    reactionAdded: {
        reducer: (state, action) => {
            const {id, reaction} = action.payload
            const postToAddReaction = state.find((post) => post.id === id);
            if (postToAddReaction){
                postToAddReaction.reactions[reaction]++
            }
            },
        prepare: (id, reaction) => {
            return {
                payload: {
                    id: id,
                    reaction: reaction
                }
            }
        }
    }
  },
})

export default postsSlice.reducer
export const { postAdded } = postsSlice.actions
export const { postUpdated } = postsSlice.actions
export const { reactionAdded } = postsSlice.actions

export const selectAllPosts = state => state.posts
export const selectPostById = (state, postId) => state.posts.find(post=>post.id === postId)
