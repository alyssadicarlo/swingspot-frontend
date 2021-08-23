import { Link, useHistory } from 'react-router-dom';
import { formatDistance } from 'date-fns';
import Card from '../Card';
import { Row, Col } from 'react-bootstrap';
import './index.css';
import convertToUserTime from '../../helpers/convertToUserTime';

const TopicCard = ({ topic }) => {
    const last_post = new Date(topic.topic_data.last_post);
    const converted_time = convertToUserTime(last_post);
    
    const distance_between = formatDistance(new Date(), converted_time);

    const history = useHistory();

    const _handleClick = () => {
        history.push(`/topics/${topic.topic_data.slug}`);
    }
    
    return (
        <>
            {/* <Card>
                <header className="entry-header">
                    <Link className="underline" to={`/topics/${topic.topic_data.slug}`}>
                        <h2>{topic.topic_data.name}</h2>
                    </Link>
                </header>
                <section className="entry-content">
                    <p>{topic.comments[0].comment_text}</p>
                </section>
                <footer className="entry-footer">
                    <small>Last post {distance_between} ago by <Link to={`/users/${topic.topic_data.last_post_author}`}>{topic.topic_data.last_post_author}</Link></small>
                </footer>
            </Card> */}
            <Card className="hover-card" onClick={_handleClick}>
                <Row>
                    <Col>
                        <header className="entry-header">
                            <Link className="underline" to={`/topics/${topic.topic_data.slug}`}>
                                <h2>{topic.topic_data.name}</h2>
                            </Link>
                            <small>Last post {distance_between} ago by <Link to={`/users/${topic.topic_data.last_post_author}`}>{topic.topic_data.last_post_author}</Link></small>
                        </header>
                    </Col>
                    <Col xs={2}>
                        <h6>{topic.topic_data.author}</h6>
                    </Col>
                    <Col xs={1}>
                        <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-left-text me-1" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        </svg>{topic.topic_data.replies}</h6>
                    </Col>
                    <Col xs={1}>
                        <h6><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye me-1" viewBox="0 0 16 16">
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                        </svg>{topic.topic_data.views}</h6>
                    </Col>
                </Row>
            </Card>
        </>
    );
}

export default TopicCard;