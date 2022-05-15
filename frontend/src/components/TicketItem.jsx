import React from "react";
import { Link, NavLink } from "react-router-dom";

function TicketItem({ ticket }) {
  return (
    <div className="ticket">
      <div>{new Date(ticket.createdAt).toLocaleString("IST")}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <NavLink to={`/ticket/${ticket._id}`} className="btn btn-reverse btn-sm">
        View
      </NavLink>
    </div>
  );
}

export default TicketItem;
