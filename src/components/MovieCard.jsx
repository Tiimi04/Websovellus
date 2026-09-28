import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const genres = {
    28: "Toiminta",
    12: "Seikkailu",
    16: "Animaatio",
    35: "Komedia",
    80: "Rikos",
    99: "Dokumentti",
    18: "Draama",
    10751: "Perhe",
    14: "Fantasia",
    36: "Historia",
    27: "Kauhu",
    10402: "Musiikki",
    9648: "Mysteeri",
    10749: "Romantiikka",
    878: "Scifi",
    10770: "TV-elokuva",
    53: "Trilleri",
    10752: "Sota",
    37: "Western"
};

function MovieCard({ movie, onAddFavourite, onRemoveFavourite, isFavourite }) {
    const navigate = useNavigate();
    return (
        <div>
            
            {movie.poster_path && (
                <div className="MovieImage">
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    width="150"
                />
                </div>
            )}
            <h2>{movie.title}</h2>
            <p>Julkaisupäivä: {movie.release_date}</p>
            <p>Arvosanojen keskiarvo:{" "}
                {movie.average_rating !== null
                ? Number(movie.average_rating).toFixed(1)
                : "Ei vielä arvosteluja"}
                / 5
</p>
            {movie.genre_ids && (
                <p>Genret: {movie.genre_ids.map(id => genres[id]).join(", ")}</p>
            )}
            {onRemoveFavourite && (
                <button type="button" onClick={() => onRemoveFavourite(movie)}>
                    Poista suosikeista
                </button>
            )}
            {onAddFavourite && !onRemoveFavourite && (
                <button type="button" onClick={() => onAddFavourite(movie)} disabled={isFavourite}>
                    {isFavourite ? 'Suosikeissa' : 'Lisää suosikkeihin'}
                </button>
            )}
        </div>
    );
}

export default MovieCard;