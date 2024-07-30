import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

const Signup = () => {
 
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
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
            <span className="show">SHOW</span>
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
            <span className="show">SHOW</span>
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
            {/* <FontAwesomeIcon icon={faFacebook}/> */}
            <span>Facebook</span>
          </div>
          <div className="instagram">
            {/* <FontAwesomeIcon icon={faInstagram} /> */}
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
