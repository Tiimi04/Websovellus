import NowPlaying from "./NowPlaying";
import './FrontPage.css'
import UserSearch from '../components/UserSearch.jsx'

function FrontPage() {
    return (
        <main className="front-page">
            <UserSearch />
            <NowPlaying />
        </main>
    );
}



export default FrontPage;
