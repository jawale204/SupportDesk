import axios from "axios";

const API_URL = "/api/tickets";
const createTicket = async (ticketData, token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const createTicketResponse = await axios.post(API_URL, ticketData, config);

  return createTicketResponse.data.data;
};

const getAllTickets = async (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const getAllTicketsResponse = await axios.get(API_URL, config);

  return getAllTicketsResponse.data.data;
};

const ticketService = {
  createTicket,
  getAllTickets,
};

export default ticketService;
