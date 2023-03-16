import { useSelector } from 'react-redux'
import {
  allNotificationsRead,
  selectAllNotifications,
} from './notificationsSlice'
import { selectAllUsers } from '../users/usersSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'
import classnames from 'classnames'
import { useDispatch } from 'react-redux'
import React, { useLayoutEffect } from 'react'

export const NotificationsList = () => {
  const dispatch = useDispatch()
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)


  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((noti) => {
    const date = parseISO(noti.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === noti.user) || {
      name: 'Unknown User',
    }

    const notificationClassName = classnames('notification', {
      new: noti.isNew,
    })

    return (
      <div key={noti.id} className={notificationClassName}>
        <div>
          <b>{user.name}</b> {noti.message}
        </div>
        <div title={noti.date}>
          <i>{timeAgo} ago</i>
        </div>
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}
