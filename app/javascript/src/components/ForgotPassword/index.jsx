import React, { useState } from 'react';
import './password.scss';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [contactInfo, setContactInfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email or Phone:', contactInfo);
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Reset Password</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Email or Phone"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)} 
            />
          </div>
          <div className="field space mt-4">
            <input type="submit" value="Send Reset Link" />
          </div>
          <div className="signup space"> 
              Remembered? 
              <Link to='/'><span> Login Now</span></Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
