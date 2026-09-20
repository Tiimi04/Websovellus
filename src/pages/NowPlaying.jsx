import MovieList from "../components/MovieList"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import { getFavourites, addFavourite } from "../services/favouriteService"
import './NowPlaying.css'

function NowPlaying() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [favouriteTmdbIds, setFavouriteTmdbIds] = useState(new Set())
    const isLoggedIn = Boolean(localStorage.getItem('token'))

    useEffect(() => {
        if (!isLoggedIn) return

        getFavourites()
            .then(favourites => setFavouriteTmdbIds(new Set(favourites.map(f => f.tmdb_id))))
            .catch(error => console.error('FAVOURITES ERROR:', error))
    }, [isLoggedIn])

    const handleAddFavourite = (movie) => {
        addFavourite(movie)
            .then(() => setFavouriteTmdbIds(prev => new Set(prev).add(movie.id)))
            .catch(error => console.error('ADD FAVOURITE ERROR:', error))
    }

    useEffect(() => {
    fetch('/api/movies')
        .then(response => {
            console.log('Response status:', response.status)

            return response.text()
        })
        .then(data => {
            console.log('API RESPONSE:', data)

            const movies = JSON.parse(data)
            console.log('MOVIES:', movies)

            setMovies(movies)
        })
        .catch(error => {
            console.error('FETCH ERROR:', error)
        })
}, [])

    useEffect(() => {
        if (search.length < 2) {
            setSearchResults([])
        } else {
            fetch(`/api/movies/search?query=${encodeURIComponent(search)}`)
                .then(response => response.json())
                .then(data => setSearchResults(data))
                .catch(error => console.error('SEARCH ERROR:', error))
        }
    }, [search])


    return (
        <div className="NowPlayingPage">


            <div className="Search">
                <h1>Elokuvien haku</h1>

                <input
                    type="text"
                    placeholder="Hae nimellä tai vuodella (min 2 merkkiä)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '300px' }}
                />
                <div className="SearchResults">
                    <MovieList
                        movies={searchResults}
                        onAddFavourite={isLoggedIn ? handleAddFavourite : undefined}
                        favouriteTmdbIds={favouriteTmdbIds}
                    />
                </div>
            </div>

            <div className="NowPlaying">
                <h1>Nyt elokuvissa</h1>
            <div className="NowPlayingList">
                <MovieList
                    movies={movies}
                    onAddFavourite={isLoggedIn ? handleAddFavourite : undefined}
                    favouriteTmdbIds={favouriteTmdbIds}
                />
            </div>
            </div>

        </div>
    )
}

export default NowPlaying