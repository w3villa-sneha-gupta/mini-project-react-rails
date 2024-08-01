import React, { useState } from 'react';
import '../ForgotPassword/password.scss';
import { Link, useNavigate } from 'react-router-dom';
import { getEmailToken } from '../../services/api';

const Email = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await getEmailToken({
        body: {
            "user": {
                "email": email
            }
        }
      });
      if (response.status === "success") {
       alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert("Failed to send reset link. Please try again.");
    }
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Reset Password</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field space mt-4">
            <input type="submit" value="Send Verification Link" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Email;
