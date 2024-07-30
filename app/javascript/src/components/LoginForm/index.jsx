import React, { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { loginUser } from '../../services/api'; 

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      if (response.status.code == 200) {
        alert(response.status.message);
       } else {
        alert(response.status.message);
       }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
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
        <div className="login">Or login with</div>
        <div className="links">
          <div className="facebook">
            <span>Facebook</span>
          </div>
          <div className="instagram">
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
