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

const ticketService = {
  createTicket,
};

export default ticketService;
