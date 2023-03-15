import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostAuthor } from './PostAuthor.jsx'
import { selectAllPosts } from './postsSlice.js'
import { ReactionsButtons } from './ReactionsButtons.jsx'
import { TimeAgo } from './TimeAgo.jsx'

export const PostsList = () => {
  const posts = useSelector(selectAllPosts)

  // Sort posts in reverse chronological order by datetime string
  const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  const rederedPosts = orderedPosts.map((post) => (
    <article className="post-excerpt" key={post.id}>
      <h3>{post.title}</h3>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <Link to={`/posts/${post.id}`} className="button muted-button">
        View Post
      </Link>
      <PostAuthor userId={post.id} />
      <TimeAgo timestamp={post.date} />
      <ReactionsButtons post={post}/>
    </article>
  ))

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {rederedPosts}
    </section>
  )
}
