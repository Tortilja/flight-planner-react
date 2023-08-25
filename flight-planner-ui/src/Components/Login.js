import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin', {
        method: 'GET',
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
      });
  
      if (response.ok) {
        console.log("You are logged in");

      // Calculate the token expiration time (5 minutes from now)
      const expirationTime = new Date().getTime() + 5 + 60 * 1000;

      // Store the token and its expiration time
      const tokenData = {
        authToken: btoa(`${username}:${password}`),
        expirationTime: expirationTime,
        role: 'ADMIN'
      };
      localStorage.setItem("authToken", JSON.stringify(tokenData));
      
      navigate('/adminAirport');
      } else {
       
        console.error('Login failed');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
