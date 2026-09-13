import MovieList from "../components/MovieList"

function NowPlaying() {

const movies = [
    {
        id: 1,
        title: "Jaakon seikkailu",
        year: 2000
    },
    {
        id: 2,
        title: "Testing testing",
        year: 2044
    },
    {
        id: 3,
        title: "abc aapinen",
        year: 2005
    },
    {
        id: 4,
        title: "Joumaan",
        year: 2020
    },

    ];

    return (
        <div>
            <nav>
                <a href="/">Takaisin</a>
            </nav>
            <h1>Nyt elokuvissa</h1>

            <MovieList movies={movies} />
        </div>
    );

}

export default NowPlaying;