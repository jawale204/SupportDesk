import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/ticket/ticketSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
function Ticket() {
  const { ticket, isError, isSuccess, isloading, message } = useSelector(
    (state) => state.ticket,
  );
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getTicket(params.ticketId));
  }, [params.ticketId, dispatch, isError, message]);
  return <div>Ticket</div>;
}

export default Ticket;
