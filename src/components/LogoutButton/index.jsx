import './index.css';

const LogoutButton = () => {

  return (
    <button className="logout-button" onClick={() => console.log("logout")}>
      Log Out
    </button>
  );
};

export default LogoutButton;