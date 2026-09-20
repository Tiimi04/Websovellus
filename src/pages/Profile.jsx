import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfileImageUrl, selectProfileImage } from '../services/authService'
import { getFavourites, removeFavourite } from '../services/favouriteService'
import MovieList from '../components/MovieList'
import './Profile.css'

const PROFILE_AVATARS = [
    { id: 'avatar-1', label: 'Auto', path: '/profile-avatars/1.png' },
    { id: 'avatar-2', label: 'Lumiukko', path: '/profile-avatars/2.png' },
    { id: 'avatar-3', label: 'Vene', path: '/profile-avatars/3.png' },
    { id: 'avatar-4', label: 'Ankka', path: '/profile-avatars/4.png' },

]

const getStoredUser = () => {
    try {
        return JSON.parse(localStorage.getItem('user')) || {}
    } catch {
        return {}
    }
}

function Profile() {
    const navigate = useNavigate()
    const [user, setUser] = useState(getStoredUser)
    const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false)
    const [savingAvatar, setSavingAvatar] = useState(false)
    const [error, setError] = useState('')
    const [favourites, setFavourites] = useState([])
    const [favouritesError, setFavouritesError] = useState('')

    useEffect(() => {
        getFavourites()
            .then(setFavourites)
            .catch((err) => setFavouritesError(err.message))
    }, [])

    const handleRemoveFavourite = (movie) => {
        removeFavourite(movie.id)
            .then(() => setFavourites((prev) => prev.filter((m) => m.id !== movie.id)))
            .catch((err) => setFavouritesError(err.message))
    }

    const handleAvatarSelect = async (avatar) => {
        setError('')
        setSavingAvatar(true)

        try {
            const { user: updatedUser } = await selectProfileImage(avatar.path)
            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser))
            setIsAvatarPickerOpen(false)
        } catch (err) {
            setError(err.message)
        } finally {
            setSavingAvatar(false)
        }
    }

    const profileImageUrl = getProfileImageUrl(user.profile_image)

    return (
        <main className="profile-page">
            <h1>Profiili</h1>

            <div className="profile-content">
                <div className="profile-picture-section">
                    <div className="profile-picture">
                        {profileImageUrl ? (
                            <img src={profileImageUrl} alt="Profiilikuva" />
                        ) : (
                            <span className="profile-picture-placeholder">
                                {user.username ? user.username.charAt(0).toUpperCase() : '?'}
                            </span>
                        )}
                    </div>

                    <button
                        type="button"
                        className="edit-picture-button"
                        onClick={() => setIsAvatarPickerOpen(true)}
                        disabled={savingAvatar}
                    >
                        Muokkaa
                    </button>
                </div>

                <div className="profile-info">
                    <span className="profile-username">{user.username || 'Tuntematon käyttäjä'}</span>
                    {user.email && <span className="profile-email">{user.email}</span>}
                </div>
            </div>

            <section className="favourites-section">
                <h2>Suosikkilistani</h2>
                {favouritesError && <p style={{ color: 'red' }}>{favouritesError}</p>}
                {favourites.length === 0 ? (
                    <p>Et ole vielä lisännyt yhtään elokuvaa suosikkeihin.</p>
                ) : (
                    <MovieList movies={favourites} onRemoveFavourite={handleRemoveFavourite} />
                )}
            </section>

            {isAvatarPickerOpen && (
                <section className="avatar-picker" aria-labelledby="avatar-picker-title">
                    <div className="avatar-picker-header">
                        <h2 id="avatar-picker-title">Valitse profiilikuva</h2>
                        <button
                            type="button"
                            className="close-picker-button"
                            onClick={() => setIsAvatarPickerOpen(false)}
                            disabled={savingAvatar}
                            aria-label="Sulje profiilikuvien valinta"
                        >
                            ×
                        </button>
                    </div>
                    <div className="avatar-grid">
                        {PROFILE_AVATARS.map((avatar) => (
                            <button
                                type="button"
                                className={`avatar-option${user.profile_image === avatar.path ? ' selected' : ''}`}
                                key={avatar.id}
                                onClick={() => handleAvatarSelect(avatar)}
                                disabled={savingAvatar}
                                aria-label={`Valitse profiilikuvaksi ${avatar.label}`}
                                aria-pressed={user.profile_image === avatar.path}
                            >
                                <img src={avatar.path} alt="" />
                                <span>{avatar.label}</span>
                            </button>
                        ))}
                    </div>
                    {savingAvatar && <p className="avatar-picker-status">Tallennetaan...</p>}
                </section>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <button type="button" onClick={() => navigate('/FrontPage')}>
                Takaisin
            </button>
        </main>
    )
}

export default Profile