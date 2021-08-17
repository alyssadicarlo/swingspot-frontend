import './index.css';
import { Link } from 'react-router-dom';

const SignupButton = () => {
  return (
    <Link to="/signup"
      className="signup-button"
      onClick={() =>
        console.log("signup")
      }
    >
      Sign Up
    </Link>
  );
};

export default SignupButton;