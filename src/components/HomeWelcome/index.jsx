import { connect } from 'react-redux';
import './index.css';

const HomeWelcome = (props) => {
    
    return (
        <article className="home-info">
            {props.isLoggedIn && (
                <>
                    <header className="entry-header">
                        <h1>Hi, {localStorage.getItem('USERNAME')}!</h1>
                    </header>
                    <section className="entry-content">
                        <p>Interact with people from the softball community by commenting on the topics below or create a new topic!</p>
                    </section>
                </>
            )}
            {!props.isLoggedIn && (
                <>
                    <header className="entry-header">
                        <h1>Welcome to SwingSpot!</h1>
                    </header>
                    <section className="entry-content">
                        <p>Create a FREE account to participate in the softball discussions.</p>
                    </section>
                    <footer className="entry-footer">
                        {/* <SignupButton />
                        <LoginButton /> */}
                    </footer>
                </>
            )}
        </article>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(HomeWelcome);