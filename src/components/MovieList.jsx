import MovieCard from "./MovieCard"

function MovieList({ movies, onAddFavourite, onRemoveFavourite, favouriteTmdbIds }) {
    return (
        <div>
            {movies.map(movie=>(
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onAddFavourite={onAddFavourite}
                    onRemoveFavourite={onRemoveFavourite}
                    isFavourite={favouriteTmdbIds?.has(movie.id)}
                />
            ))}
        </div>
    )
}

export default MovieList;