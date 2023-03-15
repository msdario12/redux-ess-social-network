import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addNewPost, postAdded } from "./postsSlice";


export const AddPostForm = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [userId, setUserId] = useState();
    const [addRequestStatus, setAddRequestStatus] = useState('idle');

    const dispatch = useDispatch();

    const users = useSelector(state => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => {
        // const name = e.target.value
        // const user = users.find(user => user.name === name)
        // if (user) {setUserId(user.id)}
        setUserId(e.target.value)
    };

    const canSave = 
        [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

    const onSavePostClicked = async () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                await dispatch(addNewPost({title, content, user: userId})).unwrap()
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
    
    const userOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))


    return(
        <>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" 
                        name="postTitle" 
                        id="postTitle"
                        value={title}
                        onChange={onTitleChanged}
                 />
                <label htmlFor="postAuthor">Author:</label>
                <select name="postAuthor" id="postAuthor"
                        onChange={onAuthorChanged}>
                            {userOptions}
                </select>

                <label htmlFor="postContent">Content:</label>
                <textarea
                        name="postContent" 
                        id="postContent"
                        value={content}
                        onChange={onContentChanged}
                 />
                <button type="button"
                        onClick={onSavePostClicked}
                        disabled={!canSave}
                        >
                        Save Post
                </button>
            </form>
        </>
    )
}