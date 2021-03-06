import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaceholderCards from "../PlaceholderCards";
import CommentCard from "../CommentCard";
import AddCommentForm from '../AddCommentForm';

const CommentList = (props) => {

    const { slug } = useParams();

    const [comments, setComments] = useState([]);
    const [title, setTitle] = useState("");
    const [topicId, setTopicId] = useState(-1);
    const [topicSlug, setTopicSlug] = useState("");

    useEffect(() => {
        (async () => {
            const response = await fetch(
                `https://api.swingspot.xyz/topics/${slug}`
            ).then(response => response.json());
            setTitle(response.topic_data.name);
            setTopicId(response.topic_data.id);
            setTopicSlug(response.topic_data.slug);
            setComments(response.comments);
        })();
    }, [setComments, slug]);

    const fetchTopics = async () => {
        const response = await fetch(
            `https://api.swingspot.xyz/topics/${slug}`
        ).then(response => response.json());
        setComments(response.comments);
    }

    return (
        <>
            <h2 className="mb-3">{title}</h2>
            <div>
                {comments.length > 0 ? 
                    (comments.map((comment, index) => {
                        return (
                            <CommentCard key={index} comment={comment} topic_slug={topicSlug} fetchTopics={fetchTopics} />
                        )
                    }))
                :
                    (<PlaceholderCards />)
                }
            </div>
            {props.isLoggedIn ? 
                <>
                    <h2>Reply</h2>
                    <AddCommentForm topic_id={topicId} topic_slug={topicSlug} fetchTopics={fetchTopics} />
                </>
            :
                <h5>Login to add a comment</h5>
            }
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(CommentList);