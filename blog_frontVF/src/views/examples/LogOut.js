import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = () => {
      localStorage.removeItem('user');
      navigate("/landing-page"); // Redirect to the home page after logout
    };

    logout();
  });

  return (
    <div>
      <h1>Logging out...</h1>
      {/* You can add a spinner or loading indicator here */}
    </div>
  );
}

export default Logout;
