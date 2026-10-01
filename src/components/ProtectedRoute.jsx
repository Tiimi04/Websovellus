import { Navigate } from 'react-router-dom'

// Estää pääsyn sisäänkääritylle sivulle, jos käyttäjällä ei ole kirjautumistokenia.
function ProtectedRoute({ children }) {
    const token = localStorage.getItem('token')

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
