
import './ticket.css'
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useState} from 'react';

function CreateTicket() {

  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.post(`http://127.0.0.1:3000/ticket`, {
      titre: titre,
      description: description
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }

    const handleTitreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setTitre(event.target.value);
    };
  
    const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDescription(event.target.value);
    };

    return (
      <>
        <div className="container">
          <div className="above">
        <Link to='/ticket/'>Retour à la liste des Tickets</Link>
        </div>
          <div className="center">
            <form onSubmit={handleSubmit}>
            <input type='text' id='titre' placeholder='Saisissez un titre...' onChange={handleTitreChange} value={titre}></input><br />
            <input type='text' id='description' placeholder='Saisissez une description... (optionnel)' onChange={handleDescriptionChange} value={description}></input><br />
            <button type='submit' id='validation'>Valider</button>
          </form>
        </div>
      </div>
      </>
    )
}
  
  
export default CreateTicket