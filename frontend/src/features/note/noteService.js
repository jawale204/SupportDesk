import axios from "axios";

API_URL = "/api/tickets/";

export const getNotes = async (token, tickedId) => {
  const config = {
    header: {
      authorization: `Bearer ${token}`,
    },
  };
  const notes = axios.get(API_URL + tickedId + "/notes", config);

  return notes.data.data;
};

const noteService = {
  getNotes,
};

export default noteService;
