import axios from "axios";

const API_URL = "/api/tickets/";

export const getNotes = async (token, tickedId) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  const notes = await axios.get(API_URL + tickedId + "/notes", config);

  return notes.data.data;
};

const noteService = {
  getNotes,
};

export default noteService;
