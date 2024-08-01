import React, { useState } from 'react';
import './otp.scss';

const OtpVerification = () => {
  
  const [otp, setOtp] = useState('');

 
  const handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('Entered OTP:', otp);
  };

  return (
    <div className="bg-img">
      <div className="content">
        <header>Otp Verification</header>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <span className="fa fa-user"></span>
            <input
              type="text"
              required
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)} 
            />
          </div>

          <div className="links">
            <button type="submit" className="facebook">
              {/* <FontAwesomeIcon icon={faFacebook}/> */}
              <span>Verify OTP</span>
            </button>
            <button type="button" className="instagram" onClick={() => alert('OTP Resent')}>
              {/* <FontAwesomeIcon icon={faInstagram} /> */}
              <span>Resend OTP</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
