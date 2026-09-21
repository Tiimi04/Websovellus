import { useState, useEffect } from "react";
import { getGroups, createGroup, deleteGroup } from '../services/groupService'
import './groups.css'

function Groups() {
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        getGroups()
        .then(setGroups)
        .catch((err) => setError(err.message))
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')

        try {
            const newGroup = await createGroup(groupName)
            setGroups((currentGroups) => [newGroup, ...currentGroups])
            setGroupName('')
        } catch (err) {
            setError(err.message)
        }
    }

      const handleDelete = async (groupId) => {
        setError('')
        try {
          await deleteGroup(groupId)
          setGroups((currentGroups) => (
            currentGroups.filter((group) => group.id !== groupId)
          ))
        } catch (err) {
          setError(err.message)
        }
      }

    return (
        <main className="groups-page">
          <h1>Hallinnoi ryhmiä</h1>
          <form onSubmit={handleSubmit}>
            <input value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
            placeholder = 'Ryhmän nimi' />  
              <button type="submit"
              className="create-button">
              Luo ryhmä
              </button>
          </form>
            {error && <p>{error}</p>}
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <strong>{group.name}</strong>
                <button type="button"
                onClick={() => handleDelete(group.id)}>
                    Poista ryhmä
                </button>
                <ul>
                  <li> Luotu {new Date(group.created).toLocaleDateString()}</li>
                  <li> Luoja {group.owner_username}</li>
                  <li><span> Jäsenet </span></li>
                </ul>
              </li>
            ))}
          </ul>
        </main>
    )
}

export default Groups