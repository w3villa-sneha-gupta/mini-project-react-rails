import React from 'react';
import LoginForm from './components/LoginForm';
import './App.css';
import Signup from './components/Sign';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import ForgotPassword from './components/ForgotPassword';
import OtpVerification from './components/OtpVerification';

function App() {
  return (
    <Router>
      <div>
        <Routes>
      <Route exact path="/" element={<LoginForm/>}/>
      <Route path="/signup"   element={<Signup/>}/>
      <Route path="/forgotPassword" element={<ForgotPassword/>}/>
      <Route path="/otpVerification" element={<OtpVerification/>}/>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
