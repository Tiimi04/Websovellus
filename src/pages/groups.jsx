import { useState, useEffect } from "react";
import { getGroups, createGroup, deleteGroup, getGroupMembers } from '../services/groupService'
import './groups.css'

function Groups() {
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState('')
    const [error, setError] = useState('')
    const [isVisible, setIsVisible] = useState(false);
    const [membersGroupId, setMembersGroupId] = useState(null)
    const [membersByGroup, setMembersByGroup] = useState({})

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

      const handleFetch = async (groupId) => {
        setError('')
        if (membersGroupId === groupId) {
          setMembersGroupId(null)
          return
        }

        setMembersGroupId(groupId)

        try {
          const members = await getGroupMembers(groupId)
          setMembersByGroup((currentMembers) => ({
            ...currentMembers,
            [groupId]: members
          }))
        } catch (err) {
          setError(err.message)
          setMembersGroupId(null)
        }
      }

      const toggleVisibility = () => {
        setIsVisible(!isVisible);
      }

    return (
        <main className="groups-page">
          <div className="topBar">
            <h2>Ryhmät
              <button onClick={toggleVisibility} className="createBtn">
                <img src="/burger-menu/createbutton.png"></img>
              </button>
            {isVisible && <div className="nameInput">
              <form onSubmit={handleSubmit}>
                <input value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
                placeholder = 'Ryhmän nimi' />  
                <button type="submit"
                className="create-button">
                 Luo ryhmä
                </button>
              </form>
            </div>}
            </h2>
          </div>
            {error && <p>{error}</p>}
          <div className="groupMap">
          <ul>
            {groups.map((group) => (
              <li key={group.id}>
                <strong>{group.name}</strong>
                <div className="listItem">
                <ul>
                  <li> Luotu {new Date(group.created).toLocaleDateString()}</li>
                  <li> Luoja {group.owner_username}</li>
                  <li>
                    <button className="deleteBtn" type="button"
                    onClick={() => handleDelete(group.id)}>
                    <img src="/burger-menu/deleteicon.png"/>
                    </button>
                  </li>
                  <li>
                    <button className="membersBtn" type="button"
                    onClick={() => handleFetch(group.id)}>
                    Jäsenet
                    </button>
                  </li>
                </ul>
                </div>
                {membersGroupId === group.id && (
                  <section className="membersPanel">
                    <h3>Ryhmän jäsenet</h3>
                    {(membersByGroup[group.id] || []).length === 0 ? (
                      <p>Jäseniä ei löytynyt.</p>
                    ) : (
                      <ul>
                        {membersByGroup[group.id].map((member) => (
                          <li key={member.id}>
                            {member.profile_image ? (
                              <img className="memberAvatar" src={member.profile_image} alt="" />
                            ) : (
                              <span className="memberInitial">
                                {member.username?.charAt(0).toUpperCase()}
                              </span>
                            )}
                            <span className="memberInfo">
                              <strong> {member.username} </strong>
                              {member.joined_at && (
                                <small>Liittynyt {new Date(member.joined_at).toLocaleDateString()}</small>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      )}
                  </section>
                )}
              </li>
            ))}
          </ul>
          </div>
        </main>
    )
}

export default Groups