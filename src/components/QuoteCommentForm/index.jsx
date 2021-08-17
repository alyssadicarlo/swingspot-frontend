import { useState } from "react";
import { Container, Card} from 'react-bootstrap';

import './index.css';

const QuoteCommentForm = ({ comment, handleClose, fetchTopics }) => {

    const [commentText, setCommentText] = useState("");
    
    const token = localStorage.getItem('TOKEN');
    const username = localStorage.getItem('USERNAME');

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
            headers: { 
                'Content-type': 'application/json',
                'authorization': `Bearer ${localStorage.TOKEN}`
            },
            body: JSON.stringify({
                author: userData.username,
                author_id: userData.user_id,
                topic_id: comment.topic_id,
                comment_text: commentText,
                quoted_text: comment.comment_text,
                quoted_text_author: comment.author
            })
        }
        const response = await fetch(
            'http://localhost:3333/comments/add_quote',
            options
        ).then(response => response.json());

        if (response.success) {
            handleClose();
            fetchTopics();
        }
    }

    return (
        <form onSubmit={_handleSubmit}>
            <div className="search-box mb-3 no-hover">
                Original comment from <strong>{comment.author}</strong>
                <Card className="border-2">
                    <Container className="p-2">
                        {comment.comment_text}
                    </Container>
                </Card>
            </div>
            <div className="search-box mb-3">
                <textarea rows={10} name="comment_text" className="search-input" placeholder="Comment text" value={commentText} onChange={_handleUpdate}/>
            </div>
            <button type="submit">Reply</button>
        </form>
    )
}

export default QuoteCommentForm;