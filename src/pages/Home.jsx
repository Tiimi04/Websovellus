import { useNavigate } from 'react-router-dom'
import NowPlaying from "./NowPlaying"
import './Home.css'

function Home() {
  const navigate = useNavigate()
  return (
    <main className="home-page">
      <header className="home-header">
        <h1>Leffat.net</h1>
        <div className="home-auth-actions">
          <button type="button" onClick={() => navigate('/login')}>
          Kirjaudu
          </button>
          <button type="button" onClick={() => navigate('/register')}>
          Rekisteröidy
          </button>
        </div>
      </header>

      <p className="home-intro">Kirjaudu sisään tai rekisteröidy jatkaaksesi.</p>

      <section className="home-movie-search">
        <NowPlaying />
      </section>
    </main>
  )
}

export default Home