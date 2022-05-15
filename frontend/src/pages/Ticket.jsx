import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket, reset } from "../features/ticket/ticketSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {
  getNotes,
  reset as noteReset,
  addNote,
} from "../features/note/noteSlice";
import NoteItem from "../components/NoteItem";
import Modal from "react-modal";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};
function Ticket() {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket,
  );
  const [noteText, setNoteText] = useState("");
  const [isClosedModel, setIsClosedModal] = useState(true);
  const { notes, isLoading: noteIsLoading } = useSelector(
    (state) => state.note,
  );
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(params.ticketId));
    dispatch(getNotes(params.ticketId));
  }, [params.ticketId, dispatch, isError, message]);

  useEffect(() => {
    return () => {
      dispatch(noteReset());
      dispatch(reset());
    };
  }, []);
  const handleCloseTicket = () => {
    dispatch(closeTicket(ticket._id));
  };
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(addNote({ ticketId: ticket._id, text: noteText }));
    setNoteText("");
    setIsClosedModal(true);
  };
  if (isLoading || noteIsLoading) {
    return <Spinner />;
  }

  return (
    ticket && (
      <div className="ticket-page">
        <div className="ticket-header">
          <BackButton url="/tickets" />
          <h2>
            Ticket ID : {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted{new Date(ticket.createdAt).toLocaleString("IST")}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className="ticket-desc">
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          <h2>Notes</h2>
        </div>
        {ticket.status !== "closed" && (
          <button className="btn" onClick={() => setIsClosedModal(false)}>
            <FaPlus />
            Add Notes
          </button>
        )}
        <Modal
          isOpen={!isClosedModel}
          contentLabel="Add Notes"
          onRequestClose={() => setIsClosedModal(true)}
          style={customStyles}
        >
          <h2>Add Note</h2>
          <button className="btn-close" onClick={() => setIsClosedModal(true)}>
            X
          </button>
          <form onSubmit={onNoteSubmit}>
            <div className="form-group">
              <textarea
                name="noteText"
                id="noteText"
                className="form-control"
                placeholder="Note text"
                value={noteText}
                minLength={10}
                required
                onChange={(e) => setNoteText(e.target.value)}
              ></textarea>
            </div>
            <div className="form-group">
              <button className="btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
        {ticket.status !== "closed" && (
          <button
            className="btn btn-block btn-danger"
            onClick={handleCloseTicket}
          >
            Close Ticket
          </button>
        )}
      </div>
    )
  );
}

export default Ticket;
