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

const deleteAccount = async ({ username, password }) => {
  const response = await fetch(`${API_URL}/api/account`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  return parseResponse(response)
}

const selectProfileImage = async (profileImage) => {
  const token = localStorage.getItem('token')
  const response = await fetch(`${API_URL}/api/profile-image`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ profileImage })
  })
  return parseResponse(response)
}

const getProfileImageUrl = (profileImagePath) => {
  if (!profileImagePath) {
    return null
  }
  if (profileImagePath.startsWith('/profile-avatars/')) {
    return profileImagePath
  }
  return profileImagePath.startsWith('/') ? `${API_URL}${profileImagePath}` : `${API_URL}/${profileImagePath}`
}

export { registerUser, loginUser, deleteAccount, selectProfileImage, getProfileImageUrl }
