import { sub } from 'date-fns'

const { createSlice, nanoid } = require('@reduxjs/toolkit')

const initialState = [
  {
    id: '1',
    title: 'First Post',
    content: 'Hello!',
    user: 'Pedro',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {thumbsUp: 4, hooray: 0, heart: 2, rocket: 0, eyes: 0},
  },
  {
    id: '2',
    title: '2First Post',
    content: '2Hello!',
    user: 'Pedro1',
    date: sub(new Date(), { minutes: 15 }).toISOString(),
    reactions: {thumbsUp: 12, hooray: 0, heart: 52, rocket: 0, eyes: 0},
  },
  {
    id: '3',
    title: '3First Post',
    content: '3Hello!',
    user: 'Pedro2',
    date: sub(new Date(), { minutes: 25 }).toISOString(),
    reactions: {thumbsUp: 743, hooray: 0, heart: 0, rocket: 345, eyes: 0},
  },
  {
    id: '4',
    title: '4First Post',
    content: '4Hello!',
    user: 'Pedro3',
    date: sub(new Date(), { minutes: 35 }).toISOString(),
    reactions: {thumbsUp: 0, hooray: 2353, heart: 25, rocket: 0, eyes: 0},
  },
]

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
