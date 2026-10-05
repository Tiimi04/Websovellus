import { useState, useEffect } from 'react'
import { searchUsers } from '../services/userService.js'
import { getProfileImageUrl } from '../services/authService.js'
import './UserSearch.css'
import { Link } from 'react-router-dom'
function UserSearch() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {

        if (query.trim().length < 2) {
            setResults([])
            return
        }

        searchUsers(query.trim())
            .then(setResults)
            .catch((err) => setError(err.message))
    }, [query])

return (
        <div className="user-search">
            <h2>Etsi käyttäjä</h2>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Syötä käyttäjän nimi..."
            />
            {error && <div className="error">{error}</div>}
            <ul className="results">
                {results.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`} state={{ user }}>
                        {getProfileImageUrl(user.profile_image) && (
                            <img src={getProfileImageUrl(user.profile_image)} alt={user.username} />
                        )}
                        <span>{user.username}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UserSearch