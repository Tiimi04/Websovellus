const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = data?.error?.message || 'Jotain meni pieleen'
    throw new Error(message)
  }
  return data
}

const authHeaders = () => {
  const token = localStorage.getItem('token')
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

const getFavourites = async () => {
  const response = await fetch(`${API_URL}/api/favourites`, {
    headers: authHeaders()
  })
  return parseResponse(response)
}

const addFavourite = async (movie) => {
  const response = await fetch(`${API_URL}/api/favourites`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      tmdbId: movie.id,
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date
    })
  })
  return parseResponse(response)
}

const removeFavourite = async (movieId) => {
  const response = await fetch(`${API_URL}/api/favourites/${movieId}`, {
    method: 'DELETE',
    headers: authHeaders()
  })
  return parseResponse(response)
}

export { getFavourites, addFavourite, removeFavourite }
