import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getGroups, getGroupMembers, deleteGroup, createGroup } from '../services/groupService'
import './GroupPage.css'

function GroupPage() {
    const { groupId } = useParams()
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState('')
    const [error, setError] = useState('')

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