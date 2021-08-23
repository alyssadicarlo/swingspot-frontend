import { useState } from "react";
import { Button } from '../Button';

const AddCommentForm = ({ topic_id, topic_slug, fetchTopics }) => {    

    const [commentText, setCommentText] = useState("");

    const username = localStorage.getItem('USERNAME');
    const token = localStorage.getItem('TOKEN');

    const _handleUpdate = (event) => {
        setCommentText(event.target.value);
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

        const userData = await fetch(`http://localhost:3333/users/${username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        }).then(response => response.json());

        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                author: userData.username,
                author_id: userData.user_id,
                topic_id: topic_id,
                comment_text: commentText
            })
        }
        const response = await fetch(
            'http://localhost:3333/comments/add',
            options
        ).then(response => response.json());

        if (response.success) {
            fetchTopics();
            setCommentText("");
        }
    }

    return (
        <form onSubmit={_handleSubmit}>
            <div className="search-box mb-3">
                <textarea rows={5} name="comment_text" className="search-input" placeholder="Comment text" value={commentText} onChange={_handleUpdate}/>
            </div>
            <Button className="hover-button" type="submit">Reply</Button>
        </form>
    )
}

export default AddCommentForm;