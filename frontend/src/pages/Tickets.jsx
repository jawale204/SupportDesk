import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTickets, reset } from "../features/ticket/ticketSlice";
import { toast } from "react-toastify";
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
  return <div>Tickets</div>;
}

export default Tickets;
