import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postAdded } from "./postsSlice";


export const AddPostForm = () => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [userId, setUserId] = useState();

    const dispatch = useDispatch();

    const users = useSelector(state => state.users)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value);
    const onAuthorChanged = e => setUserId(e.target.value);


    const onSavePostClicked = () => {
        if (content&&title) {
            dispatch(postAdded(title, content, userId));
            setTitle('');
            setContent('');
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const userOptions = users.map(user => (
        <option key={user.id} value={userId}>
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