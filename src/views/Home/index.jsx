import { useAuth0 } from "@auth0/auth0-react";
import { Route } from 'react-router-dom';
import HomeWelcome from "../../components/HomeWelcome";
import TopicList from "../../components/TopicList";
import LandingPage from "../LandingPage";

const Home = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <>
        {isAuthenticated && (
            <>
              <Route exact path="/">
                <HomeWelcome />
                <TopicList />
              </Route>
            </>
        )}
        {!isAuthenticated && (
            <Route exact path="/">
              <HomeWelcome />
              <LandingPage />
            </Route>
        )}
        </>
    )
}

export default Home;