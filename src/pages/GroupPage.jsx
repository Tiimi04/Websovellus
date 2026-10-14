import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getGroups,
        getDiscoverGroups,
        getGroupMembers,
        deleteGroup,
        updateGroup,
        leaveGroup,
        joinGroup,
        getGroupMovies } from '../services/groupService'
import MovieList from '../components/MovieList'
import './GroupPage.css'

const groupAvatars = [
  { id: 'group-1', path: '/group-avatars/grpimg.png' },
  { id: 'group-2', path: '/group-avatars/grpimg2.png'},
  { id: 'group-3', path: '/group-avatars/grpimg3.png' }
]

function GroupPage() {
    const { groupId } = useParams()
    const navigate = useNavigate()
    const [members, setMembers] = useState([])
    const [groups, setGroups] = useState([])
    const [discoverGroups, setDiscoverGroups] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [editedGroupName, setEditedGroupName] = useState('')
    const [editedGroupAvatar, setEditedGroupAvatar] = useState('')
    const [error, setError] = useState('')
    const [groupMovies, setGroupMovies] = useState([])
    const memberGroup = groups.find((item) => String(item.id) === groupId)
    const group = memberGroup ?? discoverGroups.find((item) => String(item.id) === groupId)
    const isMember = Boolean(memberGroup)
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null')
    const isCreator = group && String(group.owner_id) === String(currentUser?.id)

    useEffect(() => {
        getGroups()
            .then(setGroups)
            .catch((err) => setError(err.message))

        getDiscoverGroups()
            .then(setDiscoverGroups)
            .catch((err) => setError(err.message))
    }, [])

    useEffect(() => {
        getGroupMembers(groupId)
            .then(setMembers)
            .catch((err) => setError(err.message))
    }, [groupId])

    useEffect(() => {
        getGroupMovies(groupId)
            .then(setGroupMovies)
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
        setEditedGroupAvatar(group?.avatar || groupAvatars[0].path)
        setIsEditing(true)
    }

    const handleSaveGroup = async (event) => {
        event.preventDefault()
        setError('')
        try {
          const updatedGroup = await updateGroup(groupId, editedGroupName, editedGroupAvatar)
          setGroups((currentGroups) => currentGroups.map((item) => (
            String(item.id) === groupId ? { ...item, ...updatedGroup } : item
          )))
          setDiscoverGroups((currentGroups) => currentGroups.map((item) => (
            String(item.id) === groupId ? { ...item, ...updatedGroup } : item
          )))
          setIsEditing(false)
        } catch (err) {
          setError(err.message)
        }
    }

    const handleJoin = async (groupId) => {
        setError('')
        try {
            await joinGroup(groupId)
            setGroups((currentGroups) => (
              currentGroups.some((item) => String(item.id) === String(groupId))
                ? currentGroups
                : [group, ...currentGroups]
            ))
            setDiscoverGroups((currentGroups) => (
              currentGroups.filter((item) => String(item.id) !== String(groupId))
            ))
            setMembers(await getGroupMembers(groupId))
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
                <div className='group-avatar-options'>
                  {groupAvatars.map((avatar) => (
                    <button
                    key={avatar.id}
                    type='button'
                    className={editedGroupAvatar === avatar.path ? 'selected' : ''}
                    onClick={() => setEditedGroupAvatar(avatar.path)}
                    aria-label={`Valitse ryhmäkuva ${avatar.id}`}
                    aria-pressed={editedGroupAvatar === avatar.path}
                    >
                      <img src={avatar.path} alt="" />
                    </button>
                  ))}
                </div>
              </form>
            ) : group?.name.toUpperCase()}
          </h2>
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
        </div>
          <img
            src={group?.avatar || '/group-avatars/default-grpimg.png'}
            id='group-avatar'
          />
          <div className='userMap'>
            <h3>Jäsenet</h3>
            <ul>
              {members.map((member) => (
                <li key={member.id}>
                  {member.profile_image ? (
                    <img src={member.profile_image}
                    id='user-avatar'
                    /> ) : (
                      <span className='initial'>
                        {member.username?.charAt(0).toUpperCase()}
                      </span>
                  )}
                  <span className='username'>
                  <Link to={`/users/${member.id}`}>{member.username}</Link>
                  </span>
                  <span className='joinDate'>
                    {member.joined_at && (
                      <small>Liittynyt {new Date(member.joined_at).toLocaleDateString()}</small>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            {isMember ? (
              <button type='button' onClick={handleLeaveGroup}>
                Poistu ryhmästä
              </button> ) : (
              <button type='button' onClick={() => handleJoin(group.id)}>Liity</button>
            )}
          </div>
        
        <section className='groupMovies'>
          <h2>Ryhmän suosikit</h2>
          <MovieList movies={groupMovies} />
        </section>
		</main>
	)
}

export default GroupPage