import MovieList from "../components/MovieList"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import './NowPlaying.css'

function NowPlaying() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])

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
                    <MovieList movies={searchResults} />
                </div>
            </div>

            <div className="NowPlaying">
                <h1>Nyt elokuvissa</h1>
            <div className="NowPlayingList">
                <MovieList movies={movies} />
            </div>
            </div>

        </div>
    )
}

export default NowPlaying