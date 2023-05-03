import './navbar.css'
import {Link} from 'react-router-dom'

function Navbar(){
    return (
        <>
        <div>
            <ul className="listeNav">
                <li><Link to='/'>Accueil</Link></li>
                <li><Link to='/ticket'>Tickets</Link></li>
            </ul>
        </div>
        </>
    )

    
}

export default Navbar