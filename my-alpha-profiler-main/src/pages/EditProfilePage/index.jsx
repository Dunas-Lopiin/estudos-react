import { useState, useContext } from 'react';
import { EditContext } from '../../context/edit';
import { AuthContext } from '../../context/auth';

import StandardHeader from '../../components/headers/StandardHeader';
import LogoutButton from '../../components/buttons/LogoutButton';
import './style.css';

function EditProfilePage() {
  const { deleteAccount, editProfile, error } = useContext(EditContext);
  const { user } = useContext(AuthContext);
  const defaultPhoto =
    'https://t4.ftcdn.net/jpg/03/31/69/91/360_F_331699188_lRpvqxO5QRtwOM05gR50ImaaJgBx68vi.jpg';
  const [photo, setPhoto] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangeImage = (e) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };
  const handleSubmitChanges = (e) => {
    e.preventDefault();
    console.log({ photo, email, confirmEmail, password, confirmPassword });

    editProfile(photo, email, confirmEmail, password, confirmPassword);
  };
  const handleSubmitDelete = (e) => {
    e.preventDefault();
    deleteAccount(user.username);
  };
  return (
    <div className="page" id="edit-profile-page">
      <StandardHeader>
        <LogoutButton />
      </StandardHeader>
      <main>
        <h2>Edit My Profile</h2>
        <form id="edit-profile-form">
          <div className="photo-input-container">
            <label htmlFor="photo-input">
              <img src={photo ? photo : defaultPhoto} alt="Default" id="photo-preview" />
            </label>
            <input id="photo-input" type="file" accept="image/*" onChange={handleChangeImage} />
          </div>
          <div className="edit-profile-input-container">
            <input
              className="edit-profile-input"
              type="email"
              placeholder="New Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="edit-profile-input"
              type="email"
              id="edit-profile-birthdate"
              placeholder="Confirm Email"
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <input
              className="edit-profile-input"
              type="password"
              placeholder="New Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="edit-profile-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="edit-profile-button-container">
            <button id="delete-account-button" onClick={handleSubmitDelete}>
              Delete my account
            </button>
            <button id="send" onClick={handleSubmitChanges}>
              Save Changes
            </button>
          </div>
          {error && (
            <div className="edit-error-container">
              <p className="edit-error">{error}</p>
            </div>
          )}
          <p></p>
        </form>
      </main>
    </div>
  );
}

export default EditProfilePage;
