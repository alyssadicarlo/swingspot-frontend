import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RecentActivityCard from '../../components/RecentActivityCard';

import './index.css';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});
  const [userComments, setUserComments] = useState([]);
  const [registeredYear, setRegisteredYear] = useState('');

  useEffect(() => {
    (async () => {
      const userUrl = `http://localhost:3333/users/${username}`;
      const user = await fetch(userUrl).then(response => response.json());
      setUser(user);
      const date = new Date(user.registered_date);
      setRegisteredYear(date.getFullYear());
      
      const comments = await fetch(
        `http://localhost:3333/comments`
      ).then(response => response.json());
      const userComments = comments.filter(comment => comment.author === user.username);
      setUserComments(userComments.splice(0,5));
    })();
  }, [setUser, username, setRegisteredYear, setUserComments]);

  return (
    <>
    {!!user ? 
      (<div>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3 text-center">
            {!!user.picture ? <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            /> : ''}
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{user.first_name} {user.last_name}</h2>
            <p className="lead text-muted mb-0">{user.username}</p>
            <p className="text-muted">Joined in {registeredYear}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12 ps-4 pe-4 pt-2 pb-2">
            <h3>Recent activity</h3>
          </div>
        </div>
        {userComments.map((comment, index) => 
          <RecentActivityCard comment={comment} key={`${comment.id}-${index}`} />
        )}
      </div>)
    :
      <div>
        <p>Loading...</p>
      </div>
    }
    </>
  );
};

export default Profile;