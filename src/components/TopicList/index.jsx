import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import PlaceholderCards from "../PlaceholderCards";
import TopicCard from "../TopicCard";
import { LinkButton } from '../Button';
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
                <div className="cards-wrapper">
                    <article>
                        <header className="entry-header flex">
                            <h2>College Softball Topics</h2>
                            <LinkButton>
                                <Link to="/add_topic">
                                    Add Topic
                                </Link>
                            </LinkButton>
                        </header>
                    </article>
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
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="cards-wrapper">
                    <article>
                        <header className="entry-header flex">
                            <h2>College Softball Topics</h2>
                            <LinkButton className="hover-button">
                                <Link to="/add_topic">
                                    Add Topic
                                </Link>
                            </LinkButton>
                        </header>
                    </article>
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
                    {topics.length > 0 ?
                        (topics.map(topic => {
                            return (
                                <TopicCard key={`${topic.topic_data.slug}-${topic.topic_data.id}`} topic={topic}/>
                            )
                        }))
                    :
                        (<h4>No topics yet</h4>)
                    }
                </div>
            </>
        );
    }
}

export default TopicList;