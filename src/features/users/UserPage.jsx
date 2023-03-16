import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import {
  selectAllPosts,
  selectPostsByUser,
} from '../../features/posts/postsSlice'
import { Link } from 'react-router-dom'

export const UserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))

  const postForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postTitles = postForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>

      <ul>{postTitles}</ul>
    </section>
  )
}
