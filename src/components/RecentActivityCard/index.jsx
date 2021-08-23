import { formatDistance } from 'date-fns'
import convertToUserTime from '../../helpers/convertToUserTime';
import { Link } from 'react-router-dom';

const RecentActivityCard = ({ comment }) => {
    const date_posted = new Date(comment.date_posted);
    const converted_time = convertToUserTime(date_posted);
    
    const distance_between = formatDistance(new Date(), converted_time);

    return (
        <div className="row card-style wrapper">
            <div className="row">
              <div className="col-12 card-style ps-4 pe-4 pt-2 entry-header">
                <Link to={`/topics/${comment.slug}`}><h2>{comment.name}</h2></Link>
              </div>
            </div>
            <div className="pe-4 ps-4 pb-2">
              <span>{comment.comment_text}</span>
            </div>
            <div className="ps-4 pe-4 pb-2">
              <small>Posted {distance_between}</small>
            </div>
        </div>
    )
}

export default RecentActivityCard;