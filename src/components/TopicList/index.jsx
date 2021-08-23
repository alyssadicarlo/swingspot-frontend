import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PlaceholderCards from "../PlaceholderCards";
import TopicCard from "../TopicCard";
import { LinkButton } from '../Button';
import { Row, Col } from 'react-bootstrap';
import './index.css';

const TopicList = () => {

    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const topics = await fetch(
                `http://localhost:3333/topics`
            ).then(response => response.json());
            setTopics(topics);
            setIsLoading(false);
        })();
    }, [setTopics]);

    const _handleClick = async (event) => {
        setIsLoading(true);
        const topics = await fetch(
            `http://localhost:3333/topics/${event.target.id}`
        ).then(response => response.json());
        setTopics(topics);
        setIsLoading(false);
    }

    if (isLoading) {
        return (
            <>
                <article className="entry-nav">
                    <ul>
                        <li onClick={_handleClick} id="top">
                            <span id="top">Top</span>
                        </li>
                        <li onClick={_handleClick} id="latest">
                            <span id="latest">Latest</span>
                        </li>
                    </ul>
                </article>
                <PlaceholderCards />
            </>
        );
    } else {
        return (
            <>
                <article className="entry-nav">
                    <ul>
                        <li onClick={_handleClick} id="top">
                            <span id="top">Top</span>
                        </li>
                        <li onClick={_handleClick} id="latest">
                            <span id="latest">Latest</span>
                        </li>
                    </ul>
                </article>
                <div className="top-card">
                    <Row>
                        <Col>
                            <h6>Topic</h6>
                        </Col>
                        <Col xs={2}>
                            <h6>Author</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>Replies</h6>
                        </Col>
                        <Col xs={1}>
                            <h6>Views</h6>
                        </Col>
                    </Row>
                </div>
                {topics.length > 0 ?
                    (topics.map(topic => {
                        return (
                            <TopicCard key={`${topic.topic_data.slug}-${topic.topic_data.id}`} topic={topic}/>
                        )
                    }))
                :
                    (<h4>No topics yet</h4>)
                }
            </>
        );
    }
}

export default TopicList;