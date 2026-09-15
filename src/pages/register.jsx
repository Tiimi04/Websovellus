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

<<<<<<< Updated upstream
=======
    const [deleteMode, setDeleteMode] = useState(false)
    const [deleteEmail, setDeleteEmail] = useState('')
    const [deleteUsername, setDeleteUsername] = useState('')
    const [deletePassword, setDeletePassword] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [deleteSuccess, setDeleteSuccess] = useState('')

>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
=======
    const handleDeleteModeChange = (event) => {
        setDeleteMode(event.target.checked)
        setDeleteError('')
        setDeleteSuccess('')
        setDeleteUsername('')
        setDeleteEmail('')
        setDeletePassword('')
    }

    const handleDeleteSubmit = async (event) => {
        event.preventDefault()
        setDeleteError('')
        setDeleteSuccess('')

        try {
            await deleteAccount({ username: deleteUsername, email: deleteEmail, password: deletePassword })
            setDeleteSuccess('Käyttäjätili poistettu onnistuneesti.')
            setDeleteUsername('')
            setDeleteEmail('')
            setDeletePassword('')
            setDeleteMode(false)
        } catch (err) {
            setDeleteError(err.message)
        }
    }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======

            <hr />

            <label htmlFor="deleteMode">
                <input
                    type="checkbox"
                    id="deleteMode"
                    checked={deleteMode}
                    onChange={handleDeleteModeChange}
                />
                Poista käyttäjätili
            </label>

            {deleteMode && (
                <form onSubmit={handleDeleteSubmit}>
                    <label htmlFor="deleteUsername">Username:</label>
                    <input
                        type="text"
                        id="deleteUsername"
                        name="deleteUsername"
                        value={deleteUsername}
                        onChange={(event) => setDeleteUsername(event.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="deleteEmail">Email:</label>
                    <input
                        type="email"
                        id="deleteEmail"
                        name="deleteEmail"
                        value={deleteEmail}
                        onChange={(event) => setDeleteEmail(event.target.value)}
                        required
                    />
                        onChange={(event) => setDeleteUsername(event.target.value)}
                        required
                    />
                    <br />
                    <label htmlFor="deletePassword">Password:</label>
                    <input
                        type="password"
                        id="deletePassword"
                        name="deletePassword"
                        value={deletePassword}
                        onChange={(event) => setDeletePassword(event.target.value)}
                        required
                    />
                    <br />
                    <button type="submit">Poista tili</button>
                </form>
            )}
            {deleteError && <p style={{ color: 'red' }}>{deleteError}</p>}
            {deleteSuccess && <p style={{ color: 'green' }}>{deleteSuccess}</p>}

>>>>>>> Stashed changes
            <button type="button" onClick={() => navigate('/')}>
                Etusivu
            </button>
        </div>
    );
}

export default Register;
