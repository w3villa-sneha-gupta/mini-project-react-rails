import React, { useEffect, useState } from 'react';

const EmailVerification = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract confirmationToken from window's URL
    const queryParams = new URLSearchParams(window.location.search);
    const confirmationToken = queryParams.get('confirmation_token');
    console.log(confirmationToken);

    const verifyEmail = async () => {
      if (!confirmationToken) {
        setMessage('Invalid confirmation token.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/confirmation?confirmation_token=${confirmationToken}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${confirmationToken}`
          }
        });

       
        if (response.status==="success") {
          setMessage(response.status.message);
        } else {
          setMessage(response.status.message);
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
    </div>
  );
};

export default EmailVerification;
