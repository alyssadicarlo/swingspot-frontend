import { useAuth0 } from "@auth0/auth0-react";
import './index.css';

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="signup-button"
      onClick={() =>
        loginWithRedirect({
          screen_hint: "signup",
        })
      }
    >
      Sign Up
    </button>
  );
};

export default SignupButton;