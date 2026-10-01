import { useNavigate } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import './FrontPage.css'
import UserSearch from '../components/UserSearch.jsx'

function FrontPage() {
    const navigate = useNavigate();

    return (


<main>
<h1>  </h1>

<UserSearch />
<NowPlaying />

</main>
    );



}



export default FrontPage;
