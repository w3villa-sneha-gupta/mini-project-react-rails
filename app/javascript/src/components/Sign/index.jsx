import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { registerUserData } from '../../services/api';
 

const Signup = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
     alert("Passwords do not match");
      return;
    }
    try {
      const response = await registerUserData({
        body: {
          "user": {
            "email": email,
            "password": password,
            "phone_number": phone
          }
        }
      });

      if (response.status.code == 200) {
       alert(response.status.message);
      } else {
        setError(response.status.message);
      }
    } catch (error) {
      // Handle the error from the API
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Sign Up</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field space">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="field space">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field space mb-3">
            <span className="fa fa-lock"></span>
            <input
              type="password"
              className="pass-key"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="field space">
            <input type="submit" value="Sign Up" />
          </div>
        </form>
        <div className="login">
          Or login with
        </div>
        <div className="links">
          <div className="facebook">
            <span>Facebook</span>
          </div>
          <div className="instagram">
            <span>Google</span>
          </div>
        </div>
        <div className="signup">
          Already have an account?
          <Link to="/"><span>Login Now</span></Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
