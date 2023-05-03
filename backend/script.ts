const ticketRepository = require('./ticketRepository.js')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')
const app = express()
app.use(express.json())
app.use(cors());

  app.get('/', async (req : any, res : any) => {
    try{
  res.status(200).send('test réussi')
    } catch (error){
      res.status(500).send('Error : default')
    }
  })

app.get('/ticket', async (req : any, res : any) => {
    try {
      const ticket = await ticketRepository.getTickets();
      res.status(200).json(ticket)
      //res.status(200).json('api started')
    } catch (error) {
      res.status(500).send('Error while trying to get every tickets');
      console.error(error)
    }
  });

  app.get('/ticket/:id', async (req : any, res : any) => {
    try {
      const id = parseInt(req.params.id)
      const ticket = await ticketRepository.getTicketById(id)
      res.status(200).json(ticket)
      //res.status(200).json('api started')
    } catch (error) {
      res.status(500).send('Error while trying to get a single ticket');
      console.error(error)
    }
  });

  app.post('/ticket/', async (req: any, res: any) => {
    try{
      const titre = req.body.titre || req.params.titre
      const ticket = await ticketRepository.createTicket(titre)
      res.status(200).json(ticket.titre+' a été créé avec succès')
    } catch (error){
      res.status(500).send('Error while trying to create a new ticket')
      console.error(error)
    }
  })
  
// DELETE ticket termine
app.delete('/ticket/:id', async (req: any, res: any) =>{
    const statut = await ticketRepository.statut
    const id = parseInt(req.params.id)
  try{
    if(statut != "Terminé"){
        const validTicket = await ticketRepository.deleteTicketNonTermine(id)
        res.status(200).json('Le ticket non terminé a été supprimé avec succès')
    }
  } catch (error){
    res.status(500).send('Error while trying to delete a new ticket')
    console.error(error)
  }
})

//UPDATE Ticket en cours
app.put('/ticket/c/:id', async (req: any, res: any) =>{
  try{
    const id = parseInt(req.params.id)
    const statut = req.params.statut
    const ticket = await ticketRepository.setTicketEncours(id)
    res.status(200).json(ticket.id +' : '+ticket.titre +' est désormais en cours')
  }
  catch(error){
    res.status(500).send('Error while trying to updating a new ticket')
      console.error(error)
  }
})

//UPDATE Ticket en termine
app.put('/ticket/t/:id', async (req: any, res: any) =>{
    try{
      const id = parseInt(req.params.id)
      const statut = req.params.statut
      const ticket = await ticketRepository.setTicketTermine(id)
      res.status(200).json(ticket.id +' : '+ticket.titre +' est désormais en terminé')
    }
    catch(error){
      res.status(500).send('Error while trying to updating a new ticket')
        console.error(error)
    }
  })

  app.put('/ticket/:id', async (req: any, res: any) =>{
    try{
      const id = parseInt(req.params.id)
      const titre = req.body.titre
      var description = req.body.description
      const ticket = await ticketRepository.updateTicket(id, titre, description)
      res.status(200).json(ticket.id +' : '+ticket.titre +' a été modifié')
    }
    catch(error){
      res.status(500).send('Error while trying to updating a new ticket')
        console.error(error)
    }
  })

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});