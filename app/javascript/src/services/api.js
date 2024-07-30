import endpoints from "./endpoint";
import sendRequest from "./sendRequest";



export const registerUserData = ({body} ) => {
    const url = endpoints.signup.register();

    return sendRequest({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  export const loginUser= ({email,password}) =>{
  const url= endpoints.login.loginForm(email,password);

  return sendRequest({
    url,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    }
  });
  };

  export const getEmailVerificationData = ({ confirmation_token }) => {
    const url = endpoints.signup.getEmailVerification(confirmation_token);
    return sendRequest({
      url,
      method: "GET",
    });
  };
  
  
