import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getUserById } from '../services/userService'
import { getProfileImageUrl } from '../services/authService'

function PublicProfile() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // kun klikataan hakutuloksesta search barista käyttääjää on data otettu jo mukaan
    const [user, setUser] = useState(location.state?.user ?? null)
    const [error, setError] = useState('')

    useEffect(() => {
        // Jos dataa ei oo saatu mukaan esim. suora linkki public profiiliin, haetaan se palvelimelta
        if (user) return

        getUserById(id)
            .then(setUser)
            .catch((err) => setError(err.message))
    }, [id, user])

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>
    }

    if (!user) {
        return <p>Ladataan...</p>
    }

    return (
        <main>
            <h1>{user.username}</h1>
            {getProfileImageUrl(user.profile_image) && (
                <img src={getProfileImageUrl(user.profile_image)} alt="Profiilikuva" width="100" />
            )}
            <button type="button" onClick={() => navigate(-1)}>
                Takaisin
            </button>
        </main>
    )
}

export default PublicProfile