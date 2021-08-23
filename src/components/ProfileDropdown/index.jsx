import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from '../LogoutButton';
import './index.css';

const ProfileDropdown = () => {
    const username = localStorage.getItem('USERNAME');
    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const response = await fetch(`http://localhost:3333/users/${username}`).then(response => response.json());
            console.log(response);
            setUser(response);
        })();
    }, [username]);

    return (
        <div className="dropdown">
            <button className="dropbtn"><img src={user.picture} width={40} /></button>
            <div class="dropdown-content">
                <Link to="/profile">Profile</Link>
                <LogoutButton />
            </div>
        </div>
    )
}

export default ProfileDropdown;