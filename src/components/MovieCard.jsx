function MovieCard({ movie }) {
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
        </div>
    );
}

export default MovieCard;