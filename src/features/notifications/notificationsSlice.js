import { client } from '../../api/client'
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit')

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: [],
  reducer: {
    allNotificationsRead: (state, action) => {
      state.forEach((noti) => {
        noti.read = true
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.push(...action.payload)
      // Any notifications we've read are no longer new
      state.forEach((noti) => {
        noti.isNew = !noti.read
      })
      // Sort with newest first
      state.sort((a, b) => b.date.localeCompare(a.date))
    })
  },
})

export default notificationsSlice.reducer
export const selectAllNotifications = (state) => state.notifications
export const { allNotificationsRead } = notificationsSlice.actions
