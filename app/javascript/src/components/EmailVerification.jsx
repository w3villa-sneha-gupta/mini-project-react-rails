import React, { useEffect } from 'react';
import {getEmailVerificationData} from '../services/api'; // Ensure the path is correct

const EmailVerification = ({ confirmation_token }) => {
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(getEmailVerificationData(confirmation_token), {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }


        const data = await response.json();

        if (data.status === 'success') {
          alert(data.message);
        } else {
          alert(data.errors ? data.errors[0] : 'Verification failed');
        }
      } catch (error) {
        alert(error.message || 'An error occurred. Please try again.');
      }
    };

    verifyEmail();
  }, [confirmation_token]);

  return (
    <div>
      <h1>Email Verification</h1>
    </div>
  );
};

export default EmailVerification;
