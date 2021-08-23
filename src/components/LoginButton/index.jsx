import { Link } from 'react-router-dom';
import { LinkButton } from '../Button';

const LoginButton = () => {
  return (
    <LinkButton className="hover-button">
      <Link to="/login" className="login-button">Log In</Link>
    </LinkButton>
  );
};

export default LoginButton;