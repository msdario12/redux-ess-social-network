import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAllUsers,
  selectUserById,
  selectUsersIds,
} from '../users/usersSlice'
import { addNewPost, postAdded } from './postsSlice'

const UserExcerpt = ({userId}) => {

    const user = useSelector(state => selectUserById(state, userId))

    return(
        <option key={userId} value={userId}>
            {user.name}
        </option>    
    )

}

export const AddPostForm = () => {
  const [title, setTitle] = useState()
  const [content, setContent] = useState()
  const [userId, setUserId] = useState()
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const dispatch = useDispatch()

  const usersIds = useSelector(selectUsersIds)

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => {
    setUserId(e.target.value)
  }

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setAddRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.error('Failed to save the post: ', error)
      } finally {
        setAddRequestStatus('idle')
      }
    }
  }

  const userOptions = usersIds.map((userId) => (

    <UserExcerpt userId={userId}/>
    
  ))

  return (
    <>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" onChange={onAuthorChanged}>
          {userOptions}
        </select>

        <label htmlFor="postContent">Content:</label>
        <textarea
          name="postContent"
          id="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </>
  )
}
