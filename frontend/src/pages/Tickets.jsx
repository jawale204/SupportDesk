import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTickets, reset } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import TicketItem from "../components/TicketItem";
function Tickets() {
  const { tickets, isError, isSuccess, message, isLoading } = useSelector(
    (state) => state.ticket,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  useEffect(() => {
    dispatch(getAllTickets());
    if (isError) {
      toast.error(message);
    }
  }, [isError]);

  if (isLoading) {
    return <div>spinning</div>;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
      </div>
      {tickets.map((ticket) => {
        return <TicketItem key={ticket._id} ticket={ticket} />;
      })}
    </>
  );
}

export default Tickets;
