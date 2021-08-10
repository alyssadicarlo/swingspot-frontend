import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState([]);
  const authToken = process.env.REACT_APP_ACCESS_TOKEN;

  useEffect(() => {
    (async () => {
      const userUrl = `https://dev-yxxg1id2.us.auth0.com/api/v2/users?q=username%3A${username}`;
      const options = {
        method: 'GET',
        headers: {
          authorization: `Bearer ${authToken}` 
        }
      };
      const user = await fetch(userUrl, options).then(response => response.json());
      setUser(user[0]);
    })();
  }, [setUser, authToken, username]);

  return (
    <>
    {!!user ? 
      (<div>
        <div className="row align-items-center profile-header">
          <div className="col-md-2 mb-3">
            <img
              src={user.picture}
              alt="Profile"
              className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
            />
          </div>
          <div className="col-md text-center text-md-left">
            <h2>{user.name}</h2>
            <p className="lead text-muted">{user.email}</p>
          </div>
        </div>
        <div className="row">
          <pre className="col-12 text-light bg-dark p-4">
            {JSON.stringify(user, null, 2)}
          </pre>
        </div>
      </div>)
    :
      (<p>Loading...</p>)
    }
    </>
  );
};

export default Profile;