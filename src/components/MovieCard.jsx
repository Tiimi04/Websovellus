function MovieCard({ movie }) {
    return (
        <div>
            <h2>{movie.title}</h2>
            <p>Julkaisupäivä: {movie.release_date}</p>
        </div>
    );
}

export default MovieCard;