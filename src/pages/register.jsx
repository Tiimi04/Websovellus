import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setSuccess('')

        try {
            await registerUser({ username, email, password })
            setSuccess('Rekisteröityminen onnistui! Voit nyt kirjautua sisään.')
            setUsername('')
            setEmail('')
            setPassword('')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <div>
            <h1>Register</h1>
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
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <button type="button" onClick={() => navigate('/')}>
                Etusivu
            </button>
        </div>
    );
}

export default Register;
