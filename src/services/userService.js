const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'


const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}))
    if (!response.ok) {
        throw new Error(data?.error?.message || 'Jotain meni pieleen')
    }
    return data
}
const searchUsers = async (query) => {
    const response = await fetch(`${API_URL}/api/users/search?query=${encodeURIComponent(query)}`)
    return parseResponse(response)
}

const getUserById = async (id) => {
    const response = await fetch(`${API_URL}/api/users/${id}`)
    return parseResponse(response)
}

export { searchUsers, getUserById }