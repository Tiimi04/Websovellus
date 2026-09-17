import MovieList from "../components/MovieList"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";

function NowPlaying() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

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

    const filteredMovies = search.length >= 2
        ? movies.filter((movie) =>
            movie.title?.toLowerCase().includes(search.toLowerCase()) ||
            movie.release_date?.includes(search)
        )
        : []

    return (
        <div className="NowPlayingPage">

            <div className="BackButton">
                <button
                    type="button"
                    onClick={() => navigate('/FrontPage')}
                >
                    Etusivu
                </button>
            </div>

            <div className="Search">
                <h1>Elokuvien haku</h1>

                <input
                    type="text"
                    placeholder="Hae nimellä tai vuodella (min 2 merkkiä)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '300px' }}
                />

                <MovieList movies={filteredMovies} />
            </div>

            <div className="NowPlaying">
                <h1>Nyt elokuvissa</h1>

                <MovieList movies={movies} />
            </div>

        </div>
    )
}

export default NowPlaying