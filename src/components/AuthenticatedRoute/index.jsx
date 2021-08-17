import { Route } from 'react-router-dom';
import LoginButon from '../LoginButton';

const AuthenticatedRoute = (props) => {
    const isAuthenticated = true;

    return (
        <>
            <Route exact path={props.path}>
                {isAuthenticated && (
                    <>
                        {props.children}
                    </>
                )}
                {!isAuthenticated && (
                    <>
                        <h1>Please login to view this page.</h1>
                        <LoginButon />
                    </>
                )}
            </Route>
        </>
    );
}

export default AuthenticatedRoute;