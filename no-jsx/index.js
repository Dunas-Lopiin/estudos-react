import React from 'react';
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
    React.createElement("div", {
        className: "page",
        id: "home-page"
    },
      React.createElement(StandardHeader, null,  React.createElement(LogoutButton, null)),  React.createElement("main", {
        id: "home-page-main"
      },
      React.createElement("div", {
        id: "profile-picture"
      }, 
      userData.photo ?  React.createElement("img", {
        src: userData.photo,
        alt: "Profile"
      }) :  React.createElement("img", {
        src: "https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg",
        alt: "Profile"
      })),
      React.createElement("div", {
        id: "profile-info"
      },
      React.createElement("h2", {
        id: "username"
      }, userData.username),
      React.createElement("p", {
        id: "email"
      }, "Email: ", userData.email),
      React.createElement("p", {
        id: "birthdate"
      }, "Birthdate:", ' ', new Date(userData.birthdate).toLocaleDateString('pt-br', {
        timeZone: 'UTC'
      }))),
      React.createElement("div", {
        className: "navigate-buttons"
      },
      React.createElement("button", {
        id: "edit-button",
        onClick: handleNavEdit
      }, "Edit Profile"))))
  );
}

export default HomePage;
