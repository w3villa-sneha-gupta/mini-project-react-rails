import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formData={
    email: email,
    password: password
  }

 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with:', formData);

    fetch('/users/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify({ user: formData }),
    })
    .then(response => {
      if (response.ok) {
        // Handle successful login
        console.log('Login successful');
        // Redirect to a different page or update UI as needed
      } else {
        // Handle login error
        console.error('Login failed');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Login Form</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
            />
            <span className="show">SHOW</span>
          </div>

          <Link to="/forgotPassword">
            <div className="pass">
              <p>Forgot Password?</p>
            </div>
          </Link>

          <div className="field">
            <input type="submit" value="LOGIN" />
          </div>
        </form>
        <div className="login">
          Or login with
        </div>
        <div className="links">
          <div className="facebook">
            {/* <FontAwesomeIcon icon={faFacebook}/> */}
            <span>Facebook</span>
          </div>
          <div className="instagram">
            {/* <FontAwesomeIcon icon={faInstagram} /> */}
            <span>Google</span>
          </div>
        </div>
        <div className="signup">
          Don't have an account?
          <Link to="/signup"><span>Signup Now</span></Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
