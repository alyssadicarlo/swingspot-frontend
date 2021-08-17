import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { formatDistance } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Card from '../Card';
import convertToUserTime from '../../helpers/convertToUserTime';
import QuoteCommentModal from '../QuoteCommentModal';

const CommentCard = ({ comment, topic_slug, fetchTopics, isLoggedIn }) => {

    const [userData, setUserData] = useState({});

    const date_posted = new Date(comment.date_posted);
    const converted_time = convertToUserTime(date_posted);
    
    const distance_between = formatDistance(new Date(), converted_time);

    useEffect(() => {
        (async () => {
            const user = await fetch(
                `http://localhost:3333/users/${comment.author}`
            ).then(response => response.json())
            setUserData(user);
        })()
    }, [setUserData, comment]);
    
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
                            <p>{comment.author}</p>
                        </Col>
                        <Col>
                            {!!comment.quoted_comment ?
                                (
                                    <>
                                        Originally posted by <strong>{comment.quoted_comment_author}</strong>
                                        <div className="comment card">
                                            <div className="card-body">
                                                {comment.quoted_comment}
                                            </div>
                                        </div>
                                    </>
                                )
                            :
                                ('')
                            }
                            <p>{comment.comment_text}</p>
                        </Col>
                    </Row>
                </section>
                <footer className="entry-footer">
                    <small></small>
                    {isLoggedIn ? 
                        <QuoteCommentModal comment={comment} topic_slug={topic_slug} fetchTopics={fetchTopics} userData={userData} />
                    :
                        ''
                    }
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