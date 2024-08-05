import React, { useEffect, useState } from 'react';
import { getEmailVerificationData } from '../services/api';
import { Link } from 'react-router-dom';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailToken = queryParams.get('email_token');
    console.log('Confirmation Token:', emailToken);

    const verifyEmail = async () => {
      if (!emailToken) {
        setMessage('Invalid confirmation token.');
        setLoading(false);
        return;
      }

      try {
        const response = await getEmailVerificationData(emailToken);
        console.log("connnnn", emailToken)
        console.log("con", response)

        if (response.status == 'success') {
          setMessage(response.message);
          console.log(message);
        } else {
          setMessage(response.errors);
          console.log(message);
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, []); // Only run once on component mount

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
      <p>Click on continue button for otp verification</p>
      <Link to="/otpVerification">
      <button>Continue</button>
      </Link>
    </div>
  );
};

export default EmailVerification;
