import { useEffect, useState } from "react";

// authenticated component

const CurrentUserProfile = () => {

    const [user, setUser] = useState({});

    useEffect(() => {
        (async () => {
            const username = localStorage.getItem('USERNAME');
            const response = await fetch(
                `http://localhost:3333/users/${username}`
            ).then(response => response.json());
            setUser(response);
        })();
    })

    return (
        <>

        </>
    );
}

export default CurrentUserProfile;