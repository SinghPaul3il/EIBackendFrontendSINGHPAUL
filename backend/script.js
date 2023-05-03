"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const ticketRepository = require('./ticketRepository.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');
const express = require('express');
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).send('test réussi');
    }
    catch (error) {
        res.status(500).send('Error : default');
    }
}));
app.get('/ticket', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const ticket = yield ticketRepository.getTickets();
        res.status(200).json(ticket);
        //res.status(200).json('api started')
    }
    catch (error) {
        res.status(500).send('Error while trying to get every tickets');
        console.error(error);
    }
}));
app.get('/ticket/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const ticket = yield ticketRepository.getTicketById(id);
        res.status(200).json(ticket);
        //res.status(200).json('api started')
    }
    catch (error) {
        res.status(500).send('Error while trying to get a single ticket');
        console.error(error);
    }
}));
app.post('/ticket/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const titre = req.body.titre || req.params.titre;
        const ticket = yield ticketRepository.createTicket(titre);
        res.status(200).json(ticket.titre + ' a été créé avec succès');
    }
    catch (error) {
        res.status(500).send('Error while trying to create a new ticket');
        console.error(error);
    }
}));
// DELETE ticket termine
app.delete('/ticket/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const statut = yield ticketRepository.statut;
    const id = parseInt(req.params.id);
    try {
        if (statut != "Terminé") {
            const validTicket = yield ticketRepository.deleteTicketNonTermine(id);
            res.status(200).json('Tout les tickets non terminés ont été supprimés avec succès');
        }
    }
    catch (error) {
        res.status(500).send('Error while trying to delete a new ticket');
        console.error(error);
    }
}));
//UPDATE Ticket en cours
app.put('/ticket/c/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const statut = req.params.statut;
        const ticket = yield ticketRepository.setTicketEncours(id);
        res.status(200).json(ticket.id + ' : ' + ticket.titre + ' est désormais en cours');
    }
    catch (error) {
        res.status(500).send('Error while trying to updating a new ticket');
        console.error(error);
    }
}));
//UPDATE Ticket en termine
app.put('/ticket/t/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const statut = req.params.statut;
        const ticket = yield ticketRepository.setTicketTermine(id);
        res.status(200).json(ticket.id + ' : ' + ticket.titre + ' est désormais en terminé');
    }
    catch (error) {
        res.status(500).send('Error while trying to updating a new ticket');
        console.error(error);
    }
}));
app.put('/ticket/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const titre = req.body.titre;
        var description = req.body.description;
        const ticket = yield ticketRepository.updateTicket(id, titre, description);
        res.status(200).json(ticket.id + ' : ' + ticket.titre + ' a été modifié');
    }
    catch (error) {
        res.status(500).send('Error while trying to updating a new ticket');
        console.error(error);
    }
}));
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
