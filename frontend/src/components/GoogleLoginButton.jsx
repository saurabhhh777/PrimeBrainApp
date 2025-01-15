import React from 'react';
import {jwtDecode} from "jwt-decode"; // Correct import
import { GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  return (
    <div className="pb-7">
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        console.log(credentialResponse);
        // Ensure the credential exists before decoding
        if (credentialResponse && credentialResponse.credential) {
          try {
            const real_data = jwtDecode(credentialResponse.credential);
            console.log(real_data);
            console.log(`Name is : ${real_data.name} and Email is : ${real_data.email}`);
            console.log(credentialResponse);
          } catch (error) {
            console.error("Failed to decode JWT:", error);
          }
        } else {
          console.error("Credential response is invalid:", credentialResponse);
        }
      }}
      onError={() => {
        console.log("login failed!");
      }}
    />
  </div>

  )
}

export default GoogleLoginButton