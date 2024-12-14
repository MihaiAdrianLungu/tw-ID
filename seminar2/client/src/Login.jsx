import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (username.length === 0 || password.length === 0) {
        setError('Empty username or password');
        return;
    }

    if (error.length > 0) {
        setError('');
    }

    const result = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username, password})
    })

    const data = await result.json();

    if(!data.success) {
        setError(data.message);
    } else {
        localStorage.setItem('token', data.data.token);
        navigate('/');
    }
  }

  return (
    <div>
      <label htmlFor="username">Username</label>
      <br />
      <input
        type="text"
        id="username"
        name="username"
        required
        placeholder="Your username..."
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password</label>
      <br />
      <input
        type="password"
        id="password"
        name="password"
        required
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      <br />
      <br />
      {error.length > 0 && <div>{error}</div>}
    </div>
  );
}

export default Login;
