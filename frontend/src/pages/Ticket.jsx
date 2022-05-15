import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket, closeTicket, reset } from "../features/ticket/ticketSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { getNotes, reset as noteReset } from "../features/note/noteSlice";
import NoteItem from "../components/NoteItem";

function Ticket() {
  const { ticket, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.ticket,
  );

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
          <button
            className="btn btn-block btn-danger"
            onClick={handleCloseTicket}
          >
            Close Ticket
          </button>
        )}

        {notes.map((note) => {
          return <NoteItem key={note._id} note={note} />;
        })}
      </div>
    )
  );
}

export default Ticket;
