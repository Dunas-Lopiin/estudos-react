import { useState, useContext } from 'react';
import { RegisterContext } from '../../context/register';

import StandardHeader from '../../components/headers/StandardHeader';
import './style.css';

function RegisterPage() {
  const { register, error } = useContext(RegisterContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    register(username, password, confirmPassword, confirmEmail, email, birthdate);
  }
  return (
    <div className="page" id="register-page">
      <StandardHeader />
      <main>
        <h2>Register</h2>

        <form id="register-form">
          <div className="register-input-container">
            <input
              className="reg-input"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="reg-input"
              type="text"
              id="reg-birthdate"
              placeholder="Birthdate"
              onChange={(e) => setBirthdate(e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
              onBlur={(e) => (e.target.type = 'text')}
            />
            <input
              className="reg-input"
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="reg-input"
              type="email"
              placeholder="Confirm Email"
              onChange={(e) => setConfirmEmail(e.target.value)}
            />
            <input
              className="reg-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="reg-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" id="send" onClick={handleSubmit}>
              Register
            </button>
          </div>
          {error && (
            <div className="reg-error-container">
              <p className="reg-error">{error}</p>
            </div>
          )}
          <p></p>
        </form>
      </main>
    </div>
  );
}

export default RegisterPage;
