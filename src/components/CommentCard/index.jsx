import { useEffect, useState } from 'react';

import { formatDistance } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Card from '../Card';
import convertToUserTime from '../../helpers/convertToUserTime';
import QuoteCommentModal from '../QuoteCommentModal';

const CommentCard = ({ comment, topic_slug }) => {

    const [userData, setUserData] = useState({});

    const date_posted = new Date(comment.date_posted);
    const converted_time = convertToUserTime(date_posted);
    const authToken = process.env.REACT_APP_ACCESS_TOKEN;
    
    const distance_between = formatDistance(new Date(), converted_time);

    useEffect(() => {
        (async () => {
            const userUrl = `https://dev-yxxg1id2.us.auth0.com/api/v2/users?q=username%3A${comment.author}`;
            const options = {
                method: 'GET',
                headers: {
                authorization: `Bearer ${authToken}` 
                }
            };
            const user = await fetch(userUrl, options).then(response => response.json());
            setUserData(user[0]);
        })();
    }, [authToken, comment.author]);
    
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
                    <QuoteCommentModal comment={comment} topic_slug={topic_slug} />
                </footer>
            </Card>
        </div>
    );
}

export default CommentCard;