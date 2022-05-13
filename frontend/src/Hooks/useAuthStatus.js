import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function useAuthStatus() {
  const { user } = useSelector((state) => state.auth);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }

    setIsLoading(false);
  }, [user]);
  console.log(loggedIn);
  return { loggedIn, isLoading };
}

export default useAuthStatus;
