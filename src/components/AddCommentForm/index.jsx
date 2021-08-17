import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const AddCommentForm = ({ topic_id, topic_slug, fetchTopics }) => {
    
    const { user, isLoading } = useAuth0();
    
    const authToken = process.env.REACT_APP_ACCESS_TOKEN;

    const [userData, setUserData] = useState({});

    const [commentText, setCommentText] = useState("");

    useEffect(() => {
        const getUserData = async () => {
            const userUrl = `https://dev-yxxg1id2.us.auth0.com/api/v2/users/${user.sub}`
            const options = {
                method: 'GET',
                headers: {
                authorization: `Bearer ${authToken}` 
                }
            };
            const response = await fetch(userUrl, options).then(response => response.json());
            setUserData(response);
        }
        if (!isLoading) {getUserData();}
    }, [user, isLoading, authToken]);

    const _handleUpdate = (event) => {
        setCommentText(event.target.value);
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

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
            <button type="submit">Reply</button>
        </form>
    )
}

export default AddCommentForm;