import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../LoginButton';
import SignupButton from '../SignupButton';
import './index.css';

const HomeWelcome = () => {
    const { isAuthenticated } = useAuth0();
    return (
        <article className="home-info">
            {isAuthenticated && (
                <>
                    <header className="entry-header">
                        <h1>Welcome to SwingSpot!</h1>
                    </header>
                    <section className="entry-content">
                        <p>Interact with people from the softball community by commenting on the topics below or create a new topic!</p>
                    </section>
                </>
            )}
            {!isAuthenticated && (
                <>
                    <header className="entry-header">
                        <h1>Welcome to SwingSpot</h1>
                    </header>
                    <section className="entry-content">
                        <p>Create a FREE account to participate in the softball discussions.</p>
                    </section>
                    <footer className="entry-footer">
                        <SignupButton />
                        <LoginButton />
                    </footer>
                </>
            )}
        </article>
    );
}

export default HomeWelcome;