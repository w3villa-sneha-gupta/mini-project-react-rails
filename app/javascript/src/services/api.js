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

  export const getEmailVerificationData = (emailToken ) => {
    console.log("confirm", emailToken)
    const url = endpoints.signup.getEmailVerification(emailToken);
    return sendRequest({
      url,
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    });
  };

  export const getEmailToken= ({body}) =>{
    const url= endpoints.signup.emailVerification(body);
  
    return sendRequest({
      url,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    };
  


  
  
