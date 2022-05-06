import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StandardHeader from '../../components/headers/StandardHeader';
import LogoutButton from '../../components/buttons/LogoutButton';
import { AuthContext } from '../../context/auth';
import './style.css';

function HomePage() {
  const navigate = useNavigate();
  const { user, authenticated } = useContext(AuthContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    (async () => {
      if (!authenticated) {
        navigate('/login');
      } else {
        const api = 'http://localhost:3001/';
        const response = await fetch(`${api}view?table=username&id=${user.username}`);
        const data = await response.json();
        console.log(data);
        setUserData(data);
      }
    })();
  }, [authenticated, navigate, user]);

  const handleNavEdit = (e) => {
    e.preventDefault();
    navigate('/edit-profile');
  };

  return (
    <div className="page" id="home-page">
      <StandardHeader>
        <LogoutButton />
      </StandardHeader>
      <main id="home-page-main">
        <div id="profile-picture">
          {userData.photo ? (
            <img src={userData.photo} alt="Profile" />
          ) : (
            <img
              src="https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg"
              alt="Profile"
            />
          )}
        </div>
        <div id="profile-info">
          <h2 id="username">{userData.username}</h2>
          <p id="email">Email: {userData.email}</p>
          <p id="birthdate">
            Birthdate:{' '}
            {new Date(userData.birthdate).toLocaleDateString('pt-br', {
              timeZone: 'UTC',
            })}
          </p>
        </div>
        <div className="navigate-buttons">
          <button id="edit-button" onClick={handleNavEdit}>
            Edit Profile
          </button>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
