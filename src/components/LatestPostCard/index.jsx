import convertToUserTime from '../../helpers/convertToUserTime';
import { formatDistance } from 'date-fns';
import { Row, Col } from 'react-bootstrap';

const LatestPostCard = ({ post }) => {
    
    const date_posted = new Date(post.date_posted);
    const converted_time = convertToUserTime(date_posted);
    
    const distance_between = formatDistance(new Date(), converted_time);

    return (
        <div className="mb-2">
            <Row>
                <Col xs={2}>
                    <img src={post.picture} className="rounded-circle" width={30} alt={`${post.author} avatar`} />
                </Col>
                <Col>
                    <h6 className="mb-0" >{post.name}</h6>
                    <small>Latest: {post.author} • {distance_between} ago</small>
                </Col>
            </Row>
        </div>   
    )
}

export default LatestPostCard;