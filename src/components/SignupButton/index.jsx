import { Link } from 'react-router-dom';
import { LinkButton } from '../Button';

const SignupButton = () => {
  return (
    <LinkButton className="hover-button">
      <Link to="/signup"
        onClick={() =>
          console.log("signup")
        }
      >
        Sign Up
      </Link>
    </LinkButton>
  );
};

export default SignupButton;