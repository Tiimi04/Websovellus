import { useNavigate } from 'react-router-dom'
import NowPlaying from "./NowPlaying";

function Home() {
  const navigate = useNavigate()
  return (
    <main>
      <h1>Websovellus keksi nimi tähän</h1>

        <button type="button" onClick={() => navigate('/login')}>
          Kirjaudu
        </button>
        <button type="button" onClick={() => navigate('/register')}>
          Rekisteröidy
        </button>
      <p>vaihda napit alemmas ja tee paremmat</p>
      <NowPlaying />
    </main>
  )
}

export default Home