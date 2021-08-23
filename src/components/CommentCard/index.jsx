import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { formatDistance } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Card from '../Card';
import convertToUserTime from '../../helpers/convertToUserTime';
import QuoteCommentModal from '../QuoteCommentModal';

const CommentCard = ({ comment, topic_slug, fetchTopics, isLoggedIn }) => {

    const [userData, setUserData] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(comment.likes);

    const date_posted = new Date(comment.comment.date_posted);
    const converted_time = convertToUserTime(date_posted);
    
    const distance_between = formatDistance(new Date(), converted_time);

    useEffect(() => {
        (async () => {
            const user = await fetch(
                `http://localhost:3333/users/${comment.comment.author}`
            ).then(response => response.json())
            setUserData(user);

            const currentUser = await fetch(
                `http://localhost:3333/users/${localStorage.getItem('USERNAME')}`
            ).then(response => response.json());
            setCurrentUser(currentUser);

            const likes = await fetch(
                `http://localhost:3333/comments/${comment.comment.id}/likes`
            ).then(response => response.json());
            setLikes(likes.length);

            const userLike = likes.find(like => {
                return like.user_id === currentUser.user_id
            });

            if (!!userLike) {
                setLiked(true)
            } else {
                setLiked(false);
            }
        })()
    }, [setUserData, comment]);

    const _favorite = async () => {
        const response = await fetch(
            `http://localhost:3333/comments/${comment.comment.id}/favorite`
        , {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('TOKEN')}`
            },
            body: JSON.stringify({
                username: currentUser.username,
                user_id: currentUser.user_id
            })
        }).then(response => response.json());

        if (response.success) {
            setLiked(true);
            setLikes(likes + 1);
        }
    }
    
    return (
        <div className="cards-wrapper mb-3 comment-card">
            <article>
                <header className="entry-header flex">
                    <small>Posted {distance_between} ago</small>
                </header>
            </article>
            <Card>
                <section className="entry-content">
                    <Row>
                        <Col xs={2}>
                            <img width={70} className="author-img mb-3" src={!!userData ? userData.picture : ''} alt={!!userData ? userData.username : ''} />
                            <p><Link to={`/users/${comment.comment.author}`}>{comment.comment.author}</Link></p>
                        </Col>
                        <Col>
                            {!!comment.comment.quoted_comment ?
                                (
                                    <>
                                        Originally posted by <strong>{comment.comment.quoted_comment_author}</strong>
                                        <div className="comment card">
                                            <div className="card-body">
                                                {comment.comment.quoted_comment}
                                            </div>
                                        </div>
                                    </>
                                )
                            :
                                ('')
                            }
                            <p>{comment.comment.comment_text}</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2}>
                            
                        </Col>
                        <Col className="d-flex align-items-center justify-content-end">
                            <QuoteCommentModal comment={comment} topic_slug={topic_slug} fetchTopics={fetchTopics} userData={userData} />
                            <button className="card-buttons d-flex align-items-center" onClick={_favorite}>
                                {liked ? 
                                    <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                :
                                    <svg className="me-1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                    </svg>
                                }
                                {likes}
                            </button>
                        </Col>
                    </Row>
                </section>
                <footer className="entry-footer">
                    <small></small>
                </footer>
            </Card>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(CommentCard);