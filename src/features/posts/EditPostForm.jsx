
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = ({match}) => {
    const {postId} = match.params;

    const post= useSelector(state => selectPostById(state, postId))

    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = e => setTitle(e.target.value);
    const onContentChanged = e => setContent(e.target.value);

    const onSavePostClicked = e => {
        if (title&&content) {
            const obj = {
                id: postId, 
                title, 
                content,
            }        
            dispatch(postUpdated(obj))
            history.push(`/posts/${postId}`)
        }
    }

    return(
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input type="text" 
                name="postTitle" 
                id="postTitle"
                placeholder="What's on your mind?"
                value={title}
                onChange={onTitleChanged} 
                />
                <label htmlFor="postContent">Content:</label>
                <textarea name="postContent" 
                id="postContent" 
                cols="30" 
                rows="10"
                value={content}
                onChange={onContentChanged}>

                </textarea>
                
            </form>
            <button type="button"
                    onClick={onSavePostClicked}
                    >
                        Save Post
            </button>
        </section>
    )
}