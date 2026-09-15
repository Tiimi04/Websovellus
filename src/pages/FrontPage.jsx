import { useNavigate } from "react-router-dom";


function FrontPage() {
    const navigate = useNavigate();
    return (


<main>
<h1> Tervetuloa elokuvasivulle </h1>

<button type="button" onClick={() => navigate('/NowPlaying')}>
    Nyt elokuvissa ja elokuvien haku
</button>

<button type="button" onClick={() => navigate('/')}>
    Kirjaudu ulos
</button>
</main>
    );

}

export default FrontPage;
