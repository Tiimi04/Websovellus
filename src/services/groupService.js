const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`
})

const parseResponse = async (response) => {
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(data?.error?.message || 'Jotain meni pieleen')
    }

    return data
}

const createGroup = async (name) => {
    const response = await fetch(`${API_URL}/api/groups`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ name })
    })

    return parseResponse(response)
}

const getGroups = async () => {
    const response = await fetch(`${API_URL}/api/groups`, {
        headers: authHeaders()
    })
    return parseResponse(response)
}

const getGroupMembers = async (groupId) => {
    const response = await fetch(`${API_URL}/api/groups/${groupId}/members`, {
        headers: authHeaders()
    })
    return parseResponse(response)
}

const deleteGroup = async (groupId) => {
    const response = await fetch(`${API_URL}/api/groups/${groupId}`, {
        method: 'DELETE',
        headers: authHeaders()
    })
    return parseResponse(response)
}

const joinGroup = async (groupID) => {
    const response = await fetch(`${API_URL}/api/groups/${groupID}/join`, {
        method: 'POST',
        headers: authHeaders()
    })
    return parseResponse(response)
}

const getDiscoverGroups = async () => {
    const response = await fetch(`${API_URL}/api/groups/discover`, {
        headers: authHeaders()
    })
    return parseResponse(response)
}

const leaveGroup = async (groupId) => {
    const response = await fetch(`${API_URL}/api/groups/${groupId}/leave`, {
        method: 'DELETE',
        headers: authHeaders()
    })
    return parseResponse(response)
}

export { getGroups,
        getDiscoverGroups,
        getGroupMembers,
        leaveGroup,
        createGroup,
        deleteGroup,
        joinGroup 
    }