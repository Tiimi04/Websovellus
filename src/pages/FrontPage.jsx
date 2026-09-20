import { useNavigate } from "react-router-dom";
import NowPlaying from "./NowPlaying";
import './FrontPage.css'


function FrontPage() {
    const navigate = useNavigate();

    return (


<main>
<h1>  </h1>

<NowPlaying />

</main>
    );



}



export default FrontPage;
