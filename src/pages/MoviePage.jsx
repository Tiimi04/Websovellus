import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        fetch(`/api/movies/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Movie fetch failed");
                }

                return response.json();
            })
            .then(data => {
                console.log("Movie:", data);
                setMovie(data);
            })
            .catch(error => {
                console.error("Error fetching movie:", error);
            });
    }, [id]);

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            )}
        </div>
    );
}

export default MoviePage;