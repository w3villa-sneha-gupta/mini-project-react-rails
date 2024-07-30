const baseUrl = 'http://localhost:3000';

const endpoints = {
    signup: {
        register: () => `${baseUrl}/signup`,
        emailVerification:()=>`${baseUrl}/confirmation`,
        getEmailVerification:(confirmation_token)=>`${baseUrl}/confirmation?confirmation_token=${confirmation_token}`,
        otpVerification:()=>`${baseUrl}/otp_verifications`,


    },

    login:{
        loginForm:(email,password)=>`${baseUrl}/login?email=${email}&password=${password}`,
        googleLogin:()=> '${baseUrl}/auth/google_oauth2/callback',
        facebookLogin:()=>`${baseUrl}/auth/facebook/callback`,
    }
}

export default endpoints;