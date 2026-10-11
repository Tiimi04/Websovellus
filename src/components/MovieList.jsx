import MovieCard from "./MovieCard"

function MovieList({ movies, onAddFavourite, onRemoveFavourite, favouriteTmdbIds, showRanking = false }) {
    return (
        <div>
            {movies.map((movie, index) => {
                const tmdbId = movie.tmdb_id ?? movie.id
                return (
                    <MovieCard
                        key={tmdbId}
                        movie={movie}
                        onAddFavourite={onAddFavourite}
                        onRemoveFavourite={onRemoveFavourite}
                        isFavourite={favouriteTmdbIds?.has(tmdbId)}
                        ranking={showRanking ? index + 1 : null}
                    />
                )
            })}
        </div>
    )
}

export default MovieList;