import { useState } from "react";
import useAuthContext from "./useAuthContext";
import axios from "axios";

const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (firstName, lastName, email, password, role) => {
    setIsLoading(true);
    setError(null);

    const requestBody = {
      firstName,
      lastName,
      email,
      password,
      role,
    };

    // Log the request body
    console.log("Request Body:", requestBody);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        requestBody
      );

      // Log the response received
      console.log("Response Data:", response.data);

      // Since axios already parses the response, no need to call .json()
      const json = response.data;
      if (json) {
        // Save the user to local storage
        localStorage.setItem("token", json.token);

        // Update the auth context
        dispatch({ type: "LOGIN", payload: { token: json.token } });
      }
    } catch (error) {
      // Log the error message
      console.error("Error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};

export default useSignUp;
