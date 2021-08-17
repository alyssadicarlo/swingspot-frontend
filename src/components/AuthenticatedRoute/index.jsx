import { Route } from 'react-router-dom';
import LoginButon from '../LoginButton';
import { connect } from 'react-redux';

const AuthenticatedRoute = (props) => {

    return (
        <>
            <Route exact path={props.path}>
                {props.isLoggedIn && (
                    <>
                        {props.children}
                    </>
                )}
                {!props.isLoggedIn && (
                    <>
                        <h1>Please login to view this page.</h1>
                        <LoginButon />
                    </>
                )}
            </Route>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(AuthenticatedRoute);