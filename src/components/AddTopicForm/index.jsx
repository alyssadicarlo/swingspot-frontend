import { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from 'react-router-dom';
import slugify from 'react-slugify';

import './index.css';

const AddTopicForm = () => {
        
    const [userData, setUserData] = useState("");

    const [topicData, setTopicData] = useState({
        name: "",
        topic_comment: "",
    });

    const { user } = useAuth0();
    const authToken = process.env.REACT_APP_ACCESS_TOKEN;

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const userUrl = `https://dev-yxxg1id2.us.auth0.com/api/v2/users?q=email%3A${user.email}`;
            const options = {
                method: 'GET',
                headers: {
                authorization: `Bearer ${authToken}` 
                }
            };
            const response = await fetch(userUrl, options).then(response => response.json());
            setUserData(response[0]);
        })();
    }, [authToken, user.email]);

    const _handleUpdate = (event) => {
        setTopicData({
            ...topicData,
            [event.target.name]: event.target.value,
        })
    }

    const _handleSubmit = async (event) => {
        event.preventDefault();

        const slug = slugify(topicData.name);
    
        let randomString = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < 6; i++ ) {
            randomString += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
    
        const wholeSlug = slug + "-" + randomString;

        const options = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                slug: wholeSlug,
                name: topicData.name,
                author: userData.username,
                author_id: userData.user_id,
                topic_comment: topicData.topic_comment
            })
        }
        await fetch(
            'http://localhost:3333/topics/add',
            options
        ).then(response => {
            history.push(`/topics/${wholeSlug}`);
            return response.json()
        });
    }

    return (
        <>
            <header className="page-header">
                <h1>Add Topic</h1>
            </header>
            <form onSubmit={_handleSubmit}>
                {/* <div className="search-box mb-3 no-hover">
                    <input name="author" className="search-input" type="text" value={userData.username} readOnly/>
                </div> */}
                <div className="search-box mb-3">
                    <input name="name" className="search-input" type="text" placeholder="Topic Name" value={topicData.name} onChange={_handleUpdate}/>
                </div>
                <div className="search-box mb-3">
                    <textarea rows={10} name="topic_comment" className="search-input" placeholder="Topic comment" value={topicData.topic_comment} onChange={_handleUpdate}/>
                </div>
                <button type="submit">Add Topic</button>
            </form>
        </>
    )
}

export default AddTopicForm;