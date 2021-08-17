import './index.css';
import { connect } from 'react-redux';

const LogoutButton = (props) => {

  const _handleClick = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');
    props.onLoggedOut();
  }

  return (
    <button className="logout-button" onClick={_handleClick}>
      Log Out
    </button>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
      onLoggedOut: () => dispatch({type: 'ON_LOGGED_OUT'})
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton);