import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns'

import Card from '../Card';
import './index.css';
import convertToUserTime from '../../helpers/convertToUserTime';

const TopicCard = ({ topic }) => {
    const last_post = new Date(topic.topic_data.last_post);
    const converted_time = convertToUserTime(last_post);
    
    const distance_between = formatDistance(new Date(), converted_time);
    
    return (
        <Card>
            <header className="entry-header">
                <Link to={`/topics/${topic.topic_data.slug}`}>
                    <h2>{topic.topic_data.name}</h2>
                </Link>
            </header>
            <section className="entry-content">
                <p>{topic.comments[0].comment_text}</p>
            </section>
            <footer className="entry-footer">
                <small>Last post {distance_between} ago by <Link to={`/users/${topic.topic_data.last_post_author}`}>{topic.topic_data.last_post_author}</Link></small>
            </footer>
        </Card>
    );
}

export default TopicCard;