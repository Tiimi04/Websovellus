const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const parseResponse = async (response) => {
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = data?.error?.message || 'Jotain meni pieleen'
    throw new Error(message)
  }
  return data
}

const registerUser = async ({ username, email, password }) => {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  })
  return parseResponse(response)
}

const loginUser = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  return parseResponse(response)
}

export { registerUser, loginUser }
