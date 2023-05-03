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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTicket = exports.deleteTicketNonTermine = exports.setTicketTermine = exports.setTicketEncours = exports.getTicketById = exports.getTickets = exports.createTicket = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
module.exports = {
    deleteTicketNonTermine,
    createTicket,
    getTickets,
    getTicketById,
    setTicketTermine,
    setTicketEncours,
    updateTicket
};
function createTicket(titre, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const createdTicket = yield prisma.ticket.create({
            data: {
                titre,
                description
            }
        });
        console.log({ createdTicket });
        return createdTicket;
    });
}
exports.createTicket = createTicket;
function getTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const tickets = yield prisma.ticket.findMany();
        return tickets;
    });
}
exports.getTickets = getTickets;
function getTicketById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const ticket = yield prisma.ticket.findUnique({
            where: {
                id: id,
            },
        });
        if (!ticket) {
            throw new Error(`Ticket with id ${id} not found`);
        }
        return ticket;
    });
}
exports.getTicketById = getTicketById;
function setTicketEncours(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const enCours = "En cours";
        const updatedTicket = yield prisma.ticket.update({
            where: {
                id,
            },
            data: {
                statut: enCours
            }
        });
        return updatedTicket;
    });
}
exports.setTicketEncours = setTicketEncours;
function setTicketTermine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const enCours = "Terminé";
        const updatedTicket = yield prisma.ticket.update({
            where: {
                id,
            },
            data: {
                statut: enCours
            }
        });
        return updatedTicket;
    });
}
exports.setTicketTermine = setTicketTermine;
function deleteTicketNonTermine(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const deletedTicket = yield prisma.ticket.delete({
            where: {
                id: id,
            },
        });
        return deletedTicket;
    });
}
exports.deleteTicketNonTermine = deleteTicketNonTermine;
function updateTicket(id, titre, description) {
    return __awaiter(this, void 0, void 0, function* () {
        const updatedTicket = yield prisma.ticket.update({
            where: {
                id: id,
            },
            data: {
                titre: titre,
                description: description,
            }
        });
        return updatedTicket;
    });
}
exports.updateTicket = updateTicket;
