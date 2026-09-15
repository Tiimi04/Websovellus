import MovieList from "../components/MovieList"
import { useNavigate } from 'react-router-dom'
import { useState } from "react";

function NowPlaying() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

const movies = [
    {
        id: 1,
        title: "Jaakon seikkailu",
        genre: "Seikkailu",
        year: 2000
    },
    {
        id: 2,
        title: "Testing testing",
        genre: "Drama",
        year: 2044
    },
    {
        id: 3,
        title: "abc aapinen",
        genre: "Kauhu",
        year: 2005
    },
    {
        id: 4,
        title: "Joumaan",
        genre: "Drama",
        year: 2020
    },

    ];

    const filteredMovies = search.length >= 2 
        ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.year.toString().includes(search) ||
        movie.genre.toLowerCase().includes(search.toLowerCase())
    ) 
    : [];

    return (
        <div className="NowPlayingPage">
            <div className= "BackButton">
            <button type="button" onClick={() => navigate('/FrontPage')}>
                Etusivu
            </button>
            </div>

            <div className="Search">
            <h1>Elokuvien haku</h1>

            <input
                type="text"
                placeholder="Hae nimellä, genrellä tai vuodella (min 2 merkkiä)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{width: '300px'}}
            />
            <MovieList movies={filteredMovies} />
            </div>
            <div className="NowPlaying">
            <h1>Nyt elokuvissa</h1>

            <MovieList movies={movies} />
            </div>
        </div>

    );

}

export default NowPlaying;