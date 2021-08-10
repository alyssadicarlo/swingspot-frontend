import { useAuth0 } from "@auth0/auth0-react";
import { Route } from 'react-router-dom';
import LoginButon from '../LoginButton';

const AuthenticatedRoute = (props) => {
    const { isAuthenticated } = useAuth0();

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