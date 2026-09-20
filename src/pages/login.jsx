import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../services/authService'


function Login() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const { token, user } = await loginUser({ username, password })
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            navigate('/FrontPage')
        } catch (err) {
            setError(err.message)
        }
    }

    return (

        
        <div>
            <h1>Login Page</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    required
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                />
                <br />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="button" onClick={() => navigate('/')}>
                Etusivu
            </button>
        
        </div>
    );
}

export default Login;