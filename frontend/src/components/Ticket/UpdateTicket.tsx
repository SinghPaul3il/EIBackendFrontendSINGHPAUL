
import axios from 'axios';
import {Link} from 'react-router-dom'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function UpdateTicket() {


    const {idCiv} = useParams();
    const [titre, setTicket] = useState('');
    const [description, setDescription] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>)=> {
      event.preventDefault();
  
      axios.put(`http://127.0.0.1:3000/ticket/${idCiv}`, {
        titre:titre,
        description:description
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
    }
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTicket(event.target.value);
    };
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
};
    return (
      <>
         <>
        <div className="container">
          <div className="above">
            <Link to='/ticket/'>Retour à la liste des Tickets</Link>
          </div>
          <div className="center">
            <form onSubmit={handleSubmit}>
              <input type='text' id='titre' placeholder='Saisissez une titre...' onChange={handleInputChange} value={titre}></input><br/>
              <input type='text' id='description' placeholder='Saisissez votre description...' onChange={handleInputChange1} value={description}></input><br/>
              <button type='submit' id='validation'>Valider</button>
          </form>
        </div>
      </div>
      </>
      </>
    )
}
  
  