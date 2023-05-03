import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

module.exports = {
  deleteTicketNonTermine,
  createTicket,
  getTickets,
  getTicketById,
  setTicketTermine,
  setTicketEncours,
  updateTicket
}

export async function createTicket(titre: string, description: string| undefined) {
    
    const createdTicket = await prisma.ticket.create({
          data: {
            titre,
            description
          }
        });
        console.log({ createdTicket })
        return createdTicket
}

export async function getTickets(){
    const tickets = await prisma.ticket.findMany();
    return tickets
  }
  
export async function getTicketById( id: number) {
    const ticket = await prisma.ticket.findUnique({
      where : {
        id : id,
      },
    })
    if (!ticket) {
        throw new Error(`Ticket with id ${id} not found`);
      }
    return ticket
  }

export async function setTicketEncours(id: number){
  const enCours = "En cours"
  const updatedTicket = await prisma.ticket.update({
    where: {
      id,
    },
    data:{
      statut : enCours
    }
  })
  return updatedTicket
}

export async function setTicketTermine(id: number){
  const enCours = "Terminé"
  const updatedTicket = await prisma.ticket.update({
    where: {
      id,
    },
    data:{
      statut : enCours
    }
  })
  return updatedTicket
}

export async function deleteTicketNonTermine(id: number){
  const deletedTicket = await prisma.ticket.delete({
    where : {
      id:id,
    },
  })
  return deletedTicket
}

export async function updateTicket(id: number, titre: string, description: string| undefined){
  const updatedTicket = await prisma.ticket.update({
    where: {
      id: id,
    },
    data: {
      titre:titre,
      description:description,
    }
  })
  return updatedTicket
}