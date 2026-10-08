import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { getUserById } from '../services/userService'
import { getProfileImageUrl } from '../services/authService'
import { getPublicFavourites } from '../services/favouriteService'
import MovieList from '../components/MovieList'

function PublicProfile() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    // kun klikataan hakutuloksesta search barista käyttääjää on data otettu jo mukaan
    const [user, setUser] = useState(location.state?.user ?? null)
    const [error, setError] = useState('')
    const [favourites, setFavourites] = useState([])
    const [isListPublic, setIsListPublic] = useState(false)
    const [favouritesLoading, setFavouritesLoading] = useState(true)
    const [favouritesError, setFavouritesError] = useState('')

    useEffect(() => {
        let isCurrent = true
        const searchResultUser = location.state?.user

        setError('')
        if (searchResultUser && String(searchResultUser.id) === id) {
            setUser(searchResultUser)
        } else {
            setUser(null)
            getUserById(id)
                .then((profileUser) => {
                    if (isCurrent) setUser(profileUser)
                })
                .catch((err) => {
                    if (isCurrent) setError(err.message)
                })
        }

        return () => {
            isCurrent = false
        }
    }, [id, location.state?.user])

    useEffect(() => {
        let isCurrent = true
        setFavouritesLoading(true)
        setFavouritesError('')

        getPublicFavourites(id)
            .then(({ isPublic, movies }) => {
                if (!isCurrent) return
                setIsListPublic(isPublic)
                setFavourites(movies)
            })
            .catch((err) => {
                if (isCurrent) setFavouritesError(err.message)
            })
            .finally(() => {
                if (isCurrent) setFavouritesLoading(false)
            })

        return () => {
            isCurrent = false
        }
    }, [id])

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
            <section>
                <h2>Suosikkilista</h2>
                {favouritesError ? (
                    <p style={{ color: 'red' }}>{favouritesError}</p>
                ) : favouritesLoading ? (
                    <p>Ladataan suosikkilistaa...</p>
                ) : !isListPublic ? (
                    <p>Tämän käyttäjän suosikkilista ei ole julkinen.</p>
                ) : favourites.length === 0 ? (
                    <p>Tällä käyttäjällä ei ole vielä suosikkeja.</p>
                ) : (
                    <MovieList movies={favourites} />
                )}
            </section>
            <button type="button" onClick={() => navigate(-1)}>
                Takaisin
            </button>
        </main>
    )
}

export default PublicProfile