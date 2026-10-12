import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGroups, getGroupMembers, deleteGroup, updateGroup, leaveGroup } from '../services/groupService'
import './GroupPage.css'


function GroupPage() {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editedGroupName, setEditedGroupName] = useState('')
    const [editedGroupImage, setEditedGroupImage] = useState('')
    const [error, setError] = useState('')
    const group = groups.find((item) => String(item.id) === groupId)
    const isMember = Boolean(group)
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
    const isCreator = group && String(group.owner_id) === String(currentUser?.id)

    useEffect(() => {
        getGroups()
            .then(setGroups)
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        getGroupMembers(groupId)
            .then(setMembers)
            .catch((err) => setError(err.message))
    }, [groupId])

    const handleDeleteGroup = async (groupId) => {
        setError('')
        try {
          await deleteGroup(groupId)
          setGroups((currentGroups) => (
            currentGroups.filter((group) => group.id !== groupId)
          ))
          navigate('/groups')
        } catch (err) {
          setError(err.message)
        }
    }

    const handleEditGroup = () => {
        setEditedGroupName(group?.name ?? '')
        setIsEditing(true)
    }

    const handleSaveGroup = async (event) => {
        event.preventDefault()
        setError('')
        try {
          const updatedGroup = await updateGroup(groupId, editedGroupName)
          setGroups((currentGroups) => currentGroups.map((item) => (
            String(item.id) === groupId ? { ...item, ...updatedGroup } : item
          )))
          setIsEditing(false)
        } catch (err) {
          setError(err.message)
        }
    }

    const handleLeaveGroup = async () => {
        setError('')
        try {
          await leaveGroup(groupId)
          navigate('/groups')
        } catch (err) {
          setError(err.message)
        }
    }

	return (
      <main>
        <Link to={"/groups"}>Takaisin ryhmät sivulle</Link>
        <div className='groupInfo'>
          <h2>
            <img
              src='/group-avatars/grpimg.png'
            />
            {isEditing ? (
              <form onSubmit={handleSaveGroup}>
                <input
                  value={editedGroupName}
                  onChange={(event) => setEditedGroupName(event.target.value)}
                  required
                />
                <button type='submit' className="saveButton">Tallenna</button>
                <button type='button' className="cancelButton"
                onClick={() => setIsEditing(false)}>Peruuta</button>
              </form>
            ) : group?.name}
          </h2>
          <div classname='userMap'>
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.profile_image && (
                    <img src={member.profile_image}/>
                  )}
                  <Link to={`/users/${member.id}`}>{member.username}</Link>
                </li>
              ))}
            </ul>
            {isMember && (
              <button type='button' onClick={handleLeaveGroup}>
                Poistu ryhmästä
              </button>
            )}
          </div>
        </div>
        <div className='managing'>
          {isCreator && (
            <>
              <button onClick={() => handleDeleteGroup(groupId)} id='deleteBut'>
              <img src='/public/burger-menu/deleteicon.png'></img>
              </button>
          
              {!isEditing && (
                <button type='button' onClick={handleEditGroup} id='editBut'>
                <img src='/burger-menu/editicon.png' alt='' />
                </button>
              )}
            </>
          )}
        </div>
		</main>
	)
}

export default GroupPage