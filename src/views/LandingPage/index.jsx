import { Row, Col } from 'react-bootstrap';
import TopicList from '../../components/TopicList';
import Card from '../../components/Card';
import { LinkButton } from '../../components/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LatestPostCard from '../../components/LatestPostCard';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';

const LandingPage = (props) => {
    const [latestPosts, setLatestPosts] = useState([]);
    const [stats, setStats] = useState({
        topics: 0,
        comments: 0,
        users: 0,
        latest_member: ''
    });

    useEffect(() => {
        (async () => {
            const comments = await fetch(
                `http://localhost:3333/comments`
            ).then(response => response.json());

            const topics = await fetch(
                `http://localhost:3333/topics`
            ).then(response => response.json());

            const users = await fetch(
                `http://localhost:3333/users`
            ).then(response => response.json());

            setStats({
                topics: topics.length,
                comments: comments.length,
                users: users.length,
                latest_member: users[0].username
            });

            setLatestPosts(comments.slice(0,5));
        })();
    }, [setLatestPosts, setStats]);
    return (
        <>
            <Row>
                <div className="cards-wrapper">
                    <article>
                        <header className="entry-header flex">
                            <h2>College Softball Topics</h2>
                            {!!props.isLoggedIn ?
                                <LinkButton className="hover-button">
                                    <Link to="/add_topic">
                                        Add Topic
                                    </Link>
                                </LinkButton>
                            :
                                ''
                            }
                        </header>
                    </article>
                </div>
                <Col xs={9}>
                    <TopicList />
                </Col>
                <Col>
                    {!!props.isLoggedIn ?
                        ''
                    :
                        <Card className="mb-3">
                            <h5 className="mb-3">Log In</h5>
                            <LoginForm />
                        </Card>
                    }
                    <div className="mb-3">
                        <h5 className="mb-3">Latest Posts</h5>
                        {latestPosts.map((post, index) => 
                            <LatestPostCard post={post} key={`${post.slug}--${index}`} /> 
                        )}
                    </div>
                    <h5 className="mb-3">Forum Statistics</h5>
                    <Card>
                        <div className="d-flex justify-content-between flex-row">
                            <h6>Topics:</h6>
                            <h6>{stats.topics}</h6>
                        </div>
                        <div className="d-flex justify-content-between flex-row">
                            <h6>Comments:</h6>
                            <h6>{stats.comments}</h6>
                        </div>
                        <div className="d-flex justify-content-between flex-row">
                            <h6>Users:</h6>
                            <h6>{stats.users}</h6>
                        </div>
                        <div className="d-flex justify-content-between flex-row">
                            <h6>Latest User:</h6>
                            <h6>{stats.latest_member}</h6>
                        </div>
                    </Card>
                </Col>
            </Row>
        </>
    );
}


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(LandingPage);