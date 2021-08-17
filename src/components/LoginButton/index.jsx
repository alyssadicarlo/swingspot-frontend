import './index.css';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return <Link to="/login" className="login-button" onClick={() => console.log("login")}>Log In</Link>;
};

export default LoginButton;