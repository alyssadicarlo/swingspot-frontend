import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'react-slugify';

import './index.css';

const AddTopicForm = () => {
        
    const [userData, setUserData] = useState("");

    const [topicData, setTopicData] = useState({
        name: "",
        topic_comment: "",
    });

    const history = useHistory();

    const token = localStorage.token;

    useEffect(() => {
        (async () => {
            const userUrl = `http://localhost:3333/users/`;
            const options = {
                method: 'GET',
                headers: {
                    authorization: `Bearer ${token}` 
                }
            };
            const response = await fetch(userUrl, options).then(response => response.json());
            console.log(response);
            // setUserData(response[0]);
        })();
    }, [token]);

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
            headers: { 
                'Content-type': 'application/json',
                'authorization': `Bearer ${localStorage.TOKEN}`
            },
            body: JSON.stringify({
                slug: wholeSlug,
                name: topicData.name,
                author: userData.username,
                author_id: userData.user_id,
                topic_comment: topicData.topic_comment
            })
        }
        const response = await fetch(
            'http://localhost:3333/topics/add',
            options
        ).then(response => {
            return response.json();
        });

        if (response.success) {
            history.push(`/topics/${wholeSlug}`);
        } else {
            history.push('/login');
        }

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