import React, { useState, useEffect } from "react";
import {api} from "../services/api";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Retrieve the token from local storage (assuming it's stored there)
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setErrorMessage("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data.user); // assuming the user data is in response.data.user
        setLoading(false);
      } catch (error) {
        console.error(error.response.data);
        setErrorMessage("Failed to load profile");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div style={{ color: 'red' }}>{errorMessage}</div>;
  }

  return (
    <div>
      <h2>Profile</h2>
      {userData && (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add more user data here as needed */}
        </div>
      )}
    </div>
  );
}

export default Profile;
