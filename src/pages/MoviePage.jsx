import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [comment, setComment] =useState("");
    const [rating, setRating] = useState(5);
    const [averageRating, setAverageRating] = useState(null);

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

 useEffect(() => {
    fetch(`/api/movies/${id}/reviews`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Reviews fetch failed");
            }
            return response.json();
        })
        .then(data => {
            setReviews(data);
        })
        .catch(error => {
            console.error("Error fetching reviews:", error);
            setReviews([]);
        });
}, [id]);

useEffect(() => {
    fetch(`/api/movies/${id}/reviews/average`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Average rating fetch failed");
            }
            return response.json();
        })
        .then(data => {
            setAverageRating(data.average_rating);
        })
        .catch(error => {
            console.error("Error fetching average rating:", error);
        });
}, [id]);


    const handleSubmit = async (event) => {
        event.preventDefault();
        
           try {
        const response = await fetch(`/api/movies/${id}/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({
                rating: rating,
                comment: comment
            })
        });

        if (!response.ok) {
            throw new Error("Review submission failed");
        }

        const newReview = await response.json();

        setReviews([...reviews, newReview]);
        setComment("");
        setRating(5);

    } catch (error) {
        console.error("Error submitting review:", error);
    }
};


    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
            <p>Release Date: {movie.release_date}</p>
            <p> Arvosanojen keskiarvo:{" "}
                {averageRating !== null
                ? Number(averageRating).toFixed(1)
                : "Ei vielä arvosteluja"}
                / 5 </p>
            {movie.poster_path && (
                <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
            )}
            <h2>Reviews</h2>
            
                {reviews.map(review => (
                    <div key={review.id}>
                        <p>{review.review_text}</p>
                        <p>Arvosana: {review.rating}</p>
                        <p> Arvostelija: </p>
                    </div>


                ))}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={(event) => setRating(Number(event.target.value))}
                            placeholder="Rating"
                        />

                        <textarea
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                            placeholder="Kirjoita arvostelu"
                        />

                        <button type="submit">
                            Lähetä arvostelu
                        </button>
                    </form>
                
   
        </div>
    );
}
export default MoviePage;