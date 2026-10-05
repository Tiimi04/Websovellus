import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGroups, getGroupMembers, deleteGroup, leaveGroup } from '../services/groupService'
import './GroupPage.css'

function GroupPage() {
    const { groupId } = useParams()
  const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([])
    //const [groupName, setGroupName] = useState('') // Ryhmän muokkaustoiminto mitä lisäilen myöhemmin
    const [error, setError] = useState('')
  const isMember = groups.some((group) => String(group.id) === groupId)

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
            <img src='/public/profile-avatars/2.png'></img>
            {groups.find((group) => String(group.id) === groupId)?.name}
          </h2>
          <div classname='userMap'>
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.profile_image && (
                    <img src={member.profile_image}/>
                  )}
                  <span> {member.username} </span>
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
          <button onClick={handleDeleteGroup} id='deleteBut'>
            <img src='/public/burger-menu/deleteicon.png'></img>
          </button>
        </div>
		</main>
	)
}

export default GroupPage