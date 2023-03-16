import { useSelector } from 'react-redux'
import { selectAllNotifications } from './notificationsSlice'
import { selectAllUsers } from 'src/features/users/usersSlice'
import { parseISO, formatDistanceToNow } from 'date-fns'

export const NotificationsList = () => {
  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  const renderedNotifications = notifications.map((noti) => {
    const date = parseISO(noti.date)
    const timeAgo = formatDistanceToNow(date)
    const user = users.find((user) => user.id === noti.user) || {
      name: 'Unknow User',
    }

    return (
      <div key={noti.id} className="notification">
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
