
import './ticket.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react';
import axios from 'axios';

function Ticket() {
  const [tickets, setTickets] = useState(Array<{id: number, titre: string, description: string| undefined, statut: string}>);

  function handleDelete(id: number){
    axios.delete(`http://127.0.0.1:3000/ticket/${id}`)
    .then(response => {
      const filteredTickets = tickets.filter(ticket => ticket.id !== id);
      setTickets(filteredTickets);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  useEffect(() => {
    axios.get('http://127.0.0.1:3000/ticket')
      .then(response => {
        setTickets(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
      return (
      <>
      <div className="container">
        <div className="above">
            <Link to='/ticket/create'>Créer un nouveau Ticket</Link>
          </div>
        <div className="center">
          <table>
            <thead>
              <tr>
                <th className='tabheaders'>Id</th>
                <th className='tabheaders'>Titre</th>
                <th className='tabheaders'>Description</th>
                <th className='tabheaders'>Statut</th>
                <th className='tabheaders'>Modifier</th>
                <th className='tabheaders'>Mettre en Cours</th>
                <th className='tabheaders'>Mettre en Terminé</th>
                <th className='tabheaders'>Supprimer</th>
              </tr>
            </thead>
            <tbody>
             {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td className='tabcontent'>{ticket.id}</td>
                  <td className='tabcontent'>{ticket.titre}</td>
                  <td className='tabcontent'>{ticket.description}</td>
                  <td className='tabcontent'>{ticket.statut}</td>
                  <td className='tabcontent btn'><Link to={`/contact/update/${ticket.id}`}><i className="fa-solid fa-pen fa-fade"></i></Link></td>
                  <td className='tabcontent btn'><Link to={`/contact/update/c/${ticket.id}`}><i className="fa-solid fa-pen fa-fade"></i></Link></td>
                  <td className='tabcontent btn'><Link to={`/contact/update/t/${ticket.id}`}><i className="fa-solid fa-pen fa-fade"></i></Link></td>
                  <td className='tabcontent btn'><i className="fa-solid fa-trash-can fa-fade" data-id={ticket.id} onClick={() => handleDelete(ticket.id)}></i></td>
                </tr>
              ))}
            </tbody> 
            </table>
        </div>
      </div>
      </>
    )
}
  
export default Ticket
  