import MovieList from "../components/MovieList"
import { useState, useEffect } from "react";
import { getFavourites, addFavourite } from "../services/favouriteService"
import './NowPlaying.css'


function NowPlaying() {
    const [search, setSearch] = useState('')
    const [movies, setMovies] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [favouriteTmdbIds, setFavouriteTmdbIds] = useState(new Set())
    const [topRatedMovies, setTopRatedMovies] = useState([])
    const isLoggedIn = Boolean(localStorage.getItem('token'))


    useEffect(() => {
        if (!isLoggedIn) return

        getFavourites()
            .then(favourites => setFavouriteTmdbIds(new Set(favourites.map(f => f.tmdb_id))))
            .catch(error => console.error('FAVOURITES ERROR:', error))
    }, [isLoggedIn])

    const handleAddFavourite = (movie) => {
        addFavourite(movie)
            .then(() => {
                const tmdbId = movie.tmdb_id ?? movie.id
                setFavouriteTmdbIds(prev => new Set([...prev, tmdbId]))
            })
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

   useEffect(() => {
    fetch('/api/movies/top-rated?limit=5')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Top rated fetch failed: ${response.status}`)
            }

            return response.json()
        })
        .then(data => {
            console.log('TOP RATED DATA:', data)
            setTopRatedMovies(data)
        })
        .catch(error => {
            console.error('TOP RATED ERROR:', error)
        })
}, [])


    return (
        <div className="NowPlayingPage">

            <h1 className="Moviepagename">Leffat.net</h1>


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
                        isLoggedIn={isLoggedIn}
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
                    isLoggedIn={isLoggedIn}
                    onAddFavourite={isLoggedIn ? handleAddFavourite : undefined}
                    favouriteTmdbIds={favouriteTmdbIds}
                />
            </div>
            </div>

            <div className="TopRated">
    <h1>Parhaiten arvioidut</h1>

    <MovieList
        movies={topRatedMovies}
        isLoggedIn={isLoggedIn}
        onAddFavourite={isLoggedIn ? handleAddFavourite : undefined}
        favouriteTmdbIds={favouriteTmdbIds}
        showRanking={true}
    />
</div>

        </div>
    )
}

export default NowPlaying